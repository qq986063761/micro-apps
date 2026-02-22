import { registerMicroApps, start } from 'qiankun'
import { injectThemeToDocument } from '@/assets/theme'

const isDev = process.env.NODE_ENV === 'development'
const child1Entry = isDev ? '//localhost:8081' : '//localhost:8081'
const child2Entry = isDev ? '//localhost:8082' : '//localhost:8082'

// 主应用为 hash 路由时按 hash 匹配子应用
function activeRuleByHash(prefix) {
  return (location) =>
    location.hash === prefix || location.hash.startsWith(prefix + '/')
}

let qiankunStarted = false

/**
 * 在 MicroApp 组件首次挂载时调用，确保容器已存在后再注册并启动 qiankun（只执行一次）
 */
export function ensureAppsRegistered() {
  if (qiankunStarted) return
  qiankunStarted = true

  console.log('ensureAppsRegistered', child1Entry, child2Entry, document.getElementById('subapp-child1'))
  registerMicroApps(
    [
      {
        name: 'child1-app',
        entry: child1Entry,
        container: '#subapp-child1',
        activeRule: activeRuleByHash('#/child1'),
        props: {
          $app: window.$app,
          setWindow(appName, win) {
            if (window.$app?.apps?.[appName]) {
              window.$app.apps[appName].window = win
            }
          }
        }
      },
      {
        name: 'child2-app',
        entry: child2Entry,
        container: '#subapp-child2',
        activeRule: activeRuleByHash('#/child2'),
        props: {
          $app: window.$app,
          setWindow(appName, win) {
            if (window.$app?.apps?.[appName]) {
              window.$app.apps[appName].window = win
            }
          }
        }
      }
    ],
    {
      beforeLoad: (app) => {
        console.log('qiankun beforeLoad', app.name)
      },
      beforeMount: (app) => {
        console.log('qiankun beforeMount', app.name)
      },
      afterMount: (app) => {
        console.log('qiankun afterMount', app.name)
        injectThemeToDocument(document)
        // 同步主应用 store 到子应用
        if (window.$app?.store?.state && window.$app.emit) {
          setTimeout(() => {
            const state = window.$app.store.state
            if (state.usrs) {
              window.$app.emit('store-state', { prop: 'usrs', value: state.usrs })
            }
          }, 100)
        }
      },
      beforeUnmount: (app) => {
        console.log('qiankun beforeUnmount', app.name)
        const appKey = app.name === 'child1-app' ? 'child1' : app.name === 'child2-app' ? 'child2' : app.name
        const slot = window.$app?.apps?.[appKey]
        const childApp = slot?.window?.__CHILD_APP__?.[appKey]
        if (childApp?.$app?.onBeforeUnmount) {
          try {
            childApp.$app.onBeforeUnmount()
          } catch (e) {
            console.warn('qiankun beforeUnmount child callback error', e)
          }
        }
      },
      afterUnmount: (app) => {
        console.log('qiankun afterUnmount', app.name)
        const appKey = app.name === 'child1-app' ? 'child1' : app.name === 'child2-app' ? 'child2' : app.name
        const slot = window.$app?.apps?.[appKey]
        if (slot) {
          slot.window = null
        }
      }
    }
  )
  start()
}

/** @deprecated 改为在 MicroApp 首次挂载时调用 ensureAppsRegistered()，避免 container 尚未渲染 */
export function registerApps() {
  ensureAppsRegistered()
}

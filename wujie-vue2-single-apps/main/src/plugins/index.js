import router from '@/router'
import store from '@/store'
import { getTheme } from '@/assets/theme'

// 提供给子应用
window.$app = {
  vm: null,
  store,
  router,
  theme: getTheme(), // 主题变量，供子应用使用
  components: {}, // 提供给子应用的内联组件
  // 子应用列表
  apps: {
    child1: {},
    child2: {},
  },
  // 子应用初始化完后告诉主应用初始化完成
  async initApp({ app: appName = '' }) {
    if (!this.$app.apps[appName]) {
      console.error(`子应用 ${appName} 不存在`)
      return
    }
  },
  // 使用组件
  async useComp({ app: appName = '', name = '', method = '', args = [] }) {
    const app = window.$app.apps[appName]
    const { init } = app

    // 子组件使用前初始化数据，但不建议
    init && await init()

    app[name][method](...args)
  },
  /**
   * 等待子应用就绪（可调用其 toPage 等 $app 方法）。
   * - 若子应用做了无界生命周期改造，会在 afterMount 时设置 ready，此时立即就绪。
   * - 否则通过轮询子应用 window.$app.toPage 是否存在判断就绪（子应用 main.js 执行完即可）。
   * @param {string} appName - 子应用名，如 'child1'、'child2'
   * @param {{ timeout?: number }} options - timeout 毫秒，默认 15000
   * @returns {Promise<void>}
   */
  whenChildReady(appName, options = {}) {
    const { timeout = 15000 } = options
    const slot = window.$app?.apps?.[appName]
    if (!slot) {
      return Promise.reject(new Error(`子应用 ${appName} 未注册`))
    }
    if (slot.ready) {
      return Promise.resolve()
    }
    const start = Date.now()
    return new Promise((resolve, reject) => {
      const check = () => {
        if (slot.ready) {
          resolve()
          return
        }
        const appWindow = slot.window
        if (appWindow?.$app?.toPage) {
          slot.ready = true
          resolve()
          return
        }
        if (Date.now() - start >= timeout) {
          reject(new Error(`等待子应用 ${appName} 就绪超时`))
          return
        }
        setTimeout(check, 50)
      }
      check()
    })
  },
  /**
   * 跳转路由。
   * 复杂场景：需先跳主应用路由到子应用容器页，再调子应用 toPage 并传 params（如 init: true）时，
   * 可先 await window.$app.whenChildReady(appName) 再调用 toPage，确保子应用已就绪。
   */
  async toPage({ app: appName = '', route, method = 'push' }) {
    const { name, query, params } = route

    // 先跳模块在主应用路由
    if (appName) {
      // 如果主应用路由不在子应用模块页面，就先跳到子应用页面
      // 这里 appName 名和主应用内对应路由名一致
      if (appName !== window.$app.vm.$route.name) {
        router[method]({
          name: appName
        })
      }

      const next = () => {
        const { window: appWindow } = window.$app.apps[appName]
        const { toPage: appToPage } = appWindow && appWindow.$app || {}

        if (!appToPage) {
          setTimeout(next, 300)
        } else {
          appToPage({
            name,
            params,
            query,
            method: 'replace'
          })
        }
      }
      next()
    } else {
      router[method]({
        name,
        params: {
          init: true,
          ...params,
        },
        query
      })
    }
  },
  // 接收其他模块的数据监听事件
  async onEvent() {

  }
}

export default {
  async install(Vue) {
    Vue.component('Child1Button', async () => {
      const Child1Button = await new Promise(resolve => {
        const next = async () => {
          const { child1 } = window.$app.apps
          const { init, Button } = child1
        
          if (!Button) {
            setTimeout(next, 300)
          } else {
            // 子组件使用前初始化数据，但不建议
            init && await init()

            resolve(Button)
          }
        }
        next()
      })
      
      return Child1Button
    })

    // 引入 child1 的插件
    const { child1 } = window.$app.apps
    const child1Export = await import('child1/export')
    const { Button, modal, init } = child1Export.default

    // 保存子组件的组件和方法
    child1.Button = Button
    child1.modal = modal
    child1.init = init

    console.log('main 中 child1 组件加载完成', child1Export.default)
  }
}
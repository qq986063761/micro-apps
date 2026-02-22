import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$app = {
  vm: null,
  store,
  router,
  components: {}, // 提供给子应用的内联组件
  // 子应用列表（乾坤模式下用 appInstance 存子应用暴露的实例）
  apps: {
    child1: {
      window: null,
      appInstance: null
    },
    child2: {
      window: null,
      appInstance: null
    }
  },
  /**
   * 跳转路由
   * 主/子共用同一 hash，只改主应用路由即可，子应用会根据 hash 自动匹配
   */
  to({ app, name, query, params, method = 'push' }) {
    if (app) {
      let path = `/${app}`
      if (name === 'home') path += '/home'
      else if (name === 'about') path += '/about'
      router[method]({ path, query })
    } else {
      router[method]({
        name,
        params: { init: true, ...params },
        query
      })
    }
  },
  // 使用组件（优先从 MF 暴露的 slot[name]，如 child1 的 modal/Button）
  use({ app, name = '', method = '', args = [] }) {
    console.log('main use', app, name, method, args)
    const slot = window.$app.apps[app]
    const target = slot?.[name] || slot?.appInstance?.[name]
    return target && typeof target[method] === 'function' ? target[method](...args) : undefined
  },
  on() {},
  // 向所有子应用发送事件通知
  emit(type, data) {
    Object.keys(window.$app.apps).forEach(appName => {
      const slot = window.$app.apps[appName]
      const childApp = slot?.appInstance?.$app
      if (childApp && typeof childApp.on === 'function') {
        try {
          childApp.on(type, data)
        } catch (e) {
          console.warn(`通知子应用 ${appName} 失败:`, e)
        }
      }
    })
  }
}

// 异步组件加载中占位（用 render 避免依赖模板编译器）
const Child1ButtonLoading = {
  render(h) {
    return h('div', '组件加载中...')
  }
}

export default {
  async install(Vue) {
    const { child1 } = window.$app.apps

    Vue.component('Child1Button', () => ({
      component: new Promise(resolve => {
        const next = () => {
          const { Button } = child1
          if (!Button) {
            setTimeout(next, 60)
          } else {
            resolve(Button)
          }
        }
        next()
      }),
      loading: Child1ButtonLoading
    }))

    // 引入 child1 的插件
    const child1Export = await import('child1/export')
    const { Button, modal } = child1Export.default

    // 保存子组件的组件
    child1.Button = Button
    child1.modal = modal

    console.log('main 中 child1 组件加载完成', child1Export.default)
  }
}
import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$microApp = {
  vm: null,
  store,
  router,
  child1: {},
  child2: {},
  useComp({ module = '', name = '', method = '', args = [] }) {
    const app = window.$microApp[module]
    app[name][method](...args)
  },
  toPage({ module = '', routeName = '', params, query }) {
    // 先跳模块在主应用路由
    if (module) {
      // 如果不在子应用，就先跳到子应用
      if (module !== window.$microApp.vm.$route.name) {
        router.push({
          name: module
        })
      }

      const next = () => {
        const { window: appWindow } = window.$microApp[module]
        const { toPage: appToPage } = appWindow && appWindow.$microApp || {}

        if (!appToPage) {
          setTimeout(next, 300)
        } else {
          appToPage({
            routeName,
            params,
            query
          })
        }
      }
      next()
    } else {
      router.push({
        name: routeName,
        params: {
          init: true,
          ...params,
        },
        query
      })
    }
  }
}

export default {
  async install(Vue) {
    Vue.component('Child1Button', async () => {
      await new Promise(resolve => {
        const next = () => {
          if (!window.$microApp.child1.Button) {
            setTimeout(next, 300)
          } else {
            resolve()
          }
        }
        next()
      })
      
      return window.$microApp.child1.Button
    })

    // 引入 child1 的插件
    const child1Export = await import('child1/export')
    const { Button, modal, init } = child1Export.default

    window.$microApp.child1.Button = Button
    window.$microApp.child1.modal = modal
    
    init(data => {
      console.log('main 中的 child1 插件初始化完成', data, child1Export)
    })
  }
}
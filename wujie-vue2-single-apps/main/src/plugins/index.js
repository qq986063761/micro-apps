import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store,
  router,
  child1: {},
  child2: {}, 
  async useComp({ module = '', name = '', method = '', args = [] }) {
    const app = window.$mApp[module]
    const { init } = app

    // 子组件使用前初始化数据，但不建议
    init && await init()

    app[name][method](...args)
  },
  async toPage({ module = '', routeName = '', params, query, method = 'push' }) {
    // 先跳模块在主应用路由
    if (module) {
      // 如果主应用路由不在子应用模块页面，就先跳到子应用页面
      // 这里 module 名和主应用内对应路由名一致
      if (module !== window.$mApp.vm.$route.name) {
        router[method]({
          name: module
        })
      }

      const next = () => {
        const { window: appWindow } = window.$mApp[module]
        const { toPage: appToPage } = appWindow && appWindow.$mApp || {}

        if (!appToPage) {
          setTimeout(next, 300)
        } else {
          appToPage({
            routeName,
            params,
            query,
            method: 'replace'
          })
        }
      }
      next()
    } else {
      router[method]({
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
      const Child1Button = await new Promise(resolve => {
        const { init, Button } = window.$mApp.child1

        const next = async () => {
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
    const child1Export = await import('child1/export')
    const { Button, modal, init } = child1Export.default

    window.$mApp.child1.Button = Button
    window.$mApp.child1.modal = modal
    window.$mApp.child1.init = init

    console.log('main 中的 child1 插件初始化完成', child1Export.default)
  }
}
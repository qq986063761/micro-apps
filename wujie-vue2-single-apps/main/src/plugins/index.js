import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store,
  router,
  components: {}, // 提供给子应用的内联组件
  child1: {},
  child2: {},
  // 使用组件
  async useComp({ app: appName = '', name = '', method = '', args = [] }) {
    const app = window.$mApp[appName]
    const { init } = app

    // 子组件使用前初始化数据，但不建议
    init && await init()

    app[name][method](...args)
  },
  // 跳转路由
  async toPage({ app: appName = '', route, method = 'push' }) {
    const { name, query, params } = route

    // 先跳模块在主应用路由
    if (appName) {
      // 如果主应用路由不在子应用模块页面，就先跳到子应用页面
      // 这里 appName 名和主应用内对应路由名一致
      if (appName !== window.$mApp.vm.$route.name) {
        router[method]({
          name: appName
        })
      }

      const next = () => {
        const { window: appWindow } = window.$mApp[appName]
        const { toPage: appToPage } = appWindow && appWindow.$mApp || {}

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

    // 保存子组件的组件和方法
    window.$mApp.child1.Button = Button
    window.$mApp.child1.modal = modal
    window.$mApp.child1.init = init

    console.log('main 中的 child1 插件初始化完成', child1Export.default)
  }
}
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
    child1: {
      window: null 
    },
    child2: {
      window: null
    },
  },
  /**
   * 跳转路由
   */
  to({ app, name, query, params }) {
    // 先跳模块在主应用路由
    if (app) {
      // 如果主应用路由不在子应用模块页面，就先跳到子应用页面
      // 这里 appName 名和主应用内对应路由名一致
      if (app !== window.$app.vm.$route.name) {
        router.push({
          name: app
        })
      }

      const next = () => {
        const { window: childWindow } = window.$app.apps[app]
        const { to: childTo } = childWindow && childWindow.$app || {}

        if (!childTo) {
          setTimeout(next, 60)
        } else {
          childTo({
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
  // 使用组件
  use({ app, name = '', method = '', args = [] }) {
    const appInstance = window.$app.apps[app]
    return appInstance[name][method](...args)
  },
  // 接收其他模块的数据监听事件
  onEvent() {

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
    const { Button, modal } = child1Export.default

    // 保存子组件的组件和方法
    child1.Button = Button
    child1.modal = modal

    console.log('main 中 child1 组件加载完成', child1Export.default)
  }
}
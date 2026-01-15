import router from '@/router'
import { useChild2Store } from '@/store'

// 提供给父应用
window.$mApp = {
  vm: null,
  store: useChild2Store,
  router,
  async toPage({ name = '', params, query, method = 'replace' }) {
    router[method]({
      name,
      params,
      query
    })
  },
  // 接收其他模块的数据监听事件
  async onEvent() {

  }
}

export default {
  async install(app) {
    const parentMicroApp = window.parent.$mApp

    // 动态注册 Child1Button 组件
    app.component('Child1Button', {
      async setup() {
        const Child1Button = await new Promise(resolve => {
          const { child1 } = parentMicroApp.apps || {}
          const { init, Button } = child1 || {}

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
        
        return () => Child1Button
      }
    })
  }
}

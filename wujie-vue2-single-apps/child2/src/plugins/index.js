import router from '@/router'
import store from '@/store'

// 提供给父应用
window.$app = {
  vm: null,
  store,
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
  async install(Vue) {
    const parentMicroApp = window.parent.$app

    Vue.component('Child1Button', async () => {
      const Child1Button = await new Promise(resolve => {
        const { init, Button } = parentMicroApp.child1

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
  }
}
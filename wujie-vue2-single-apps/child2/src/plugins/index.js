import router from '@/router'
import store from '@/store'

// 提供给父应用
window.$microApp = {
  vm: null,
  store,
  router,
  toPage({ routeName = '', params, query }) {
    router.push({
      name: routeName,
      params,
      query
    })
  }
}

export default {
  async install(Vue) {
    const parentMicroApp = window.parent.$microApp

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
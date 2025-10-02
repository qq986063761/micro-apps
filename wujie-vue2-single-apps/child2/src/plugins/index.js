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
      await new Promise(resolve => {
        const next = () => {
          if (!parentMicroApp.child1.Button) {
            setTimeout(next, 300)
          } else {
            resolve()
          }
        }
        next()
      })
      
      return parentMicroApp.child1.Button
    })
  }
}
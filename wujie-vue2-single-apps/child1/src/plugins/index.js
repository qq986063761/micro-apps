import router from '@/router'
import store from '@/store'

// 提供给子应用
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
    
  }
}
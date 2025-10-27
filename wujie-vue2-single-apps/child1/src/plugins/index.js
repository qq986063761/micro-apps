import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store,
  router,
  toPage({ routeName = '', params, query, method = 'replace' }) {
    router[method]({
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
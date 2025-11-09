import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store,
  router,
  async toPage({ routeName = '', params, query, method = 'replace' }) {
    router[method]({
      name: routeName,
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
    
  }
}
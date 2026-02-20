import router from '@/router'
import store from '@/store'

const getParentApp = () => window.$wujie?.props?.$app ?? window.parent?.$app
// Object.defineProperty(window, '$parentApp', {
//   get: getParentApp,
//   configurable: true,
//   enumerable: true
// })
window.$parentApp = getParentApp()

// 提供给子应用
window.$app = {
  vm: null,
  store,
  router,
  async to({ routeName = '', params, query, method = 'replace' }) {
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
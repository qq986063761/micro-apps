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
  async to({ name = '', params, query, method = 'replace' }) {
    if (router.currentRoute.name === name) return
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
    
  }
}
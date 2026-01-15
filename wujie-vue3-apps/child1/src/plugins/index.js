import router from '@/router'
import { useChild1Store } from '@/store'

// 提供给子应用
window.$mApp = {
  vm: null,
  store: useChild1Store,
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
  async install(app) {
    
  }
}

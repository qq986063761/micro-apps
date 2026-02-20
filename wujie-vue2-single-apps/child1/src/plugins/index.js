import router from '@/router'
import store from '@/store'

const getParentApp = () => window.$wujie?.props?.$app ?? window.parent?.$app
// Object.defineProperty(window, '$parentApp', {
//   get: getParentApp,
//   configurable: true,
//   enumerable: true
// })
window.$parentApp = getParentApp()

function shallowEqual(a, b) {
  const A = a && typeof a === 'object' ? a : {}
  const B = b && typeof b === 'object' ? b : {}
  const keysA = Object.keys(A)
  const keysB = Object.keys(B)
  if (keysA.length !== keysB.length) return false
  return keysA.every(k => A[k] === B[k])
}

// 提供给子应用
window.$app = {
  vm: null,
  store,
  router,
  async to({ name = '', params, query, method = 'replace' }) {
    console.log('child1 to', name, params, query, method)
    const cur = router.currentRoute
    const sameName = cur.name === name
    const sameParams = shallowEqual(cur.params, params)
    const sameQuery = shallowEqual(cur.query, query)
    if (sameName && sameParams && sameQuery) return
    
    router[method]({
      name,
      params: params ?? {},
      query: query ?? {}
    }).catch(err => {
      // Vue Router 以 resolved path+query 判断“同一位置”，params 若未写在 path 里不会进 URL，仍会报冗余导航
      if (err.name !== 'NavigationDuplicated') throw err
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
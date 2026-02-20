import router from '@/router'
import store from '@/store'

function shallowEqual(a, b) {
  const A = a && typeof a === 'object' ? a : {}
  const B = b && typeof b === 'object' ? b : {}
  const keysA = Object.keys(A)
  const keysB = Object.keys(B)
  if (keysA.length !== keysB.length) return false
  return keysA.every(k => A[k] === B[k])
}

// 提供给父应用
window.$app = {
  vm: null,
  store,
  router,
  async to({ name = '', params, query, method = 'replace' }) {
    console.log('child2 to', name, params, query, method)
    const cur = router.currentRoute
    const sameName = cur.name === name
    const sameParams = shallowEqual(cur.params, params)
    const sameQuery = shallowEqual(cur.query, query)
    if (sameName && sameParams && sameQuery) return
    router[method]({
      name,
      params: params ?? {},
      query: query ?? {}
    })
  },
  // 接收其他模块的数据监听事件
  async onEvent() {

  }
}

// 主应用 $app 挂到全局，业务中直接用 window.$parentApp（优先无界 props，同域/独立运行回退到 window.parent）
const getParentApp = () => window.$wujie?.props?.$app ?? window.parent?.$app
// Object.defineProperty(window, '$parentApp', {
//   get: getParentApp,
//   configurable: true,
//   enumerable: true
// })
window.$parentApp = getParentApp()

export default {
  async install(Vue) {
    const parentMicroApp = window.$parentApp

    Vue.component('Child1Button', async () => {
      const Child1Button = await new Promise(resolve => {
        const child1Slot = parentMicroApp?.apps?.child1
        if (!child1Slot) {
          resolve(() => null) // 无主应用或未注入时返回空组件
          return
        }
        const { init, Button } = child1Slot

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
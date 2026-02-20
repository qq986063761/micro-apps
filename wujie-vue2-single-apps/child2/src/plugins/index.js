import router from '@/router'
import store from '@/store'

// 提供给父应用
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
// 提供给子应用
window.$microApp = {
  // 子应用列表
  apps: {},
  // 监听子应用加载完毕
  onReady(window) {
    console.log('onReady', window.$wujie, this.apps)

    // 应用 id
    const appId = window.$wujie.bus.id
    this.apps[appId] = { window }
  },
  // 使用组件
  useComponent(opts) {
    const { 
      app, // 子应用名称
      component, // 组件名称
      method, // 方法名称
      args // 参数数组
    } = opts

    console.log('useComponent', app, component)
  }
}

export default {
  async install(Vue) {
    const compMap = {
      child1: {},
      child2: {}
    }

    Vue.component('Child1Button', async () => {
      await new Promise(resolve => {
        const next = () => {
          if (!compMap.child1.Button) {
            setTimeout(next, 300)
          } else {
            resolve()
          }
        }
        next()
      })
      
      return compMap.child1.Button
    })

    const child1Export = await import('child1/export')
    const { Button, init } = child1Export.default

    compMap.child1.Button = Button
    
    init(data => {
      console.log('main child1引入完成', data, child1Export)
    })
  }
}
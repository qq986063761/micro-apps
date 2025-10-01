// 提供给子应用
window.$microApp = {
  child1: {},
  child2: {}
}

export default {
  async install(Vue) {
    Vue.component('Child1Button', async () => {
      await new Promise(resolve => {
        const next = () => {
          if (!window.$microApp.child1.Button) {
            setTimeout(next, 300)
          } else {
            resolve()
          }
        }
        next()
      })
      
      return window.$microApp.child1.Button
    })

    const child1Export = await import('child1/export')
    const { Button, modal, init } = child1Export.default

    window.$microApp.child1.Button = Button
    window.$microApp.child1.modal = modal
    
    init(data => {
      console.log('main 中的 child1 插件初始化完成', data, child1Export)
    })
  }
}
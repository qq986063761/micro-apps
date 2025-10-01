import Vue from 'vue'

// 插件对象
const plugin = {
  install(Vue) {
    // 异步加载 child1 的组件
    this.loadChild1Components(Vue)
  },
  
  async loadChild1Components(Vue) {
    try {
      Vue.component('Child1Button', async () => {
        await new Promise(resolve => {
          const next = () =>{
            if (!window.Child1Button) {
              setTimeout(next, 500)
              return
            }
  
            resolve(window.Child1Button)
          }
          next()
        })

        return window.Child1Button
      })

      // 通过 child1/exposes 引入所有组件
      const child1Components = await import('child1/exposes')
      console.log('main 注册子 child1Components', child1Components)

      const { Button, modal } = child1Components
      
      // 注册 Button 组件为全局组件
      if (Button) {
        window.Child1Button = Button
        console.log('main Child1Button 组件已注册')
      }
      
      // 注册 modal 插件
      if (modal) {
        Vue.prototype.$modal = modal
        console.log('main Child1Modal 插件已注册')
      }
      
    } catch (error) {
      console.error('加载 child1 组件失败:', error)
    }
  }
}

export default plugin

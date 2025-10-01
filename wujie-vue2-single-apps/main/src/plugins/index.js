

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
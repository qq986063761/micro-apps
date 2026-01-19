import router from '@/router'

export default {
  async install(app) {
    // 使用无界 API
    if (window.$wujie) {
      const { bus } = window.$wujie
      const { appName, methods } = window.$wujie.props

      // 监听主应用发送的路由跳转事件
      bus.$on('app:routeChange', ({ appName: targetApp, route, method = 'replace' }) => {
        // 只有目标是自己时才处理
        if (targetApp === appName) {
          router[method](route)
        }
      })

      // 监听主应用发送的组件调用事件
      bus.$on('app:useComp', ({ appName: targetApp, componentName, method, args }) => {
        // 只有目标是自己时才处理
        if (targetApp === appName) {
          console.log(`调用组件 ${componentName} 的方法 ${method}`, args)
          
          // 可以通过 eventBus 发送组件调用结果
          bus.$emit('app:useCompResult', {
            appName,
            componentName,
            method,
            success: true
          })
        }
      })

      // 注意：应用挂载在 main.js 中处理
      // 这里只负责设置事件监听
    }
  }
}

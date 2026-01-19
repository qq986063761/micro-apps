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
          // 这里需要根据实际的组件注册方式来实现
          // 例如：如果组件已经注册到全局，可以通过 app.config.globalProperties 访问
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

      // 将路由跳转方法暴露给 props 中的 methods，供主应用调用
      // 实际上主应用已经通过 eventBus 调用，这里可以保留作为备用
      if (methods) {
        // 子应用可以调用主应用传递的方法
        // methods.toMainPage() - 跳转主应用路由
        // methods.toChildPage() - 跳转其他子应用路由
        // methods.useChildComp() - 使用其他子应用的组件
      }
    }
  }
}

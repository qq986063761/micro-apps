import router from '@/router'
import { bus } from 'wujie-vue3'

// 子应用组件注册表（用于 useComp）
const appComponents = {
  child1: {},
  child2: {}
}

// 创建通信工具
export const createAppCommunication = () => {
  // 跳转路由
  const toPage = ({ app: appName = '', route, method = 'push' }) => {
    const { name, query, params } = route

    // 如果指定了子应用，需要先跳转到子应用页面，再通知子应用跳转
    if (appName) {
      // 1. 先跳转主应用路由到子应用页面
      const currentRoute = router.currentRoute.value
      if (appName !== currentRoute.name) {
        router[method]({
          name: appName
        })
      }

      // 2. 通过 eventBus 发送路由跳转事件到指定子应用
      // 延迟发送，确保子应用已经加载
      setTimeout(() => {
        bus.$emit('app:routeChange', {
          appName, // 在数据中指定目标应用
          route: { name, params, query },
          method: 'replace'
        })
      }, 300)
    } else {
      // 跳转主应用路由
      router[method]({
        name,
        params: {
          init: true,
          ...params,
        },
        query
      })
    }
  }

  // 使用组件（调用子应用的组件方法）
  const useComp = ({ app: appName = '', name = '', method = '', args = [] }) => {
    if (!appName || !name || !method) {
      console.error('useComp 参数不完整', { appName, name, method })
      return
    }

    // 通过 eventBus 发送组件调用事件到指定子应用
    bus.$emit('app:useComp', {
      appName,
      componentName: name,
      method,
      args
    })
  }

  // 获取 props（用于初始化数据和方法）
  const getProps = (appName) => {
    return {
      appName,
      // 通过 props 传递方法给子应用
      methods: {
        // 子应用调用此方法可以跳转主应用路由
        toMainPage: (route, method = 'push') => {
          router[method](route)
        },
        // 子应用调用此方法可以跳转其他子应用路由
        toChildPage: ({ app, route, method = 'push' }) => {
          toPage({ app, route, method })
        },
        // 子应用调用此方法可以使用其他子应用的组件
        useChildComp: ({ app, name, method, args }) => {
          useComp({ app, name, method, args })
        }
      }
    }
  }

  // 初始化事件监听
  const setupEventListeners = () => {
    // 统一监听所有子应用的初始化事件
    bus.$on('app:init', ({ appName, data }) => {
      console.log(`子应用 ${appName} 初始化完成`, data)
    })

    // 统一监听子应用注册组件事件
    bus.$on('app:registerComponent', ({ appName, componentName, component }) => {
      if (!appComponents[appName]) {
        appComponents[appName] = {}
      }
      appComponents[appName][componentName] = component
      console.log(`子应用 ${appName} 注册组件: ${componentName}`)
    })
  }

  setupEventListeners()

  return {
    toPage,
    useComp,
    getProps,
    appComponents
  }
}

const appComm = createAppCommunication()

// 导出供外部使用
export { appComm, bus }

export default {
  async install(app) {
    // 如果需要动态注册子应用的组件，可以通过 eventBus 监听
    bus.$on('app:registerComponent', ({ appName, componentName, component }) => {
      if (appName === 'child1' && componentName === 'Button') {
        // 可以在这里注册为全局组件
        app.component('Child1Button', component)
      }
    })
  }
}

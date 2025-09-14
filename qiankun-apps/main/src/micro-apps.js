import { registerMicroApps, start } from 'qiankun'
import store from './store'

// 创建全局状态管理对象
export const globalStateManager = {
  // 获取全局状态
  getGlobalState() {
    return store.getters.globalState
  },
  
  // 设置全局状态
  setGlobalState(newState) {
    store.dispatch('setGlobalState', newState)
  },
  
  // 监听全局状态变化
  onGlobalStateChange(callback, fireImmediately = false) {
    // 使用 Vuex 的 watch 功能
    const unwatch = store.watch(
      (state) => state.lastUpdate,
      () => {
        callback(store.getters.globalState, store.getters.globalState)
      },
      { immediate: fireImmediately }
    )
    
    // 返回取消监听的函数
    return unwatch
  },
  
  // 更新子应用状态
  updateChildAppState(appName, data) {
    store.dispatch('updateChildAppState', { appName, data })
  }
}

// 将全局状态管理器挂载到全局，供子应用使用
window.microAppStore = store
window.microAppActions = globalStateManager

// 注册微应用
export function registerApps() {
  registerMicroApps([
    {
      name: 'child1',
      entry: '//localhost:8081',
      container: '#subapp-viewport',
      activeRule: '#/user',
      props: {
        data: globalStateManager.getGlobalState(),
        actions: globalStateManager,
        store: store
      }
    },
    {
      name: 'child2',
      entry: '//localhost:8082',
      container: '#subapp-viewport',
      activeRule: '#/product',
      props: {
        data: globalStateManager.getGlobalState(),
        actions: globalStateManager,
        store: store
      }
    }
  ])

  // 启动 qiankun
  start({
    sandbox: {
      // 子应用样式隔离
      strictStyleIsolation: true
    }
  })

  console.log('注册微应用')
}

// 全局状态变化监听
export function onGlobalStateChange(callback) {
  return globalStateManager.onGlobalStateChange(callback, true)
}

// 设置全局状态
export function setGlobalState(state) {
  globalStateManager.setGlobalState(state)
}

// 获取全局状态
export function getGlobalState() {
  return globalStateManager.getGlobalState()
}

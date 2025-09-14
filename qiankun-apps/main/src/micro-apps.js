import { registerMicroApps, start } from 'qiankun'
import store from './store'

// 将全局状态管理器挂载到全局，供子应用使用
window.microAppStore = store

// 注册微应用
export function registerApps() {
  registerMicroApps([
    {
      name: 'child1',
      entry: '//localhost:8081',
      container: '#subapp-viewport',
      activeRule: '#/user',
      props: {
        store: store
      }
    },
    {
      name: 'child2',
      entry: '//localhost:8082',
      container: '#subapp-viewport',
      activeRule: '#/product',
      props: {
        store: store
      }
    }
  ], {
    // beforeLoad: (app) => console.log('before load', app),
    // beforeMount: [(app) => console.log('before mount', app)],
  })

  // 启动 qiankun
  start({
    sandbox: {
      // 子应用样式隔离
      strictStyleIsolation: true
    }
  })

  console.log('注册微应用')
}

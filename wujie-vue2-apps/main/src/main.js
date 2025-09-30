import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WujieVue from 'wujie-vue2'

Vue.config.productionTip = false
Vue.use(WujieVue)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

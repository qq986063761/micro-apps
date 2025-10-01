import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './ajax'
import plugin from './plugins/index'

// 全局配置 child1 的远程地址
window.__REMOTES__ = 'http://localhost:8081/remoteEntry.js'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax

Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

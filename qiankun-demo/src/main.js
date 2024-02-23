import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import plugin from './plugins'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(plugin)

window.rootVm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 监听全局行为
window.rootVm.$on('action', () => {
  // window.childVmMap.okr.$emit('action')
})
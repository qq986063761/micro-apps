import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ajax from './ajax'

Vue.config.productionTip = false

window.ElementUI = ElementUI
Vue.use(ElementUI)

Vue.prototype.$ajax = ajax

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

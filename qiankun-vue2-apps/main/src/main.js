import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApps } from './micro-apps'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 注册微应用
    registerApps()
  }
}).$mount('#app')

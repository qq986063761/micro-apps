import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WujieVue from 'wujie-vue2'

Vue.config.productionTip = false
Vue.use(WujieVue)

window.mainStore = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

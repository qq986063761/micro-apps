import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 提供给主应用
window.$microApp = {
  useComponent: (opts) => {
    const { component, method, args } = opts
    window[component][method](...args)
    // window.vm['$' + component][method](...args)
  }
}

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    window.parent.$microApp.onReady(window)
  }
}).$mount('#app')

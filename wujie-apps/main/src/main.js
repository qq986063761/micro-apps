import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WujieVue from 'wujie-vue2'

Vue.config.productionTip = false
Vue.use(WujieVue)

// 提供给子应用调用
window.useMainApp = async (opts) => {
  const { type, window: childWindow, name } = opts
  console.log('useMainApp', opts, childWindow.$wujie.bus.id)
  
  switch (type) {
    case 'ready':
      break
    case 'component':
      
      break
  }
}

window.getMainApp = async (opts) => {
  const { type } = opts

  switch (type) {
    case 'component':
      break
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

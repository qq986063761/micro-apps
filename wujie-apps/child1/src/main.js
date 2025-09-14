import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

window.useChildApp = async (opts) => {
  const { type } = opts
  switch (type) {
    case 'component':
      break
  }
}

window.getChildApp = async (opts) => {
  const { type } = opts
  switch (type) {
    case 'component':
      break
  }
}

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    window.parent.useMainApp({
      type: 'ready',
      window: window
    })
  }
}).$mount('#app')



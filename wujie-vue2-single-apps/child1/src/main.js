import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
// 样式可以不引入，会继承其他应用的 element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
import plugin from './plugins'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(plugin)

window.$microApp.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

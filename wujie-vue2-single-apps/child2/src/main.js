import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from './plugins'  // 引入插件 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(plugin)

Vue.config.productionTip = false

window.$mApp.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

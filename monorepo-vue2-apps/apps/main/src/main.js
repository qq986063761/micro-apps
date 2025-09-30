import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { registerMicroApps, start } from 'qiankun'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 注册微应用
registerMicroApps([
  {
    name: 'child1',
    entry: '//localhost:8081',
    container: '#child1-container',
    activeRule: '/child1'
  },
  {
    name: 'child2',
    entry: '//localhost:8082',
    container: '#child2-container',
    activeRule: '/child2'
  }
])

// 启动 qiankun
start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

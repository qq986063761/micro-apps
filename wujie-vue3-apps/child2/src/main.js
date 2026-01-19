import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugin from './plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(plugin)

// 挂载应用
const vm = app.mount('#app')

// 如果是在微前端环境下，通知主应用初始化完成
if (window.$wujie) {
  const { bus } = window.$wujie
  const { appName } = window.$wujie.props || {}
  
  if (appName && bus) {
    bus.$emit('app:init', {
      appName,
      data: { timestamp: Date.now() }
    })
  }
}

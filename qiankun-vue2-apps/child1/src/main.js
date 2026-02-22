import './public-path'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createRouter } from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import plugin from './plugins'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(plugin)

let routerInstance = null
let instance = null

function render(props = {}) {
  const { container } = props
  routerInstance = createRouter()
  window.__CHILD_ROUTER_INSTANCE__ = routerInstance
  instance = new Vue({
    router: routerInstance,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')

  if (props.setAppInstance) {
    props.setAppInstance('child1', { $app: window.$app })
  }
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('child1 bootstrap')
}

export async function mount(props) {
  console.log('child1 mount', props)
  window.__QIANKUN_PROPS__ = props
  render(props)
}

export async function unmount() {
  console.log('child1 unmount')
  if (instance) {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
  }
  routerInstance = null
  window.__CHILD_ROUTER_INSTANCE__ = null
}

// 开发/构建兜底：确保 qiankun 能从 window[appName] 读到生命周期（Vue CLI dev 下 UMD 有时未挂到 window）
if (typeof window !== 'undefined') {
  window.child1 = { bootstrap, mount, unmount }
}

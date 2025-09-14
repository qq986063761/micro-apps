import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container, data, actions, store: mainStore } = props

  // 如果是在微前端环境中，初始化全局状态监听
  if (window.__POWERED_BY_QIANKUN__ && actions) {
    // 同步初始全局状态
    if (data) {
      store.dispatch('syncGlobalState', data)
    }
    // 开始监听全局状态变化
    store.dispatch('watchGlobalState')
  }
  
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[child1] vue app bootstraped')
}

export async function mount(props) {
  console.log('[child1] props from main framework', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

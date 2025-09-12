import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container, getGlobalState, setGlobalState, onGlobalStateChange } = props
  
  // 将全局状态管理方法挂载到 window 上，供组件使用
  if (getGlobalState) {
    window.microAppActions = {
      getGlobalState,
      setGlobalState,
      onGlobalStateChange
    }
  }
  
  instance = new Vue({
    router,
    store,
    render: h => h(App),
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

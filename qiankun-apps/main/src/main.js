import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start, initGlobalState } from 'qiankun'

Vue.config.productionTip = false

// 初始化全局状态
const actions = initGlobalState({
  user: {
    name: 'Admin',
    role: 'administrator'
  },
  theme: 'light',
  language: 'zh-CN'
})

// 监听全局状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('主应用监听到全局状态变化:', state, prev)
  // 更新主应用状态
  store.commit('SET_USER', state.user)
  store.commit('SET_THEME', state.theme)
  store.commit('SET_LANGUAGE', state.language)
})

// 注册微应用
registerMicroApps([
  {
    name: 'child1',
    entry: '//localhost:8081',
    container: '#child1-container',
    activeRule: '/child1',
    props: {
      // 传递全局状态给子应用
      getGlobalState: actions.getGlobalState,
      setGlobalState: actions.setGlobalState,
      onGlobalStateChange: actions.onGlobalStateChange
    }
  },
  {
    name: 'child2',
    entry: '//localhost:8082',
    container: '#child2-container',
    activeRule: '/child2',
    props: {
      // 传递全局状态给子应用
      getGlobalState: actions.getGlobalState,
      setGlobalState: actions.setGlobalState,
      onGlobalStateChange: actions.onGlobalStateChange
    }
  },
])

// 启动 qiankun
start()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

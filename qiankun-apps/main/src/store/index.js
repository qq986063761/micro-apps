import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局用户信息
    userInfo: {
      name: 'Admin',
      role: 'administrator',
      avatar: 'https://via.placeholder.com/40'
    },
    // 全局主题设置
    theme: 'light',
    // 全局语言设置
    language: 'zh-CN',
    // 全局通知设置
    notifications: {
      email: true,
      sms: false
    },
    // 最后更新时间
    lastUpdate: null,
    // 全局消息
    message: null,
    // 子应用状态同步
    childAppStates: {
      child1: {},
      child2: {}
    }
  },
  getters: {
    isDarkTheme: state => state.theme === 'dark',
    // 获取全局状态（供子应用使用）
    globalState: state => ({
      user: state.userInfo,
      theme: state.theme,
      language: state.language,
      notifications: state.notifications,
      lastUpdate: state.lastUpdate,
      message: state.message
    })
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = { ...state.userInfo, ...userInfo }
      state.lastUpdate = new Date().toISOString()
    },
    setTheme(state, theme) {
      state.theme = theme
      state.lastUpdate = new Date().toISOString()
    },
    setLanguage(state, language) {
      state.language = language
      state.lastUpdate = new Date().toISOString()
    },
    setNotifications(state, notifications) {
      state.notifications = { ...state.notifications, ...notifications }
      state.lastUpdate = new Date().toISOString()
    },
    setMessage(state, message) {
      state.message = message
      state.lastUpdate = new Date().toISOString()
    },
    // 更新子应用状态
    updateChildAppState(state, { appName, data }) {
      state.childAppStates[appName] = { ...state.childAppStates[appName], ...data }
      state.lastUpdate = new Date().toISOString()
    },
    // 设置全局状态（供子应用调用）
    setGlobalState(state, newState) {
      if (newState.user) {
        state.userInfo = { ...state.userInfo, ...newState.user }
      }
      if (newState.theme) {
        state.theme = newState.theme
      }
      if (newState.language) {
        state.language = newState.language
      }
      if (newState.notifications) {
        state.notifications = { ...state.notifications, ...newState.notifications }
      }
      if (newState.message !== undefined) {
        state.message = newState.message
      }
      state.lastUpdate = new Date().toISOString()
    }
  },
  actions: {
    updateUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      commit('setTheme', newTheme)
    },
    updateLanguage({ commit }, language) {
      commit('setLanguage', language)
    },
    updateNotifications({ commit }, notifications) {
      commit('setNotifications', notifications)
    },
    showMessage({ commit }, message) {
      commit('setMessage', message)
      // 3秒后自动清除消息
      setTimeout(() => {
        commit('setMessage', null)
      }, 3000)
    },
    // 子应用状态更新
    updateChildAppState({ commit }, { appName, data }) {
      commit('updateChildAppState', { appName, data })
    },
    // 设置全局状态（供子应用调用）
    setGlobalState({ commit }, newState) {
      commit('setGlobalState', newState)
    }
  }
})

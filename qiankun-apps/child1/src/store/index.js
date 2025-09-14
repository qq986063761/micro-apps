import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive' }
    ],
    currentUser: null,
    loading: false
  },
  getters: {
    userCount: state => state.users.length,
    activeUsers: state => state.users.filter(user => user.status === 'active'),
    adminUsers: state => state.users.filter(user => user.role === 'admin')
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    UPDATE_USER(state, { id, userData }) {
      const index = state.users.findIndex(user => user.id === id)
      if (index !== -1) {
        state.users.splice(index, 1, { ...state.users[index], ...userData })
      }
    },
    DELETE_USER(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      // 模拟 API 调用
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 1000)
    },
    addUser({ commit }, user) {
      const newUser = {
        ...user,
        id: Date.now(),
        status: 'active'
      }
      commit('ADD_USER', newUser)
    },
    updateUser({ commit }, { id, userData }) {
      commit('UPDATE_USER', { id, userData })
    },
    deleteUser({ commit }, id) {
      commit('DELETE_USER', id)
    },
    updateGlobalState({ }, data) {
      // 向主应用发送全局状态更新
      if (window.__POWERED_BY_QIANKUN__ && window.microAppActions) {
        window.microAppActions.setGlobalState(data)
      }
    },
    // 从主应用同步全局状态到本地
    syncGlobalState({ commit }, globalState) {
      if (globalState.user) {
        commit('SET_CURRENT_USER', globalState.user)
      }
    },
    // 监听主应用状态变化
    watchGlobalState({ dispatch }) {
      if (window.__POWERED_BY_QIANKUN__ && window.microAppActions) {
        window.microAppActions.onGlobalStateChange((state, prevState) => {
          // 当全局状态变化时，同步到本地
          dispatch('syncGlobalState', state)
        }, true)
      }
    }
  }
})

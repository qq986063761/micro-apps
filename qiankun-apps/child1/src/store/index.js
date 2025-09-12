import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'admin'
    },
    users: [],
    loading: false
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    UPDATE_USER(state, user) {
      const index = state.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        state.users.splice(index, 1, user)
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(u => u.id !== userId)
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        const users = [
          { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
          { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
          { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive' }
        ]
        commit('SET_USERS', users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    addUser({ commit }, user) {
      const newUser = {
        ...user,
        id: Date.now(),
        status: 'active'
      }
      commit('ADD_USER', newUser)
    },
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user)
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId)
    }
  },
  getters: {
    activeUsers: state => state.users.filter(user => user.status === 'active'),
    adminUsers: state => state.users.filter(user => user.role === 'admin'),
    userCount: state => state.users.length
  }
})

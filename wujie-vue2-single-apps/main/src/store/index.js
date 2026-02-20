import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light' // light, dark
  },
  getters: {
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
    },
    TOGGLE_THEME(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME')
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    }
  },
  modules: {
  }
})

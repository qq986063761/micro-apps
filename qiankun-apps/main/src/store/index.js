import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Admin',
      role: 'administrator'
    },
    globalData: {
      theme: 'light',
      language: 'zh-CN'
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_THEME(state, theme) {
      state.globalData.theme = theme
    },
    SET_LANGUAGE(state, language) {
      state.globalData.language = language
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_USER', user)
    },
    updateTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    updateLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  },
  modules: {
  }
})

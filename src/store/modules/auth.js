import axios from 'axios'
export default {
  namespaced: true,
  state: {
    isMenuVisible: false,
    user: null,
    validatingToken: true,
    users: [],
    userId: []
  },
  mutations: {
    toggleMenu (state, isVisible) {
      if (!state.user) {
        state.isMenuVisible = false
        return
      }

      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setUser (state, user) {
      state.user = user

      if (user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
        state.isMenuVisible = true
      } else {
        delete axios.defaults.headers.common['Authorization']
        state.isMenuVisible = false
      }
    },
    setUsers (state, payload) {
      state.users = payload
    },
    getUser (state, payload) {
      state.userId = payload
    },
    validatingToken (state, payload) {
      state.validatingToken = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    getUser ({ commit }, payload) {
      console.log(payload)
      commit('getUser', payload)
    },
    setUsers ({ commit }, payload) {
      commit('setUsers', payload)
    },
    validatingToken ({ commit }, payload) {
      commit('validatingToken', payload)
    }
  }
}

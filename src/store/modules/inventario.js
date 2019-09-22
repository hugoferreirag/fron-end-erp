import axios from 'axios'
export default {
  namespaced: true,
  state: {
    arma: [],
    municao: [],
    municaoStock: [],
    municaoInventory: [],
    acessorio: []
  },
  mutations: {

    setArmas (state, payload) {
      state.arma = payload
    },
    setMunicoesNf (state, payload) {
      state.municao = payload
    },
    setMunicaoStock (state, payload) {
      state.municaoStock = payload
    },
    setMunicaoInventory (state, payload) {
      state.municaoInventory = payload
    },
    setAcs (state, payload) {
      state.acessorio = payload
    }
  },
  actions: {
    async setArmas ({ commit }) {
      await axios.get('/armas')
        .then(result => {
          commit('setArmas', result.data)
        }).catch()
    },
    async setMunicoesNf ({ commit }) {
      await axios.get('/municoes_nf')
        .then(result => {
          commit('setMunicoesNf', result.data)
        }).catch()
    },
    async setMunicaoStock ({ commit }) {
      await axios.get('/municoes_stock')
        .then(result => {
          console.log(result)
          commit('setMunicaoStock', result.data)
        }).catch()
    },
    async setMunicaoInventory ({ commit }) {
      await axios.get('/municoes')
        .then(result => {
          commit('setMunicaoInventory', result.data)
        }).catch()
    },
    async setAcs ({ commit }, payload) {
      await axios.get('/acessorios')
        .then(result => {
          commit('setAcs', result.data)
        }).catch()
    }
  }
}

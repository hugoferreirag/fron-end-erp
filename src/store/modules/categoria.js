import axios from 'axios'
export default {
  namespaced: true,
  state: {
    modelArma: [],
    modelMunicao: [],
    modelAcs: []
  },
  mutations: {

    setModeloArmas (state, payload) {
      state.modelArma = payload
    },
    setModeloMunicoes (state, payload) {
      state.modelMunicao = payload
    },
    setModeloAcs (state, payload) {
      state.modelAcs = payload
    }
  },
  actions: {
    setModeloArmas ({ commit }) {
      axios.get('/armas/categoria')
        .then(result => {
          commit('setModeloArmas', result.data)
        })
    },
    setModeloMunicoes ({ commit }) {
      axios.get('/municoes/categoria')
        .then(result => {
          commit('setModeloMunicoes', result.data)
        })
    },
    setModeloAcs ({ commit }, payload) {
      axios.get('/acessorios/categoria')
        .then(result => {
          commit('setModeloAcs', result.data)
        })
    }
  }
}

import axios from 'axios'
export default {
  namespaced: true,
  state: {
    isMenuVisible: false,
    user: null,
    validatingToken: true,
    fornecedores: [],
    fornecedorId: [],
    fornecedorProductArma: [],
    fornecedorProductMunicao: [],
    fornecedorProductAcs: []
  },
  mutations: {

    setFornecedores (state, payload) {
      state.fornecedores = payload
    },
    setFornecedoresProductArma (state, payload) {
      state.fornecedorProductArma = payload
    },
    setFornecedoresProductAcs (state, payload) {
      state.fornecedorProductAcs = payload
    },
    setFornecedoresProductMunicoes (state, payload) {
      state.fornecedorProductMunicao = payload
    },
    getFornecedor (state, payload) {
      state.fornecedorId = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    getFornecedor ({ commit }, payload) {
      commit('getFornecedor', payload)
    },
    setFornecedores ({ commit }, payload) {
      commit('setFornecedores', payload)
    },
    setFornecedoresProductArma ({ commit }, payload) {
      axios.get('/fornecedor/produto/arma')
        .then(result => {
          commit('setFornecedoresProductArma', result.data)
        }).catch()
    },
    setFornecedoresProductAcs ({ commit }, payload) {
      axios.get('/fornecedor/produto/acessorio')
        .then(result => {
          commit('setFornecedoresProductAcs', result.data)
        }).catch()
    },
    setFornecedoresProductMunicoes ({ commit }, payload) {
      axios.get('/fornecedor/produto/municao')
        .then(result => {
          commit('setFornecedoresProductMunicoes', result.data)
        }).catch()
    },
  
  }
}

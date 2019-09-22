import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Auth from './modules/auth'
import Fornecedor from './modules/fornecedor'
import Categoria from './modules/categoria'
import Inventario from './modules/inventario'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Auth, Fornecedor, Categoria, Inventario }
})

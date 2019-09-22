import Vue from 'vue'
import axios from 'axios';
/*'http://190.168.0.50/estoque/' */

axios.defaults.baseURL = 'http://localhost:4000/'

const success = res => res
const error = err => {
  if (err.response.status === 401) {
    localStorage.clear()
    window.location = '/login'
  } else {
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)

Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios
  }
})

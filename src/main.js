import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './plugins/axios'
import 'vue-material-design-icons/styles.css'
import style from './style.css'
import VueTheMask from 'vue-the-mask'
import 'chart.js'
import 'hchs-vue-charts'
Vue.use(window.VueCharts)
Vue.use(VueTheMask)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  style,
  VueTheMask,
  render: h => h(App)
}).$mount('#app')

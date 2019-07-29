import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store/index'
import './mock'
import './assets/style/icon.css'
import './assets/style/global.scss'
import './untils/boost'
import './untils/create-api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

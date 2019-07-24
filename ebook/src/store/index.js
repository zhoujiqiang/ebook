import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import getters from './getters'
import actions from './actions'
import store from './store'
import axios from 'axios'

Vue.use(Vuex) 
Vue.prototype.$ajax = axios

export default new Vuex.Store({
  modules:{
    book,
    store
  },
  getters,
  actions 
})

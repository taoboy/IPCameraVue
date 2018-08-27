import Vue from 'vue'
import Vuex from 'vuex'
import menusModule from './modules/menusModule'
import commonModule from './modules/commonModule'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  	menusModule,
  	commonModule
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import shop from './modules/shop'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        shop
    },
    getters,
  })
  
  export default store
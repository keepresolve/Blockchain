import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    params:<any>[]
  },
  mutations: {
    setParams(state, params:any){
      state.params.push(JSON.parse(JSON.stringify(params)))
    }
  },
  actions: {
  },
  modules: {
  }
})

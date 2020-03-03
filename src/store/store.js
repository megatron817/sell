import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: '倒霉熊',
    age: '18'
  },
  mutations: {
    showName (state, value) {
      state.name = value
    }
  }
})

export default store

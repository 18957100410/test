import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {} //用来保存用户信息
  },
  mutations: {
    setUserinfo(state, obj) {
      if (obj) {
        state.userinfo = obj
      }
    },
  },
  actions: {

  },
  getters: {
    getCompanyID(state) {
      if (state.userinfo.hasOwnProperty('companyID')) {
        return state.userinfo.companyID
      } else {
        return -1
      }
    }
  }
})
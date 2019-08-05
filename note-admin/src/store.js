import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "",
    mobile: ""
  },
  mutations: {
    changeUserInfo(state,userInfo) {
      state.username = userInfo.username
      state.mobile = userInfo.mobile
    },
    clearUserInfo(state) {
      state.username = ""
      state.mobile = ""
    }
  },
  actions: {

  }
})

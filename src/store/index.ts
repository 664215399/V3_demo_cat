import { createStore } from 'vuex'
import { userLogin } from '@/api/login'
import { getToken } from '@/utils/index'
export default createStore({
  state: {
    token: getToken() || '',
    isLogin: false,
    loadingFlag: false
  },
  mutations: {
    SAVE_USER_TOKEN: (state, token) => {
      state.token = token
      state.isLogin = true
    }

  },
  actions: {
    async userLogin ({ commit }, payload) {
      const { data } = await userLogin(payload)
      if (data.token) {
        commit('SAVE_USER_TOKEN', data.token)
        localStorage.setItem('token', data.token)
        return data
      }
    }

  },
  modules: {}
})

import { createStore } from 'vuex'
import { userLogin } from '@/api/login'
import { getToken } from '@/utils/index'
export default createStore({
  state: {
    token: getToken() || '',
    isLogin: false,
    loadingFlag: false,
    userInfo: {
      column: '',
      email: '',
      nickName: '',
      _id: ''

    }
  },
  mutations: {
    SAVE_USER_TOKEN: (state, token) => {
      state.token = token
      state.isLogin = true
    },
    SVAVE_USER_INFO: (state, payload) => {
      state.userInfo = payload
      localStorage.setItem('column', payload.column)
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

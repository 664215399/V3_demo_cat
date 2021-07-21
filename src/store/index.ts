import { createStore } from 'vuex'
import { userLogin } from '@/api/login'
import { getToken } from '@/utils/index'
export default createStore({
  state: {
    token: getToken() || '',
    isLogin: false,
    loadingFlag: false,
    isLoad: false,
    count: 0,
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
    },
    SET_ISLOAD: (state, payload) => {
      state.isLoad = payload
    },
    SAVE_COUNT: (state, payload) => {
      state.count = payload
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

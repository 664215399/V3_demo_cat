import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './index'

const Service = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
Service.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '732F8A5ABA56EA52' }
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  if (config.data instanceof FormData) {
    config.data.append('icode', '732F8A5ABA56EA52')
  } else {
    config.data = { ...config.data, icode: '732F8A5ABA56EA52' }
  }

  return config
})
Service.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return response.data
  }
}, error => {
  // console.log(error.response)
  return Promise.reject(error)
})

export default Service

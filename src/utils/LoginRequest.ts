import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './index'

const Service = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
Service.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '0F1FBE6181FC7AA5' }
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  // if (config.url === '/unload') {
  //   config.headers['Content-Type'] = 'multipart/form-data'
  // }
  if (config.data instanceof FormData) {
    config.data.append('icode', '0F1FBE6181FC7AA5')
  } else {
    config.data = { ...config.data, icode: '0F1FBE6181FC7AA5' }
  }

  return config
})
Service.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return response.data
  }
}, error => {
  // console.log(error.response)
  return error.response.data.code === 400 ? error.response : Promise.reject(error)
})

export default Service

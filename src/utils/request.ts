// @/utils/request.ts
import axios from 'axios'

const Service = axios.create({
  baseURL: 'https://api.thecatapi.com'
})

Service.interceptors.response.use((response:any) => {
  return response

  // return response.data
}, error => {
  return Promise.reject(error)
})

export default Service

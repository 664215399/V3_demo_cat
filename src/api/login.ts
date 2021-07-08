import request from '@/utils/LoginRequest'
interface loginProps {
  email: string,
  password: string
}
/**
 * discrption:UserLogin
 * @param data
 */
export function userLogin (data:loginProps) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
/**
 * discrption:getUserInfo
 */
export function getUserInfo () {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

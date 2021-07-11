import request from '@/utils/LoginRequest'
interface loginProps {
  email: string;
  password: string;
}
interface createUserProps {
  email: string;
  password: string;
  nickName: string;
}
export interface createPostProps {
  title: string;
  content: string;
  image: string;
  column: string;
  author: string;
}
export interface ResponesType<T> {
  code: number;
  msg: string;
  data: T;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}
/**
 * discrption:UserLogin
 * @param {Object} userInfo userInfo
 * @param {string} userInfo.email email
 * @param {string} userInfo.password password
 */
export function userLogin (data: loginProps) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
/**
 * discrption:getUserInfo
 */
export function getUserInfo () {
  return request({
    url: '/user/current',
    method: 'GET'
  })
}

/**
 * discrption:createUser
 * @param {Object} fromData fromData...userInfo
 * @param {string} fromData.nickName name
 * @param {string} fromData.email email
 * @param {string} fromData.password password
 */
export function createUser (data: createUserProps) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}
/**
 * discrption:createPost
 * @param {Object} data postsDetailes
 * @param {string} data.title title
 * @param {string} data.image image
 * @param {string} data.column column
 * @param {string} data.author author
 */
export function createPost (data: createPostProps) {
  return request({
    url: '/posts',
    method: 'POST',
    data
  })
}

export function uploadImage (data: FormData) {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}

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
export interface myColumnsProps {
  pageSize: number,
  currentPage: number,
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
 * @discrption UserLogin
 * @param {*} userInfo userInfo
 * @param {*} userInfo.email email
 * @param {*} userInfo.password password
 */
export function userLogin (data: loginProps) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
/**
 * @discrption getUserInfo
 */
export function getUserInfo () {
  return request({
    url: '/user/current',
    method: 'GET'
  })
}

/**
 * @discrption createUser
 * @param {*} fromData fromData...userInfo
 * @param {*} fromData.nickName name
 * @param {*} fromData.email email
 * @param {*}} fromData.password password
 */
export function createUser (data: createUserProps) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}
/**
 * @discrption createPost
 * @param {*} data postsDetailes
 * @param {*} data.title title
 * @param {*} data.image image
 * @param {*} data.column column
 * @param {*} data.author author
 */
export function createPost (data: createPostProps, apiType:boolean, Did:string) {
  return request({
    url: '/posts' + `${apiType ? '/' + Did : ''}`,
    method: apiType ? 'PATCH' : 'POST',
    data
  })
}
/**
 * @discrption createPost
 * @param {*} data uploadImage
 */
export function uploadImage (data: FormData) {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}
/**
 * @discrption getMyColumns
 * @param {*} data uploadImage
 * @param {*} pageSize pageSize
 * @param {*} currentPage currentPage
 */

export function getMyColumns (id:string, params:myColumnsProps) {
  return request({
    url: `/columns/${id}/posts?`,
    method: 'GET',
    params
  })
}
/**
 * @discrption getMyColumnsDetailes
 * @param {*} id Detailesid
 */
export function getMyColumnsDetailes (id:string) {
  return request({
    url: `/posts/${id}`,
    method: 'GET'

  })
}
export function deletePosts (id:string) {
  return request({
    url: `/posts/${id}`,
    method: 'DELETE'

  })
}

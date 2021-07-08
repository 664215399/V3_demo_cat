import request from '@/utils/request'
export function getColumnList () {
  return request({
    url: '/v1/breeds',
    method: 'get',
    params: {
      limit: 21, page: 1
    }
  })
}

export function searchDetailes (id:string) {
  return request({
    url: '/v1/images/search',
    method: 'get',
    params: {
      breed_ids: id,
      limit: 8
    }
  })
}

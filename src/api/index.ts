import request from '@/utils/request'
export function getColumnList (page:number) {
  return request({
    url: '/v1/breeds',
    method: 'GET',
    params: {
      limit: 21, page
    }
  })
}

export function searchDetailes (id:string) {
  return request({
    url: '/v1/images/search',
    method: 'GET',
    params: {
      breed_ids: id,
      limit: 8
    }
  })
}

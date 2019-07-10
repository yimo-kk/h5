
import request from '@/config/axios'
let baseUrl = '';
if(process.env.NODE_ENV !== 'development'){
  baseUrl = process.env.root
}
export function fetchStoreHome(query) {
  return request({
    url: baseUrl+'/api/mall/subletIndex',
    method: 'post',
    params: query
  })
}

export function fetchStoreDetail(obj) {
  return request({
    url: baseUrl+'/api/sublet/getSubletRelease/' + obj.id,
    headers: {
      'Authorization': 'Bearer ' +obj.token
    },
    method: 'get'
  })
}

/**
 * 获取省市区
 */
export function fetchArea(root, id) {
  return request({
    url: baseUrl+'/api/main/getNextArea/' + root + '/' + id,
    method: 'get'
  })
}

/**
 * 转店搜索
 */
export function shopSearch(query) {
  return request({
    url: baseUrl+'/api/mall/subletSearch/categorySearch',
    method: 'post',
    data: query
  })
}
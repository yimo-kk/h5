
import request from '@/config/axios'
let baseUrl = '';
if(process.env.NODE_ENV !== 'development'){
  baseUrl = process.env.root
}
export function getFindDetail(id, token) {
  return request({
    url: baseUrl+'/api/discovery/getDiscovery/' + id,
    headers: {
        'Authorization': 'Bearer ' +token
    },
    method: 'get'
  })
}

export function fetchCollection(query, token) {
  return request({
    url: baseUrl+'/api/userCollection/addCollection',
    headers: {
        'Authorization': 'Bearer ' +token
    },
    method: 'post',
    params: query
  })
}

export function fetchCancleCollection(id, type, token) {
  return request({
    url: baseUrl+'/api/userCollection/delCollection/' + id + '/' + type,
    headers: {
        'Authorization': 'Bearer ' +token
    },
    method: 'delete'
  })
}
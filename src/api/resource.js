import request from '@/config/axios'
let baseUrl = '';
if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.root
}
export function fetchResourceHome(query) {
  return request({
    url: baseUrl+'/api/resources/index',
    method: 'post',
    params: query
  })
}

export function fetchResourceCategorySearch(query) {
    return request({
      url: baseUrl+'/api/resources/categorySearch',
      method: 'post',
      params: query
    })
}

export function fetchResourceDetail(id, token) {
  return request({
    url: baseUrl+'/api/resources/getResourceDetail/' + id,
    headers: {
      'Authorization': 'Bearer ' +token
    },
    method: 'get',
  })
}

export function fetchServiceOrder(query, token) {
    return request({
      url: baseUrl+'/api/merchantService/submitServiceOrder',
      headers: {
        'Authorization': 'Bearer ' +token
      },
      method: 'post',
      params: query
    })
  }
  

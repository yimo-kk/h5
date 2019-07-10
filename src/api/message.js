import request from '@/config/axios'
let baseUrl = '';
if(process.env.NODE_ENV === 'development'){
  baseUrl = process.env.root
}

export function fetchMessageNotice(id) {
  return request({
    url: baseUrl+'/api/message/getMessage/' + id,
    method: 'get'
  })
}
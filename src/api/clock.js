
import request from '@/config/axios'
let baseUrl = '';
if(process.env.NODE_ENV !== 'development'){
  baseUrl = process.env.root
}
export function fetchClockTimeCard(query, token) {
  return request({
    url: baseUrl + '/api/clock/getClockTimeCardMonthly',
    headers: {
        'Authorization': 'Bearer ' + token
    },
    method: 'post',
    params: query
  })
}
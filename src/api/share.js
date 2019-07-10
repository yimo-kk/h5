import request from '@/config/axios'
let baseUrl = '';
if (process.env.NODE_ENV !== 'development') {
  baseUrl = process.env.root
}

/**
 * 获取产品详情
 * @param {*} obj 
 */
export function getProductDetail(obj) {
  return request({
    url: baseUrl + '/api/goods/getGoodsDetail/' + obj.id + '/' + obj.areaCode,
    headers: {
      'Authorization': 'Bearer ' +obj.token
    },
    method: 'get'
  })
}

/**
 * 获取店铺首页信息
 * @param {} obj
 */
export function getShopHomeInfo(obj) {
  return request({
    url: baseUrl + '/api/storeIndex/getStoreIndex/' + obj.id,
    headers: {
      'Authorization': 'Bearer ' +obj.token
    },
  })
}

/**
 * 获取招聘发布详情
 * @param {*} obj 
 */
export function getRecruitDetail(obj) {
  return request({
    url: baseUrl + '/api/recruit/getRecruitRelease/' + obj.id,
    headers: {
      'Authorization': 'Bearer ' +obj.token
    },
  })
}

export function getCourseDetail(obj) {
  return request({
    url: baseUrl + '/api/mall/education/getCourseDetail/' + obj.id,
    headers: {
      'Authorization': 'Bearer ' +obj.token
    },
  })
}
import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import '@/assets/css/nprogress.css' // progress bar style
import {
  Notify
} from 'vant';

// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJtb2JpbGUiOiIxNTAxMzM2NjkxMyIsImV4cCI6MTU1MzY1ODYwNiwianRpIjoiMTg4OTIifQ.amOJAPmeCdydfI2nhoOEUUIMlvQjRdYHJQPkEMTkhW2b0lsN06DYATF10l5hUbPhUQCGNOO4nYEoZ2KsMNSocA'
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  // config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // if (store.getters.access_token) {
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(data => {
  NProgress.done()
  return data
}, error => {
  console.log(error,'error00000000000');
  NProgress.done()
  let errMsg = error.toString()
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  // Message({
  //   message: errorCode[code] || errorCode['default'],
  //   type: 'error'
  // })
  Notify({
    message: '系统未知错误,请反馈给客服',
    duration: 3000,
    background: '#E45089'
  });
  return Promise.reject(new Error(error))
})

export default axios

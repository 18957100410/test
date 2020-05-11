import axios from '../../node_modules/axios'

// create an axios instance
//const base_url= process.env.NODE_ENV === 'development' ? '':'/api'
const service = axios.create({
  baseURL: 'http://rap2.taobao.org:38080/app/mock/249477',
  timeout: 5000, // request timeout
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8" //json
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    let token = window.sessionStorage.getItem("token");
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// response interceptor
service.interceptors.response.use(

)
export default service
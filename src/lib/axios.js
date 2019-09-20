import axios from 'axios'
import qs from 'qs'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 9000
      // headers: {
      //   Authorization: 'Basic UEJPQzpDRkMtUEJPQw==',
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    console.log(url)
    // 请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config)
      if (config.method === 'post') {
        config.data = (config.data instanceof FormData || config.headers['Content-Type'] === 'application/json') ? config.data : qs.stringify(config.data)
      }

      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization')
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      return res
    }, function (error) {
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest

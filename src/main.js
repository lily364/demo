// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import jwt from 'jsonwebtoken'
import qs from 'qs'
import 'iview/dist/styles/iview.css'
import 'babel-polyfill'

Vue.use(VueRouter)
Vue.use(iView)
// Vue.prototype.$axios = axios
Vue.prototype.HOME = '/api'
Vue.prototype.$qs = qs
Vue.prototype.$jwt = jwt
// const RouterConfig = {
//   routes: router
// }
// const router = new VueRouter(RouterConfig)

Vue.config.productionTip = false
//
// axios.defaults.baseURL = process.env.API_ROOT
// axios.defaults.timeout = 9000
// axios.interceptors.request.use(function (config) {
//   console.log(config.data)
//   console.log(config.method)
//
//   if (config.method === 'post') {
//     config.data = config.data instanceof FormData ? config.data : qs.stringify(config.data)
//
//     console.log(config.data)
//   }
//
//   if (localStorage.getItem('Authorization')) {
//     config.headers.Authorization = localStorage.getItem('Authorization')
//   }
//
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })
//
// /**
//  *  响应拦截
//  */
// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

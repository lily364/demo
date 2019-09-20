import Vue from 'vue'
import Router from 'vue-router'
import {constantRouterMap} from './routers'
import iView from 'iview'
import store from '../store/index'
import {getToken} from '../lib/util'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: constantRouterMap
})
const LOGIN_PAGE_HOME = 'login'
// 导航守卫
router.beforeEach((to, from, next) => {

  // 权限管理测试
  console.log('测试匹配' + to.path)
  const whiteList = ['/login']
  console.log('开始权限测试，进入此功能')
  const token = getToken()
  console.log('测试匹配', to)
  if (token) {
    console.log('测试匹配' + to.path)

    if (to.path === '/' + LOGIN_PAGE_HOME) {
      console.log('匹配成功')
      next({
        path: '/home'
      })
    } else if (to.path === '/error404') {
      console.log('进去404')
      next({
        replace: true,
        name: 'error404'
      })
      console.log(to.path)
    } else {
      console.log('进入===============================')
      // localStorage.removeItem('Authorization')
      if (store.getters.roles.length === 0) {
        store.dispatch('getInfo').then(() => {
          const roles = store.getters.roles
          store.dispatch('GenerateRoutes', {roles}).then(() => {
            router.addRoutes(store.getters.addRouters)
            router.addRoutes([{path: '*' , redirect: '/error404',hidden: true}])
            next({...to, replace: true})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('token是' + token + '正在测试')
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(to => {
  if (to.name !== 'error404') {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
  }
})
export default router

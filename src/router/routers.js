import Login from '@/views/login/login'
import Home from '@/views/home/home'
import Query from '@/views/page/query'
import Result from '@/views/page/result'
import Upload from '@/views/page/upload'
import error404 from '@/views/error-page/404'
import error401 from '@/views/error-page/401'

// export default [
//   {
//     path: '/',
//     redirect: {
//       name: 'login'
//     }
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: Login
//   },
//   {
//     path: '/home',
//     name: 'home',
//     component: Home
//
//   },
//   {
//     path: '/query',
//     name: 'query',
//     component: Query
//
//   }, {
//     path: '/upload',
//     name: 'upload',
//     component: Upload
//
//   }, {
//     path: '/result',
//     name: 'result',
//     component: Result
//   }, {
//     path: '/401',
//     name: 'error401',
//     component: error401
//   }, {
//     path: '*',
//     name: 'error404',
//     component: error404
//   }
// ]

export const constantRouterMap = [
  {
    path: '/',
    redirect: {
      name: 'login'
    },
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  }, {
    path: '/home',
    name: '/home',
    meta: {
      title: '主页',
      icon: 'ios-home',
      roles: ['SuperAdmin', 'User']
    },
    hidden: true,
    component: Home
  }, {
    path: '/result',
    name: 'result',
    hidden: true,
    component: Result
  }, {
    path: '/401',
    hidden: true,
    name: 'error401',
    component: error401
  }
]

// 异步加载动态路由
// 动态查看路由，通过后台权限
export const asyncRouterMap = [
  {
    path: '/home',
    meta: {
      title: '主页',
      icon: 'ios-home',
      roles: ['SuperAdmin', 'User']
    },
    component: Home
  }, {
    path: '/query',
    meta: {
      title: '查询',
      icon: 'ios-paper',
      roles: ['SuperAdmin', 'User']
    },
    component: Query
  }, {
    path: '/upload',
    meta: {
      title: '批处理',
      icon: 'ios-people',
      roles: ['SuperAdmin']
    },
    component: Upload
  }

]

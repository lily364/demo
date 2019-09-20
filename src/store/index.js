import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/user'
import getters from '../store/getters'
import permission from '../store/permission'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 存储用户名
    Authusername: localStorage.getItem('Authusername') ? localStorage.getItem('Authusername') : '',
    // 存储权限
    Authuserrole: localStorage.getItem('Authuserrole') ? localStorage.getItem('Authuserrole') : ''
  },
  /* actions: {
     changeLogin(ctx,Authorization){
       ctx.commit('changeLogin',Authorization);
     }
   }, */
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      console.log('store/index.js---到这里了!')
      localStorage.setItem('Authorization', user.Authorization)
    },
    getUsername (state, user) {
      state.Authusername = user.Authusername
      localStorage.setItem('Authusername', user.Authusername)
    },
    getRole (state, user) {
      state.Authuserrole = user.Authuserrole
      localStorage.setItem('Authuserrole', user.Authuserrole)
    }
  },
  actions: {

  },
  modules: {
    user,
    permission
  },
  getters

})

export default store

import {login, query} from '../api/user'
export default {
  state: {
    roles: []
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 用户登录
    handleLogin ({commit}, {username, password}) {
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 用户查询
    handleQuery ({commit}, data) {
      return new Promise((resolve, reject) => {
        query({
          data
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 设置用户其他信息
    getInfo ({ commit }) {
      return new Promise(resolve => {
        const userRole = JSON.parse(localStorage.getItem('Authuserrole'))
        commit('SET_ROLES', userRole)
        resolve()
      })
    },
    // 登出其他信息
    logOutInfo ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROLES', [])
        resolve()
      })
    }
  }
}

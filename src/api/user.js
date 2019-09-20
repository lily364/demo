// import axios from 'axios'
import axios from '../lib/api.request'
// 登陆
export const login = ({username, password}) => {
  const data = {
    username,
    password
  }
  console.log(data)
  return axios.request({
    url: 'login',
    data,
    method: 'post',
    headers: {
      Authorization: 'Basic UEJPQzpDRkMtUEJPQw==',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

/**
 * customerName:'张某某',
 certType:'10',
 certNo:'11010819931010444X',
 requestId:'007',
 requestName:'zyy',
 authNumber:'0325001',
 queryReason:'01',
 inputUserId:'1007359',
 queryUserId:'testu',
 channel:'36'
 * @returns {*}
 */
// 查询
export const query = (data) => {
  let datas = JSON.stringify(data.data)
  console.log('api+user+—', datas)
  return axios.request({
    url: 'report/view',
    data: data.data,
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('Authorization'),
      'Content-Type': 'application/json'
    }
  })
}

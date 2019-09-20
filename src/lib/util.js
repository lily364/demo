// 获取用户token
export const getToken = () => {
  const token = localStorage.getItem('Authorization')
  console.log(token)
  if (token !== null) {
    return true
  } else {
    return false
  }
}
// 获取用户权限
export const getRole = () => {
  let userRole = localStorage.getItem('Authuserrole')
  if (userRole === undefined) return false
  userRole = JSON.parse(userRole)
  return userRole.includes('SuperAdmin')
}

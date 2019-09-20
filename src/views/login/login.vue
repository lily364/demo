<template>
  <div class="login">
    <div class="login-con">
      <card class="cards" style="opacity: 0.93">
        <div class="form-con">
          <div style="text-align:center">
            <img src="../../assets/Banner_301.jpg">
          </div>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user" direction="vertical">
              <Input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prefix"></Icon>
              </Input>
            </FormItem>

            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码"
                     @on-enter="handleSubmit('formInline')">
                <Icon type="ios-lock-outline" slot="prefix"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button :loading="loading" type="primary" shape="circle" @click="handleSubmit('formInline')"
                      style="width:100%;font-size:14px">登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'login',
  mounted () {
    /* 页面挂载获取的token，若本地存在正确token，则跳转到主页，不需登录 */

  },
  data () {
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正确的用户名，不要为空'))
      } else if (value.length > 10) {
        callback(new Error('请输入不超过10位的用户名'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {validator: validateUserName, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码长度不能低于6位！', trigger: 'blur'}
        ]
      },
      userToken: ''
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    // handleSubmit (name) {
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //       this.$Loading.start()
    //       this.loading = true
    //       let data = {
    //         username: this.formInline.user,
    //         password: this.formInline.password
    //       }
    //       this.$Loading.finish()
    //       // this.$router.push('/home')
    //       this.$axios.post('/login', data, {
    //         headers: {
    //           Authorization: 'Basic UEJPQzpDRkMtUEJPQw==',
    //           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         }
    //       }).then(res => {
    //         this.$Message.success('登录成功!')
    //         console.log(res)
    //         console.log(res.headers)
    //         console.log(res.data.data.value)
    //         this.userToken = 'Bearer ' + res.data.data.value
    //         console.log(this.userToken)
    //         /** 获取详细的token保存在本地当中 */
    //         this.$store.commit('changeLogin', {
    //           Authorization: this.userToken
    //         })
    //         this.$store.commit('getUsername', {
    //           Authusername: this.formInline.user
    //         })
    //         this.$Loading.finish()
    //         this.$router.push('/home')
    //       }).catch(error => {
    //         console.log(error.toString().toLowerCase())
    //         if (error.toString().match('Error:')) {
    //           this.$Message.error('登录失败!')
    //           this.loading = false
    //           // if (localStorage.getItem('Authorization') != null) {
    //           //   localStorage.removeItem('Authorization')
    //           // }
    //         } else {
    //           this.$Message.error(error.response.data.msg)
    //           this.loading = false
    //         }
    //       })
    //     } else {
    //       this.$Message.error('请输入正确的用户名或密码!')
    //       this.loading = false
    //     }
    //   })
    // }
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit (name) {
      let username = this.formInline.user
      let password = this.formInline.password
      console.log(username + '1' + password)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.handleLogin({username, password}).then(res => {
            console.log(res)
            this.$Message.success('登录成功!')
            this.userToken = 'Bearer ' + res.data.data.value
            // console.log(this.userToken)
            // /** 获取详细的token保存在本地当中 */
            this.$store.commit('changeLogin', {
              Authorization: this.userToken
            })
            this.$store.commit('getUsername', {
              Authusername: this.formInline.user
            })
            this.$store.commit('getRole', {
              Authuserrole: JSON.stringify(this.$jwt.decode(res.data.data.value).authorities)
            })
            this.$Loading.finish()
            this.$router.push('/home')
          }).catch(error => {
            console.log(error.toString().toLowerCase())
            if (error.toString().includes('Error:')) {
              this.$Message.error('登录失败!')
              this.loading = false
            } else {
              this.$Message.error(error.response.data.msg)
              this.loading = false
            }
          })
        } else {
          this.$Message.error('请输入正确的用户名或密码!')
          this.loading = false
        }
      })
    }
  }
}
</script>

<style>
  .login {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login.jpg");
    background-size: cover;
    /*transform: translateX(-60%);*/
    position: absolute;
  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 270px;
    height: 240px;
  }

</style>

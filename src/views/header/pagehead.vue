<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" active-key="1">
      <div class="logo-con">
        <img src="../../assets/Banner_301.jpg" >
      </div>

      <Dropdown placement="bottom-end" style="float: right">
          <span class="head-img">
            <avatar src="./static/image/log.png"></avatar>
          </span>
        {{name}}&nbsp;&nbsp;&nbsp;
        <Dropdown-menu slot="list">
          <Dropdown-item @click.native="logout()">退出</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>

      <Menu-item v-for="(item,index) in reverseArr(routers)" :to="item.component.name" :name="item.component.name"
      :class="item.component.name" style="float: right" :key="index">
        <Icon :type="item.meta.icon"></Icon>
        {{item.meta.title}}
      </Menu-item>

      <!--<Menu-item name="batch" key="3" to="upload"  class="uploads" style="float: right">-->
        <!--<Icon type="ios-people"></Icon>-->
        <!--批处理-->
      <!--</Menu-item>-->
      <!--<Menu-item name="query" key="2" to="query" class="query" style="float: right">-->
        <!--<Icon type="ios-paper"></Icon>-->
        <!--数据查询-->
      <!--</Menu-item>-->
      <!--<Menu-item name="home" key="1" to="home" class="home" style="float: right">-->
        <!--<Icon type="ios-home"/>-->
        <!--主页-->
      <!--</Menu-item>-->

    </Menu>
    <br>
  </div>

</template>
<script>

import store from '../../store'

/* 引入公共方法 */
export default {
  name: 'pagehead',
  data () {
    return {
      name: localStorage.getItem('Authusername'),
      theme1: 'light',
      routers: store.getters.addRouters
    }
  },

  methods: {
    logout () {
      console.log('用户：' + localStorage.getItem('Authusername') + ',退出PBOC系统')
      localStorage.removeItem('Authorization')
      this.$store.dispatch('logOutInfo').then(() => {
        location.reload() // 重新实例化vue-router对象，避免出现bug
        this.$router.push('/login')
      })
    },
    reverseArr (value) {
      /*
        利用vue自带的reverse() 会报循环错误
        [Vue warn]:You many have an infinite update loop in a component render function.
        改变方式，自己写个数组倒叙排列，输出自己需要的参数，用于界面展示。
       */
      var newArr = []
      for (var i = value.length - 1; i >= 0; i--) {
        newArr.push(value[i])
      }
      return newArr
    }
  }
}
</script>
<style>
  .logo-con{
    height: 64px;
    width: 128px;
    float: left;
  }
  .logo-con img{
    height: 44px;
    width: 128px;
    margin: 7px auto;
  }
</style>

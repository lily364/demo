<template>
  <div style="background-color: #ccc;width: 100%;height: 100%;position: absolute;">
    <page-head></page-head>
    <card class="uploadCard">
      <Upload
        multiple
        :before-upload="acceptFile"
        :headers="headers"
        :action='api_root'
        :on-error="errorUpload"
        :on-success="successUpload"
        accept=".csv"
        type="drag">
        <div style="padding: 42px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>请点击上传或拖拽文件到此处</p>
        </div>
      </Upload>
    </card>
  </div>
</template>
<script>
import PageHead from '../header/pagehead'

export default {
  name: 'upload',
  data () {
    return {
      api_root: process.env.API_ROOT + '/batch',
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }
  },
  components: {
    PageHead
  },
  methods: {

    // 上传失败处理
    errorUpload (error, file, fileList) {
      console.log(error)
      this.$Message.error(file.msg)
    },
    successUpload (response, file, fileList) {
      // 测试上传
      console.log('测试上传')
      console.log(file)
      console.log(response)
      this.$Message.success(response.msg)
    },
    acceptFile (file) {
      console.log(file)
      if (file.type === 'application/vnd.ms-excel') {
        return true
      } else {
        this.$Message.error('上传文件失败，请上传.CSV文件')
        return false
      }
    }
  }
}
</script>

<style>
  .uploadCard {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 200px auto;
    color: #2c3e50;
    width: 480px;
    /*height: 200px;*/
    height: auto;
  }
</style>

<template>
    <error-content code="404" desc="您的页面飞走了！" :src="src"></error-content>
</template>

<script>
import error404 from '../../assets/error-page/error-404.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_404',
  components: {
    errorContent
  },
  data () {
    return {
      src: error404
    }
  }
}
</script>

<style scoped>

</style>

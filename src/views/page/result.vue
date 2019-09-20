<template>
  <div>
    <page-head></page-head>
    <!--<Form>-->
      <!--<FormItem>-->
        <!--&lt;!&ndash;<iframe :src="webRoot" width="100%" height="790"&ndash;&gt;-->
                <!--&lt;!&ndash;frameborder="0"&ndash;&gt;-->
                <!--&lt;!&ndash;scrolling="auto"&ndash;&gt;-->
                <!--&lt;!&ndash;onload="this.height=this.contentWindow.document.documentElement.scrollHeight"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</iframe>&ndash;&gt;-->
      <!--</FormItem>-->
    <!--</Form>-->
    <a target="_blank" :href="webRoot"></a>
  </div>
</template>

<script>
import PageHead from '../header/pagehead'
export default {
  name: 'result',
  data () {
    return {
      oldhttphot: '',
      webRoot: ''
    }
  },
  methods: {
  },
  mounted () {
    // '/static/'+this.$route.params.web
    console.log('我这个web是什么', this.$route.params.web)
    if (typeof this.$route.params.web === 'undefined') {
      console.log('=========================================')
      // this.webRoot = 'http://localhost:8090/static/411322198401070615.html'
      this.webRoot = 'http://localhost:8090/#/error404'
    } else {
      let newhttphot = 'http://159.191.1.88:30138'
      let oldhttphot = this.$route.params.web
      let s = oldhttphot.replace(/\/\/(.*?):([0-9]+)/, newhttphot)
      this.webRoot = s
      console.log(window.open(s, '_blank'))
    }
  },
  components: {
    PageHead
  }
}
</script>

<style scoped>

</style>

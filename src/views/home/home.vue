<template>
  <div>
    <page-head></page-head>
    <div class="carousel-div">
      <Carousel v-model="carousel1"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed" >
        <CarouselItem>
          <img src="../../assets/login.jpg">
        </CarouselItem>
        <CarouselItem>
          <img src="../../assets/login.jpg">
        </CarouselItem>
        <CarouselItem>
          <img src="../../assets/login.jpg">
        </CarouselItem>
        <CarouselItem>
          <img src="../../assets/login.jpg">
        </CarouselItem>
      </Carousel>
    </div>
    <Divider></Divider>
  </div>
</template>
<script>
import PageHead from '../header/pagehead'
/* 引入公共方法 */
export default {
  name: 'home',
  data () {
    return {
      carousel1: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 3000
      }
    }
  },
  components: {PageHead}
}
</script>
<style>

  .carousel-div img {
    width: 100%;
    height: auto;
    background-size: cover;
  }

</style>

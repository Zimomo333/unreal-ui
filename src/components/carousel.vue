<template>
  <div class="test-carousel">
    <ur-carousel style="width:800px;height:500px;margin-bottom:50px;" direction="horizontal">
      <ur-carousel-item v-for="item in items" :key="item.id">
        <img :src="item.imgSrc">
      </ur-carousel-item>
    </ur-carousel>
  </div>
</template>

<script>

export default {
  name: 'test-carousel',
  data() {
    return {
      items: [
        {
          id: 1,
          imgSrc: require('@/assets/img/carousel/image-1.jpg'),
        },
        {
          id: 2,
          imgSrc: require('@/assets/img/carousel/image-2.jpg'),
        },
        {
          id: 3,
          imgSrc: require('@/assets/img/carousel/image-3.jpg'),
        },
      ]
    }
  }
}
</script>

<style lang="scss">
  .test-carousel {
  }
</style>

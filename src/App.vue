<template>
  <div id="app">
    <ur-button>Hello, world.</ur-button>
    <ur-input class="ur-input" v-model="input" placeholder="请输入内容" clearable>
      <template slot="prepend">Http://</template>
      <ur-button slot="append">提交</ur-button>
    </ur-input>
    <test-carousel></test-carousel>
  </div>
</template>

<script>
import TestCarousel from './components/carousel';

export default {
  name: 'App',
  components: {
    TestCarousel,
  },
  data() {
    return {
      input: '',
    }
  }
}
</script>

<style lang="scss">
body {
    background: #e6e7ee;
    display: flex;
    justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ur-input {
  margin: 30px;
}
</style>

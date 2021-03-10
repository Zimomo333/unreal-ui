<template>
  <div id="app">
    <unreal-button>Hello, world.</unreal-button>
    <test-carousel></test-carousel>
  </div>
</template>

<script>
import TestCarousel from './components/carousel';

export default {
  name: 'App',
  components: {
    TestCarousel,
  }
}
</script>

<style>
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
</style>

<template>
  <div id="app">
    <ur-button>Hello, world.</ur-button>
    <ur-input class="ur-input" v-model="input" placeholder="请输入内容" clearable>
      <template slot="prepend">Http://</template>
      <ur-button slot="append">提交</ur-button>
    </ur-input>
    <ur-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      @close="handleClose"
      :type="tag.type">
      {{tag.name}}
    </ur-tag>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }, {
        value: '选项6',
        label: '北京烤鸭'
      }, {
        value: '选项7',
        label: '北京烤鸭'
      }, {
        value: '选项8',
        label: '北京烤鸭'
      }, {
        value: '选项9',
        label: '北京烤鸭'
      }],
      value: '',
    }
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
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

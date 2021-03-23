<template>
  <div id="app">
    <div>
      <p class="title">按钮</p>
      <ur-button class="button-demo">弹起</ur-button>
      <ur-button class="button-demo" :loading="true">Loading...</ur-button>
      <ur-button class="button-demo active">按下</ur-button>
    </div>
    <div>
      <p class="title">输入框</p>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" clearable>
        <template slot="prepend">Http://</template>
      </ur-input>
      <br>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" clearable>
        <template slot="append">.com</template>
      </ur-input>
      <br>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" clearable>
        <template slot="prepend">密码</template>
        <ur-button slot="append">提交</ur-button>
      </ur-input>
    </div>
    <div>
      <p class="title">标签</p>
      <ur-tag
        class="tag-demo"
        v-for="tag in tags"
        :key="tag.name"
        closable
        @close="handleClose"
        :type="tag.type">
        {{tag.name}}
      </ur-tag>
    </div>

    <div>
      <p class="title">下拉框</p>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="margin-top: 20rem;">
      <p class="title">跑马灯</p>
      <test-carousel></test-carousel>
    </div>
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
}

.title {
  font-size: 1.5rem;
}
.button-demo {
  margin: 0 1rem;
  &.active {
    border: 0;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
  }
}
.input-demo {
  margin: 0 0 0.8rem;
  width: 25rem;
}
.tag-demo {
  margin: 0 0.4rem;
}
</style>

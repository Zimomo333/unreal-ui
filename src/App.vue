<template>
  <div id="app">
    <div>
      <p class="title">按钮</p>
      <ur-button class="button-demo" size="large">超大尺寸</ur-button>
      <ur-button class="button-demo" size="medium">中等尺寸</ur-button>
      <ur-button class="button-demo" size="small">小型尺寸</ur-button>
      <ur-button class="button-demo" size="mini">超小尺寸</ur-button>
      <ur-button class="button-demo" :loading="true">Loading...</ur-button>
      <ur-button class="button-demo active">按下</ur-button>
    </div>
    <div>
      <p class="title">输入框</p>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" clearable>
        <template slot="prepend">Http://</template>
      </ur-input>
      <br>
      <ur-input class="input-demo" placeholder="请输入内容" clearable>
        <template slot="append">.com</template>
      </ur-input>
      <br>
      <ur-input class="input-demo" v-model="input" placeholder="请输入内容" show-password>
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

    <div style="padding-bottom: 20rem;">
      <p class="title">下拉框多选</p>
      <ur-select v-model="value" multiple placeholder="请选择">
        <ur-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </ur-option>
      </ur-select>
    </div>
    <div>
      <p class="title">面包屑</p>
      <ur-breadcrumb separator="/">
        <ur-breadcrumb-item :to="{ path: '/' }">首页</ur-breadcrumb-item>
        <ur-breadcrumb-item><a href="/">活动管理</a></ur-breadcrumb-item>
        <ur-breadcrumb-item>活动列表</ur-breadcrumb-item>
      </ur-breadcrumb>
    </div>
    <div>
      <p class="title">单选框</p>
      <ur-radio-group v-model="radio">
        <ur-radio :label="3">备选项</ur-radio>
        <ur-radio :label="6">备选项</ur-radio>
        <ur-radio :label="9">备选项</ur-radio>
      </ur-radio-group>
      <p class="title">多选框</p>
      <ur-checkbox-group v-model="checkList">
        <ur-checkbox label="复选框 A"></ur-checkbox>
        <ur-checkbox label="复选框 B"></ur-checkbox>
        <ur-checkbox label="复选框 C"></ur-checkbox>
        <ur-checkbox label="禁用" disabled></ur-checkbox>
        <ur-checkbox label="选中且禁用" disabled></ur-checkbox>
      </ur-checkbox-group>
    </div>
    <div>
      <p class="title">分页</p>
      <ur-pagination
        background
        layout="prev, pager, next, jumper"
        :total="50">
      </ur-pagination>
    </div>
    <div>
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
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }, {
        value: '选项6',
        label: '选项6'
      }, {
        value: '选项7',
        label: '选项7'
      }, {
        value: '选项8',
        label: '选项8'
      }, {
        value: '选项9',
        label: '选项9'
      }],
      value: '',
      radio: 3,
      checkList: ['选中且禁用','复选框 A'],
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
  margin: .8rem 0;
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

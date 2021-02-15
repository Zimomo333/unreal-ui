import Vue from 'vue';
import App from './App.vue';

// 导入组件库
import UnrealButton from '../lib/button/index.js';
import '../lib/button/style.css'
// 注册组件库
Vue.use(UnrealButton);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

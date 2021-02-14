import Vue from 'vue';
import App from './App.vue';

// 导入组件库
import UnrealUI from '../lib/unreal-ui.umd.min';
import '../lib/unreal-ui.css';
// 注册组件库
Vue.use(UnrealUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

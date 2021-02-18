import Vue from 'vue';
import App from './App.vue';

// import { Button } from 'unreal-ui'
// import UnrealUI from 'unreal-ui'
import Button from '../packages/button/index';
import Carousel from '../packages/carousel/index';

Vue.use(Button)
Vue.use(Carousel)
// Vue.use(UnrealUI)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

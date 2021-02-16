import Vue from 'vue';
import App from './App.vue';

import { Button } from 'unreal-ui'
// import UnrealUI from 'unreal-ui'

Vue.use(Button)
// Vue.use(UnrealUI)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

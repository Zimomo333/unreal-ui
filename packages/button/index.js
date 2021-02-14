import UnrealButton from './src/button.vue';

/* istanbul ignore next */
UnrealButton.install = function (Vue) {
  Vue.component(UnrealButton.name, UnrealButton);
};

export default UnrealButton;

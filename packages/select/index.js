import ElSelect from './select.vue';

/* istanbul ignore next */
ElSelect.install = function(Vue) {
  Vue.component(ElSelect.name, ElSelect);
};

export default ElSelect;

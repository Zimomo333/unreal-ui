<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'UrCheckboxGroup',

    componentName: 'UrCheckboxGroup',

    mixins: [Emitter],

    inject: {
      urFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _urFormItemSize() {
        return (this.urFormItem || {}).urFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._urFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('UrFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="ur-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

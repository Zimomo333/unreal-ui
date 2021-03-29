<template>
  <div
    class="ur-select-dropdown ur-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script type="text/babel">
import Popper from '@/utils/vue-popper';

export default {
  name: 'UrSelectDropdown',

  componentName: 'UrSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start',
    },

    boundariesPadding: {
      default: 0,
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false,
        };
      },
    },

    visibleArrow: {
      default: true,
    },

    appendToBody: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      minWidth: '',
    };
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass;
    },
  },

  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    },
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  },
};
</script>

<style lang="scss">
.ur-scrollbar {
  border-radius: 0.55rem;
}
.ur-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 0.0625rem solid #D1D9E6;
  border-radius: 0.55rem;
  background-color: #e6e7ee;
  -webkit-box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0.7rem 0;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected {
  // color: #409eff;
  // background-color: #fff;
  font-weight: bolder;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected.hover {
  // background-color: #f5f7fa;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected::after {
  position: absolute;
  right: 20px;
  font-family: element-icons;
  content: '√';
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ur-select-dropdown .ur-scrollbar.is-empty .ur-select-dropdown__list {
  padding: 0;
}
.ur-select-dropdown__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.ur-select-dropdown__wrap {
  max-height: 274px;
}
.ur-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
<template>
  <label
    class="ur-radio"
    :class="[
      border && radioSize ? 'ur-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="ur-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="ur-radio__inner"></span>
      <input
        ref="radio"
        class="ur-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="ur-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter';

export default {
  name: 'UrRadio',

  mixins: [Emitter],

  inject: {
    urForm: {
      default: '',
    },

    urFormItem: {
      default: '',
    },
  },

  componentName: 'UrRadio',

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String,
  },

  data() {
    return {
      focus: false,
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'UrRadioGroup') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('UrRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      },
    },
    _urFormItemSize() {
      return (this.urFormItem || {}).urFormItemSize;
    },
    radioSize() {
      const temRadioSize = this.size || this._urFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled || (this.urForm || {}).disabled
        : this.disabled || (this.urForm || {}).disabled;
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label) ? -1 : 0;
    },
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model);
        this.isGroup && this.dispatch('UrRadioGroup', 'handleChange', this.model);
      });
    },
  },
};
</script>

<style lang="scss">
.ur-radio,
.ur-radio--medium.is-bordered .ur-radio__label {
  font-size: 14px;
}
.ur-radio,
.ur-radio__input {
  white-space: nowrap;
  line-height: 1;
  outline: 0;
}
.ur-radio,
.ur-radio__inner,
.ur-radio__input {
  position: relative;
  display: inline-block;
}
.ur-radio {
  color: #606266;
  font-weight: 500;
  cursor: pointer;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.ur-radio.is-bordered {
  padding: 12px 20px 0 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 40px;
}
.ur-radio.is-bordered.is-checked {
  border-color: #409eff;
}
.ur-radio.is-bordered.is-disabled {
  cursor: not-allowed;
  border-color: #ebeef5;
}
.ur-radio__input.is-disabled .ur-radio__inner,
.ur-radio__input.is-disabled.is-checked .ur-radio__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}
.ur-radio.is-bordered + .ur-radio.is-bordered {
  margin-left: 10px;
}
.ur-radio--medium.is-bordered {
  padding: 10px 20px 0 10px;
  border-radius: 4px;
  height: 36px;
}
.ur-radio--mini.is-bordered .ur-radio__label,
.ur-radio--small.is-bordered .ur-radio__label {
  font-size: 12px;
}
.ur-radio--medium.is-bordered .ur-radio__inner {
  height: 14px;
  width: 14px;
}
.ur-radio--small.is-bordered {
  padding: 8px 15px 0 10px;
  border-radius: 3px;
  height: 32px;
}
.ur-radio--small.is-bordered .ur-radio__inner {
  height: 12px;
  width: 12px;
}
.ur-radio--mini.is-bordered {
  padding: 6px 15px 0 10px;
  border-radius: 3px;
  height: 28px;
}
.ur-radio--mini.is-bordered .ur-radio__inner {
  height: 12px;
  width: 12px;
}
.ur-radio:last-child {
  margin-right: 0;
}
.ur-radio__input {
  cursor: pointer;
  vertical-align: middle;
}
.ur-radio__input.is-disabled .ur-radio__inner {
  cursor: not-allowed;
}
.ur-radio__input.is-disabled .ur-radio__inner::after {
  cursor: not-allowed;
  background-color: #f5f7fa;
}
.ur-radio__input.is-disabled .ur-radio__inner + .ur-radio__label {
  cursor: not-allowed;
}
.ur-radio__input.is-disabled.is-checked .ur-radio__inner::after {
  background-color: #c0c4cc;
}
.ur-radio__input.is-disabled + span.ur-radio__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-radio__input.is-checked .ur-radio__inner {
  // border-color: #409eff;
  // background: #409eff;
}
.ur-radio__input.is-checked .ur-radio__inner::after {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
}
.ur-radio__input.is-checked + .ur-radio__label {
  // color: #409eff;
}
.ur-radio__input.is-focus .ur-radio__inner {
  // border-color: #409eff;
}
.ur-radio__inner {
  border: 1px solid #D1D9E6;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background-color: #D1D9E6;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: inset 1px 2px 2px #b8b9be, inset -5px -2px 4px #FFFFFF;
}
.ur-radio__inner:hover {
  // border-color: #409eff;
}
.ur-radio__inner::after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #31344b;;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  -webkit-transition: -webkit-transform 0.15s ease-in;
  transition: -webkit-transform 0.15s ease-in;
  transition: transform 0.15s ease-in;
  transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
}
.ur-radio__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.ur-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .ur-radio__inner {
  -webkit-box-shadow: 0 0 2px 2px #409eff;
  box-shadow: 0 0 2px 2px #409eff;
}
.ur-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>
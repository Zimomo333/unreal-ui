<template>
  <label
    class="ur-checkbox"
    :class="[
      border && checkboxSize ? 'ur-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    :id="id"
  >
    <span
      class="ur-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="ur-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="ur-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        class="ur-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span class="ur-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter';

export default {
  name: 'UrCheckbox',

  mixins: [Emitter],

  inject: {
    urForm: {
      default: '',
    },
    urFormItem: {
      default: '',
    },
  },

  componentName: 'UrCheckbox',

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    };
  },

  computed: {
    model: {
      get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);

          this.isLimitExceeded === false && this.dispatch('UrCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      },
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'UrCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return (!!(max || min) && this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked);
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.urForm || {}).disabled || this.isLimitDisabled
        : this.disabled || (this.urForm || {}).disabled;
    },

    _urFormItemSize() {
      return (this.urFormItem || {}).urFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize = this.size || this._urFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    },
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    border: Boolean,
    size: String,
  },

  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('UrCheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      });
    },
  },

  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },

  watch: {
    value(value) {
      this.dispatch('UrFormItem', 'el.form.change', value);
    },
  },
};
</script>

<style lang="scss">
@charset "UTF-8";
.ur-checkbox,
.ur-checkbox__input {
  display: inline-block;
  position: relative;
}
.ur-checkbox-button__inner,
.ur-checkbox__input {
  white-space: nowrap;
  vertical-align: middle;
  outline: 0;
}
.ur-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 30px;
}
.ur-checkbox.is-bordered {
  padding: 9px 20px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: normal;
  height: 40px;
}
.ur-checkbox.is-bordered.is-checked {
  border-color: #409eff;
}
.ur-checkbox.is-bordered.is-disabled {
  border-color: #ebeef5;
  cursor: not-allowed;
}
.ur-checkbox.is-bordered + .ur-checkbox.is-bordered {
  margin-left: 10px;
}
.ur-checkbox.is-bordered.ur-checkbox--medium {
  padding: 7px 20px 7px 10px;
  border-radius: 4px;
  height: 36px;
}
.ur-checkbox.is-bordered.ur-checkbox--medium .ur-checkbox__label {
  line-height: 17px;
  font-size: 14px;
}
.ur-checkbox.is-bordered.ur-checkbox--medium .ur-checkbox__inner {
  height: 14px;
  width: 14px;
}
.ur-checkbox.is-bordered.ur-checkbox--small {
  padding: 5px 15px 5px 10px;
  border-radius: 3px;
  height: 32px;
}
.ur-checkbox.is-bordered.ur-checkbox--small .ur-checkbox__label {
  line-height: 15px;
  font-size: 12px;
}
.ur-checkbox.is-bordered.ur-checkbox--small .ur-checkbox__inner {
  height: 12px;
  width: 12px;
}
.ur-checkbox.is-bordered.ur-checkbox--small .ur-checkbox__inner::after {
  height: 6px;
  width: 2px;
}
.ur-checkbox.is-bordered.ur-checkbox--mini {
  padding: 3px 15px 3px 10px;
  border-radius: 3px;
  height: 28px;
}
.ur-checkbox.is-bordered.ur-checkbox--mini .ur-checkbox__label {
  line-height: 12px;
  font-size: 12px;
}
.ur-checkbox.is-bordered.ur-checkbox--mini .ur-checkbox__inner {
  height: 12px;
  width: 12px;
}
.ur-checkbox.is-bordered.ur-checkbox--mini .ur-checkbox__inner::after {
  height: 6px;
  width: 2px;
}
.ur-checkbox__input {
  cursor: pointer;
  line-height: 1;
}
.ur-checkbox__input.is-disabled .ur-checkbox__inner {
  // background-color: #edf2fc;
  // border-color: #dcdfe6;
  opacity: 0.5;
  cursor: not-allowed;
}
.ur-checkbox__input.is-disabled .ur-checkbox__inner::after {
  cursor: not-allowed;
  border-color: #c0c4cc;
}
.ur-checkbox__input.is-disabled .ur-checkbox__inner + .ur-checkbox__label {
  cursor: not-allowed;
}
.ur-checkbox__input.is-disabled.is-checked .ur-checkbox__inner {
  // background-color: #f2f6fc;
  // border-color: #dcdfe6;
}
.ur-checkbox__input.is-disabled.is-checked .ur-checkbox__inner::after {
  border-color: black;
}
.ur-checkbox__input.is-disabled.is-indeterminate .ur-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.ur-checkbox__input.is-disabled.is-indeterminate .ur-checkbox__inner::before {
  background-color: #c0c4cc;
  border-color: #c0c4cc;
}
.ur-checkbox__input.is-checked .ur-checkbox__inner,
.ur-checkbox__input.is-indeterminate .ur-checkbox__inner {
  // background-color: #409eff;
  // border-color: #409eff;
}
.ur-checkbox__input.is-disabled + span.ur-checkbox__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-checkbox__input.is-checked .ur-checkbox__inner::after {
  -webkit-transform: rotate(45deg) scaleY(1);
  transform: rotate(45deg) scaleY(1);
}
.ur-checkbox__input.is-checked + .ur-checkbox__label {
  // color: #409eff;
}
.ur-checkbox__input.is-focus .ur-checkbox__inner {
  // border-color: #409eff;
}
.ur-checkbox__input.is-indeterminate .ur-checkbox__inner::before {
  content: '';
  position: absolute;
  display: block;
  background-color: #fff;
  height: 2px;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5px;
}
.ur-checkbox__input.is-indeterminate .ur-checkbox__inner::after {
  display: none;
}
.ur-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #b1bcce;
  border-radius: 2px;
  box-shadow: inset 1px 2px 2px #b8b9be, inset -5px -2px 4px #FFFFFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  background-color: #D1D9E6;
  z-index: 1;
  -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.ur-checkbox__inner:hover {
  // border-color: #409eff;
}
.ur-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: '';
  border: .15rem solid black;
  border-left: 0;
  border-top: 0;
  height: .6rem;
  width: .3rem;
  left: .3rem;
  position: absolute;
  -webkit-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s, -webkit-transform 0.15s ease-in 0.05s;
  -webkit-transform-origin: center;
  transform-origin: center;
}
.ur-checkbox__original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  z-index: -1;
}
.ur-checkbox-button,
.ur-checkbox-button__inner {
  display: inline-block;
  position: relative;
}
.ur-checkbox__label {
  display: inline-block;
  padding-left: 10px;
  line-height: 19px;
  font-size: 14px;
}
.ur-checkbox:last-of-type {
  margin-right: 0;
}
.ur-checkbox-group {
  font-size: 0;
}
</style>
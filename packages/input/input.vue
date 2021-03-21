<template>
  <div
    :class="[
    type === 'textarea' ? 'ur-textarea' : 'ur-input',
    inputSize ? 'ur-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'ur-input-group': $slots.prepend || $slots.append,
      'ur-input-group--append': $slots.append,
      'ur-input-group--prepend': $slots.prepend,
      'ur-input--prefix': $slots.prefix || prefixIcon,
      'ur-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="ur-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="ur-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      />
      <!-- 前置内容 -->
      <span class="ur-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="ur-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <!-- 后置内容 -->
      <span class="ur-input__suffix" v-if="getSuffixVisible()">
        <span class="ur-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="ur-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="ur-input__icon ur-icon-circle-close ur-input__clear"
            @mousedown.prevent
            @click="clear"
          >
            <svg fill="#8a8a8a" t="1616246996292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7349" width="200" height="200"><path d="M851.456 755.419429q0 22.820571-16.018286 38.838857l-77.677714 77.677714q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-168.009143-168.009143-168.009143 168.009143q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-77.677714-77.677714q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l168.009143-168.009143-168.009143-168.009143q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l77.677714-77.677714q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l168.009143 168.009143 168.009143-168.009143q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l77.677714 77.677714q16.018286 16.018286 16.018286 38.838857t-16.018286 38.838857l-168.009143 168.009143 168.009143 168.009143q16.018286 16.018286 16.018286 38.838857z" p-id="7350"></path></svg>
          </i>
          <i
            v-if="showPwdVisible"
            class="ur-input__icon ur-icon-view ur-input__clear"
            @click="handlePasswordVisible"
          >
            <svg fill="#8a8a8a" t="1616247476651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13061" width="200" height="200"><path d="M662.257 382.457c0 32.885-25.799 59.2-58.201 59.2-32.371 0-58.686-26.315-58.686-59.2 0-32.371 26.315-58.686 58.686-58.686 4.058 0 7.6 1.514 11.657 2.028-29.343-20.743-65.285-33.401-103.715-33.401-100.201 0-181.142 81.971-181.142 183.172 0 100.657 80.944 182.629 181.142 182.629 100.171 0 181.115-81.971 181.115-182.629 0-38.971-12.657-75.399-33.401-104.742 1.029 4.059 2.544 7.601 2.544 11.63zM1014.371 457.858c-84.485-154.829-283.827-311.142-502.371-311.142-218.571 0-417.915 156.314-501.886 311.142l-10.114 17.713 10.114 17.686c83.972 154.315 283.315 311.142 501.886 311.142 218.544 0 417.885-156.829 502.371-311.142l9.629-17.686-9.629-17.713zM512 731.571c-180.114 0-350.629-129.028-428.542-256 77.914-127.514 248.428-256 428.542-256 180.085 0 350.599 128.486 428.515 256-77.915 126.972-248.43 256-428.515 256z" p-id="13062"></path></svg>
          </i>
          <span v-if="isWordLimitVisible" class="ur-input__count">
            <span class="ur-input__count-inner">{{ textLength }}/{{ upperLimit }}</span>
          </span>
        </span>
        <i
          class="ur-input__icon"
          v-if="validateState"
          :class="['ur-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <!-- 后置元素 -->
      <div class="ur-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="ur-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    ></textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="ur-input__count"
    >{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter';
import Migrating from '@/mixins/migrating';
import calcTextareaHeight from './calcTextareaHeight';
import merge from '@/utils/merge';
import { isKorean } from '@/utils/shared';

export default {
  name: 'ur-input',

  componentName: 'ur-input',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    urForm: {
      default: '',
    },
    urFormItem: {
      default: '',
    },
  },

  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false,
    };
  },

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator() {
        process.env.NODE_ENV !== 'production' &&
          console.warn("[Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead.");
        return true;
      },
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    tabindex: String,
  },

  computed: {
    _urFormItemSize() {
      return (this.urFormItem || {}).urFormItemSize;
    },
    validateState() {
      return this.urFormItem ? this.urFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.urForm ? this.urForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: 'ur-icon-loading',
        success: 'ur-icon-circle-check',
        error: 'ur-icon-circle-close',
      }[this.validateState];
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size || this._urFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.urForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering);
    },
    showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    },
  },

  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch('UrFormItem', 'ur.form.change', [val]);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    nativeInputValue() {
      this.setNativeInputValue();
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    },
  },

  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.',
        },
        events: {
          click: 'click is removed.',
        },
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('UrFormItem', 'ur.form.blur', [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight,
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // should not emit input during composition
      if (this.isComposing) return;

      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.ur-input__${place}`) || []);
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend',
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.ur-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
      );
    },
  },

  created() {
    this.$on('inputSelect', this.select);
  },

  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },

  updated() {
    this.$nextTick(this.updateIconOffset);
  },
};
</script>

<style lang="scss">
  .ur-input
  .ur-textarea {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;

    .ur-input__count {
      color: #909399;
      position: absolute;
      font-size: 12px;
      bottom: 5px;
      right: 10px;
    }

    &.is-disabled {
      .ur-textarea__inner {
        background-color: transparent;
        opacity: .6;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
  
        &::-webkit-input-placeholder,
        &:-ms-input-placeholder,
        &::-ms-input-placeholder,
        &::placeholder {
          color: #c0c4cc;
        }
      }
    }
    
    &.is-exceed {
      .ur-textarea__inner {
        border-color: #f56c6c;
      }
      .ur-input__count {
        color: #f56c6c;
      }
    }
  }
  .ur-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: transparent;
    background-image: none;
    border: 0.0625rem solid #D1D9E6;
    border-radius: 0.55rem;
    border-color: transparent;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder,
    &::placeholder {
      color: #c0c4cc;
    }

    &:hover {
      // border-color: #c0c4cc;
    }

    &:focus {
      outline: 0;
    }
  }
  .ur-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #b4bccc;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    &::-webkit-scrollbar-track-piece {
      background: #fff;
      width: 6px;
    }

    .ur-input__clear {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        color: #909399;
      }
    }

    .ur-input__count {
      height: 100%;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: #909399;
      font-size: 12px;

      .ur-input__count-inner {
        line-height: initial;
        display: inline-block;
        padding: 0 5px;
      }
    }

    &.is-disabled {
      .ur-input__inner {
        background-color: transparent;
        opacity: .6;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;

        &::-webkit-input-placeholder,
        &:-ms-input-placeholder,
        &::-ms-input-placeholder,
        &::placeholder {
          color: #c0c4cc;
        }
      }

      .ur-input__icon {
        cursor: not-allowed;
      }
    }

    &.is-exceed {
      .ur-input__inner {
        border-color: #f56c6c;
      }

      .ur-input__suffix {
        .ur-input__count {
          color: #f56c6c;
        }
      }
    }
  }
  .ur-input__inner {
    -webkit-appearance: none;
    background-color: transparent;
    background-image: none;
    border: 0.0625rem solid #D1D9E6;
    border-radius: 0.55rem;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder,
    &::placeholder {
      color: #c0c4cc;
    }
    &:hover {
      // border-color: #c0c4cc;
    }
  }
  .ur-input__prefix,
  .ur-input__suffix {
    position: absolute;
    top: 0;
    -webkit-transition: all 0.3s;
    text-align: center;
    height: 100%;
    color: #c0c4cc;
  }
  .ur-input.is-active .ur-input__inner,
  .ur-input__inner:focus {
    // border-color: #409eff;
    outline: 0;
  }
  .ur-input__suffix {
    right: 5px;
    transition: all 0.3s;
    pointer-events: none;
  }
  .ur-input__suffix-inner {
    pointer-events: all;
  }
  .ur-input__prefix {
    left: 5px;
    transition: all 0.3s;
  }
  .ur-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    line-height: 40px;

    &:after {
      content: '';
      height: 100%;
      width: 0;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .ur-input__validateIcon {
    pointer-events: none;
  }
  .ur-input--suffix .ur-input__inner {
    padding-right: 30px;
  }
  .ur-input--prefix .ur-input__inner {
    padding-left: 30px;
  }
  .ur-input--medium {
    font-size: 14px;
  }
  .ur-input--medium .ur-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .ur-input--medium .ur-input__icon {
    line-height: 36px;
  }
  .ur-input--small {
    font-size: 13px;
  }
  .ur-input--small .ur-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .ur-input--small .ur-input__icon {
    line-height: 32px;
  }
  .ur-input--mini {
    font-size: 12px;
  }
  .ur-input--mini .ur-input__inner {
    height: 28px;
    line-height: 28px;
  }
  .ur-input--mini .ur-input__icon {
    line-height: 28px;
  }
  .ur-input-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  .ur-input-group > .ur-input__inner {
    vertical-align: middle;
    display: table-cell;
  }
  .ur-input-group__append,
  .ur-input-group__prepend {
    background-color: transparent;
    color: #44476A;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 0.1rem solid #D1D9E6;
    border-radius: 0.55rem;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;

    .ur-button,
    .ur-select {
      display: inline-block;
      margin: -10px -20px;
    }

    &:focus {
      outline: 0;
    }

    button.ur-button,
    div.ur-select .ur-input__inner,
    div.ur-select:hover .ur-input__inner {
      background-color: transparent;
      color: inherit;
    }

    .ur-button,
    .ur-input {
      font-size: inherit;
    }
  }
  .ur-input-group--prepend .ur-input__inner,
  .ur-input-group__append,
  .ur-input-group__append .ur-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .ur-input-group--append .ur-input__inner,
  .ur-input-group__prepend {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .ur-input-group__prepend {
    border-right: 0;
  }
  .ur-input-group__append {
    border-left: 0;
  }
  .ur-input-group--append .ur-select .ur-input.is-focus .ur-input__inner,
  .ur-input-group--prepend .ur-select .ur-input.is-focus .ur-input__inner {
    border-color: transparent;
  }
  .ur-input__inner::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  .ur-icon-circle-close {
    display: flex;
    align-items: center;
    svg {
      width: 1.2rem;
      height: 1.2rem;

      &:hover {
        fill: #515151;
      }
    }
  }
  .ur-icon-view {
    display: flex;
    align-items: center;
    svg {
      width: 1.2rem;
      height: 1.2rem;

      &:hover {
        fill: #515151;
      }
    }
  }
</style>
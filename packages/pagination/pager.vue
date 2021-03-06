<template>
  <ul @click="onPagerClick" class="ur-pager">
    <li :class="{ active: currentPage === 1, disabled }" v-if="pageCount > 0" class="number">1</li>
    <li
      class="ur-icon more btn-quickprev"
      :class="[quickprevIconClass, { disabled }]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'ur-icon-more'"
    ></li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >{{ pager }}</li>
    <li
      class="ur-icon more btn-quicknext"
      :class="[quicknextIconClass, { disabled }]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'ur-icon-more'"
    ></li>
    <li
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
      v-if="pageCount > 1"
    >{{ pageCount }}</li>
  </ul>
</template>

<script type="text/babel">
export default {
  name: 'UrPager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean,
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'ur-icon-more';
    },

    showNextMore(val) {
      if (!val) this.quicknextIconClass = 'ur-icon-more';
    },
  },

  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === 'UL' || this.disabled) {
        return;
      }

      let newPage = Number(event.target.textContent);
      const pageCount = this.pageCount;
      const currentPage = this.currentPage;
      const pagerCountOffset = this.pagerCount - 2;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    },

    onMouseenter(direction) {
      if (this.disabled) return;
      if (direction === 'left') {
        this.quickprevIconClass = 'ur-icon-d-arrow-left';
      } else {
        this.quicknextIconClass = 'ur-icon-d-arrow-right';
      }
    },
  },

  computed: {
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);

      let showPrevMore = false;
      let showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      const array = [];

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;

      return array;
    },
  },

  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'ur-icon-more',
      quickprevIconClass: 'ur-icon-more',
    };
  },
};
</script>

<style lang="scss">
.ur-popper .popper__arrow,
.ur-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.ur-popper .popper__arrow {
  border-width: 6px;
  -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.ur-popper .popper__arrow::after {
  content: ' ';
  border-width: 6px;
}
.ur-popper[x-placement^='top'] {
  margin-bottom: 12px;
}
.ur-popper[x-placement^='top'] .popper__arrow {
  bottom: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-color: #ebeef5;
  border-bottom-width: 0;
}
.ur-popper[x-placement^='top'] .popper__arrow::after {
  bottom: 1px;
  margin-left: -6px;
  border-top-color: #fff;
  border-bottom-width: 0;
}
.ur-popper[x-placement^='bottom'] {
  margin-top: 12px;
}
.ur-popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
.ur-popper[x-placement^='bottom'] .popper__arrow::after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.ur-popper[x-placement^='right'] {
  margin-left: 12px;
}
.ur-popper[x-placement^='right'] .popper__arrow {
  top: 50%;
  left: -6px;
  margin-bottom: 3px;
  border-right-color: #ebeef5;
  border-left-width: 0;
}
.ur-popper[x-placement^='right'] .popper__arrow::after {
  bottom: -6px;
  left: 1px;
  border-right-color: #fff;
  border-left-width: 0;
}
.ur-popper[x-placement^='left'] {
  margin-right: 12px;
}
.ur-popper[x-placement^='left'] .popper__arrow {
  top: 50%;
  right: -6px;
  margin-bottom: 3px;
  border-right-width: 0;
  border-left-color: #ebeef5;
}
.ur-popper[x-placement^='left'] .popper__arrow::after {
  right: 1px;
  bottom: -6px;
  margin-left: -6px;
  border-right-width: 0;
  border-left-color: #fff;
}
.ur-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected {
  color: #409eff;
  background-color: #fff;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected.hover {
  background-color: #f5f7fa;
}
.ur-select-dropdown.is-multiple .ur-select-dropdown__item.selected::after {
  position: absolute;
  right: 20px;
  font-family: element-icons;
  content: '\e6da';
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
.ur-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
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
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ur-input__inner,
.ur-tag {
  -webkit-box-sizing: border-box;
}
.ur-textarea__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea__inner::placeholder {
  color: #c0c4cc;
}
.ur-textarea__inner:hover {
  border-color: #c0c4cc;
}
.ur-textarea__inner:focus {
  outline: 0;
  border-color: #409eff;
}
.ur-textarea .ur-input__count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  right: 10px;
}
.ur-textarea.is-disabled .ur-textarea__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-textarea.is-disabled .ur-textarea__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea.is-disabled .ur-textarea__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea.is-disabled .ur-textarea__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-textarea.is-disabled .ur-textarea__inner::placeholder {
  color: #c0c4cc;
}
.ur-textarea.is-exceed .ur-textarea__inner {
  border-color: #f56c6c;
}
.ur-textarea.is-exceed .ur-input__count {
  color: #f56c6c;
}
.ur-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.ur-input::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.ur-input::-webkit-scrollbar:horizontal {
  height: 6px;
}
.ur-input::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.ur-input::-webkit-scrollbar-corner {
  background: #fff;
}
.ur-input::-webkit-scrollbar-track {
  background: #fff;
}
.ur-input::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
.ur-input .ur-input__clear {
  color: #c0c4cc;
  font-size: 14px;
  cursor: pointer;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ur-input .ur-input__clear:hover {
  color: #909399;
}
.ur-input .ur-input__count {
  height: 100%;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #909399;
  font-size: 12px;
}
.ur-input .ur-input__count .ur-input__count-inner {
  background: #fff;
  line-height: initial;
  display: inline-block;
  padding: 0 5px;
}
.ur-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
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
}
.ur-input__prefix,
.ur-input__suffix {
  position: absolute;
  top: 0;
  -webkit-transition: all 0.3s;
  height: 100%;
  color: #c0c4cc;
  text-align: center;
}
.ur-input__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.ur-input__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-input__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-input__inner::placeholder {
  color: #c0c4cc;
}
.ur-input__inner:hover {
  border-color: #c0c4cc;
}
.ur-input.is-active .ur-input__inner,
.ur-input__inner:focus {
  border-color: #409eff;
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
}
.ur-input__icon:after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.ur-input__validateIcon {
  pointer-events: none;
}
.ur-input.is-disabled .ur-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-input.is-disabled .ur-input__inner::-webkit-input-placeholder {
  color: #c0c4cc;
}
.ur-input.is-disabled .ur-input__inner:-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-input.is-disabled .ur-input__inner::-ms-input-placeholder {
  color: #c0c4cc;
}
.ur-input.is-disabled .ur-input__inner::placeholder {
  color: #c0c4cc;
}
.ur-input.is-disabled .ur-input__icon {
  cursor: not-allowed;
}
.ur-input.is-exceed .ur-input__inner {
  border-color: #f56c6c;
}
.ur-input.is-exceed .ur-input__suffix .ur-input__count {
  color: #f56c6c;
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
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.ur-input-group--prepend .ur-input__inner,
.ur-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.ur-input-group--append .ur-input__inner,
.ur-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.ur-input-group__append:focus,
.ur-input-group__prepend:focus {
  outline: 0;
}
.ur-input-group__append .ur-button,
.ur-input-group__append .ur-select,
.ur-input-group__prepend .ur-button,
.ur-input-group__prepend .ur-select {
  display: inline-block;
  margin: -10px -20px;
}
.ur-input-group__append button.ur-button,
.ur-input-group__append div.ur-select .ur-input__inner,
.ur-input-group__append div.ur-select:hover .ur-input__inner,
.ur-input-group__prepend button.ur-button,
.ur-input-group__prepend div.ur-select .ur-input__inner,
.ur-input-group__prepend div.ur-select:hover .ur-input__inner {
  border-color: transparent;
  background-color: transparent;
  color: inherit;
  border-top: 0;
  border-bottom: 0;
}
.ur-input-group__append .ur-button,
.ur-input-group__append .ur-input,
.ur-input-group__prepend .ur-button,
.ur-input-group__prepend .ur-input {
  font-size: inherit;
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
.ur-tag {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
.ur-tag.is-hit {
  border-color: #409eff;
}
.ur-tag .ur-tag__close {
  color: #409eff;
}
.ur-tag .ur-tag__close:hover {
  color: #fff;
  background-color: #409eff;
}
.ur-tag.ur-tag--info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.ur-tag.ur-tag--info.is-hit {
  border-color: #909399;
}
.ur-tag.ur-tag--info .ur-tag__close {
  color: #909399;
}
.ur-tag.ur-tag--info .ur-tag__close:hover {
  color: #fff;
  background-color: #909399;
}
.ur-tag.ur-tag--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.ur-tag.ur-tag--success.is-hit {
  border-color: #67c23a;
}
.ur-tag.ur-tag--success .ur-tag__close {
  color: #67c23a;
}
.ur-tag.ur-tag--success .ur-tag__close:hover {
  color: #fff;
  background-color: #67c23a;
}
.ur-tag.ur-tag--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.ur-tag.ur-tag--warning.is-hit {
  border-color: #e6a23c;
}
.ur-tag.ur-tag--warning .ur-tag__close {
  color: #e6a23c;
}
.ur-tag.ur-tag--warning .ur-tag__close:hover {
  color: #fff;
  background-color: #e6a23c;
}
.ur-tag.ur-tag--danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.ur-tag.ur-tag--danger.is-hit {
  border-color: #f56c6c;
}
.ur-tag.ur-tag--danger .ur-tag__close {
  color: #f56c6c;
}
.ur-tag.ur-tag--danger .ur-tag__close:hover {
  color: #fff;
  background-color: #f56c6c;
}
.ur-tag .ur-icon-close {
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  vertical-align: middle;
  top: -1px;
  right: -5px;
}
.ur-tag .ur-icon-close::before {
  display: block;
}
.ur-tag--dark {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
.ur-tag--dark.is-hit {
  border-color: #409eff;
}
.ur-tag--dark .ur-tag__close {
  color: #fff;
}
.ur-tag--dark .ur-tag__close:hover {
  color: #fff;
  background-color: #66b1ff;
}
.ur-tag--dark.ur-tag--info {
  background-color: #909399;
  border-color: #909399;
  color: #fff;
}
.ur-tag--dark.ur-tag--info.is-hit {
  border-color: #909399;
}
.ur-tag--dark.ur-tag--info .ur-tag__close {
  color: #fff;
}
.ur-tag--dark.ur-tag--info .ur-tag__close:hover {
  color: #fff;
  background-color: #a6a9ad;
}
.ur-tag--dark.ur-tag--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.ur-tag--dark.ur-tag--success.is-hit {
  border-color: #67c23a;
}
.ur-tag--dark.ur-tag--success .ur-tag__close {
  color: #fff;
}
.ur-tag--dark.ur-tag--success .ur-tag__close:hover {
  color: #fff;
  background-color: #85ce61;
}
.ur-tag--dark.ur-tag--warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}
.ur-tag--dark.ur-tag--warning.is-hit {
  border-color: #e6a23c;
}
.ur-tag--dark.ur-tag--warning .ur-tag__close {
  color: #fff;
}
.ur-tag--dark.ur-tag--warning .ur-tag__close:hover {
  color: #fff;
  background-color: #ebb563;
}
.ur-tag--dark.ur-tag--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.ur-tag--dark.ur-tag--danger.is-hit {
  border-color: #f56c6c;
}
.ur-tag--dark.ur-tag--danger .ur-tag__close {
  color: #fff;
}
.ur-tag--dark.ur-tag--danger .ur-tag__close:hover {
  color: #fff;
  background-color: #f78989;
}
.ur-tag--plain {
  background-color: #fff;
  border-color: #b3d8ff;
  color: #409eff;
}
.ur-tag--plain.is-hit {
  border-color: #409eff;
}
.ur-tag--plain .ur-tag__close {
  color: #409eff;
}
.ur-tag--plain .ur-tag__close:hover {
  color: #fff;
  background-color: #409eff;
}
.ur-tag--plain.ur-tag--info {
  background-color: #fff;
  border-color: #d3d4d6;
  color: #909399;
}
.ur-tag--plain.ur-tag--info.is-hit {
  border-color: #909399;
}
.ur-tag--plain.ur-tag--info .ur-tag__close {
  color: #909399;
}
.ur-tag--plain.ur-tag--info .ur-tag__close:hover {
  color: #fff;
  background-color: #909399;
}
.ur-tag--plain.ur-tag--success {
  background-color: #fff;
  border-color: #c2e7b0;
  color: #67c23a;
}
.ur-tag--plain.ur-tag--success.is-hit {
  border-color: #67c23a;
}
.ur-tag--plain.ur-tag--success .ur-tag__close {
  color: #67c23a;
}
.ur-tag--plain.ur-tag--success .ur-tag__close:hover {
  color: #fff;
  background-color: #67c23a;
}
.ur-tag--plain.ur-tag--warning {
  background-color: #fff;
  border-color: #f5dab1;
  color: #e6a23c;
}
.ur-tag--plain.ur-tag--warning.is-hit {
  border-color: #e6a23c;
}
.ur-tag--plain.ur-tag--warning .ur-tag__close {
  color: #e6a23c;
}
.ur-tag--plain.ur-tag--warning .ur-tag__close:hover {
  color: #fff;
  background-color: #e6a23c;
}
.ur-tag--plain.ur-tag--danger {
  background-color: #fff;
  border-color: #fbc4c4;
  color: #f56c6c;
}
.ur-tag--plain.ur-tag--danger.is-hit {
  border-color: #f56c6c;
}
.ur-tag--plain.ur-tag--danger .ur-tag__close {
  color: #f56c6c;
}
.ur-tag--plain.ur-tag--danger .ur-tag__close:hover {
  color: #fff;
  background-color: #f56c6c;
}
.ur-tag--medium {
  height: 28px;
  line-height: 26px;
}
.ur-tag--medium .ur-icon-close {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.ur-tag--small {
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}
.ur-tag--small .ur-icon-close {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.ur-tag--mini {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}
.ur-tag--mini .ur-icon-close {
  margin-left: -3px;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
}
.ur-select-dropdown__item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.ur-select-dropdown__item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-select-dropdown__item.is-disabled:hover {
  background-color: #fff;
}
.ur-select-dropdown__item.hover,
.ur-select-dropdown__item:hover {
  background-color: #f5f7fa;
}
.ur-select-dropdown__item.selected {
  color: #409eff;
  font-weight: 700;
}
.ur-select-group {
  margin: 0;
  padding: 0;
}
.ur-select-group__wrap {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.ur-select-group__wrap:not(:last-of-type) {
  padding-bottom: 24px;
}
.ur-select-group__wrap:not(:last-of-type)::after {
  content: '';
  position: absolute;
  display: block;
  left: 20px;
  right: 20px;
  bottom: 12px;
  height: 1px;
  background: #e4e7ed;
}
.ur-select-group__title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
.ur-select-group .ur-select-dropdown__item {
  padding-left: 20px;
}
.ur-scrollbar {
  overflow: hidden;
  position: relative;
}
.ur-scrollbar:active > .ur-scrollbar__bar,
.ur-scrollbar:focus > .ur-scrollbar__bar,
.ur-scrollbar:hover > .ur-scrollbar__bar {
  opacity: 1;
  -webkit-transition: opacity 340ms ease-out;
  transition: opacity 340ms ease-out;
}
.ur-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}
.ur-scrollbar__wrap--hidden-default {
  scrollbar-width: none;
}
.ur-scrollbar__wrap--hidden-default::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.ur-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.ur-scrollbar__thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}
.ur-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  -webkit-transition: opacity 120ms ease-out;
  transition: opacity 120ms ease-out;
}
.ur-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}
.ur-scrollbar__bar.is-vertical > div {
  width: 100%;
}
.ur-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}
.ur-scrollbar__bar.is-horizontal > div {
  height: 100%;
}
.ur-select {
  display: inline-block;
  position: relative;
}
.ur-select .ur-select__tags > span {
  display: contents;
}
.ur-select:hover .ur-input__inner {
  border-color: #c0c4cc;
}
.ur-select .ur-input__inner {
  cursor: pointer;
  padding-right: 35px;
}
.ur-select .ur-input__inner:focus {
  border-color: #409eff;
}
.ur-select .ur-input .ur-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
  cursor: pointer;
}
.ur-select .ur-input .ur-select__caret.is-reverse {
  -webkit-transform: rotateZ(0);
  transform: rotateZ(0);
}
.ur-select .ur-input .ur-select__caret.is-show-close {
  font-size: 14px;
  text-align: center;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
  border-radius: 100%;
  color: #c0c4cc;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ur-select .ur-input .ur-select__caret.is-show-close:hover {
  color: #909399;
}
.ur-select .ur-input.is-disabled .ur-input__inner {
  cursor: not-allowed;
}
.ur-select .ur-input.is-disabled .ur-input__inner:hover {
  border-color: #e4e7ed;
}
.ur-select .ur-input.is-focus .ur-input__inner {
  border-color: #409eff;
}
.ur-select > .ur-input {
  display: block;
}
.ur-select__input {
  border: none;
  outline: 0;
  padding: 0;
  margin-left: 15px;
  color: #666;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 28px;
  background-color: transparent;
}
.ur-select__input.is-mini {
  height: 14px;
}
.ur-select__close {
  cursor: pointer;
  position: absolute;
  top: 8px;
  z-index: 1000;
  right: 25px;
  color: #c0c4cc;
  line-height: 18px;
  font-size: 14px;
}
.ur-select__close:hover {
  color: #909399;
}
.ur-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.ur-select .ur-tag__close {
  margin-top: -2px;
}
.ur-select .ur-tag {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-color: transparent;
  margin: 2px 0 2px 6px;
  background-color: #f0f2f5;
}
.ur-select .ur-tag__close.ur-icon-close {
  background-color: #c0c4cc;
  right: -7px;
  top: 0;
  color: #fff;
}
.ur-select .ur-tag__close.ur-icon-close:hover {
  background-color: #909399;
}
.ur-select .ur-tag__close.ur-icon-close::before {
  display: block;
  -webkit-transform: translate(0, 0.5px);
  transform: translate(0, 0.5px);
}
.ur-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}
.ur-pagination::after,
.ur-pagination::before {
  display: table;
  content: '';
}
.ur-pagination::after {
  clear: both;
}
.ur-pagination button,
.ur-pagination span:not([class*='suffix']) {
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ur-pagination .ur-input__inner {
  text-align: center;
  -moz-appearance: textfield;
  line-height: normal;
}
.ur-pagination .ur-input__suffix {
  right: 0;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.ur-pagination .ur-select .ur-input {
  width: 100px;
  margin: 0 5px;
}
.ur-pagination .ur-select .ur-input .ur-input__inner {
  padding-right: 25px;
  border-radius: 3px;
}
.ur-pagination button {
  border: none;
  padding: 0 6px;
  background: 0 0;
}
.ur-pagination button:focus {
  outline: 0;
}
.ur-pagination button:hover {
  color: #409eff;
}
.ur-pagination button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-pagination .btn-next,
.ur-pagination .btn-prev {
  background-size: 16px;
  cursor: pointer;
  margin: 0;
  color: #303133;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;

  &:hover {
    box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff;
  }

  svg {
    margin-top: .4rem;
  }
}
.ur-pagination .btn-next .ur-icon,
.ur-pagination .btn-prev .ur-icon {
  display: block;
  font-size: 12px;
  font-weight: 700;
}
.ur-pagination .btn-prev {
  padding-right: 12px;
}
.ur-pagination .btn-next {
  padding-left: 12px;
}
.ur-pagination .ur-pager li.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.ur-pager li,
.ur-pager li.btn-quicknext:hover,
.ur-pager li.btn-quickprev:hover {
  cursor: pointer;
}
.ur-pagination--small .btn-next,
.ur-pagination--small .btn-prev,
.ur-pagination--small .ur-pager li,
.ur-pagination--small .ur-pager li.btn-quicknext,
.ur-pagination--small .ur-pager li.btn-quickprev,
.ur-pagination--small .ur-pager li:last-child {
  border-color: transparent;
  font-size: 12px;
  line-height: 22px;
  height: 22px;
  min-width: 22px;
}
.ur-pagination--small .arrow.disabled {
  visibility: hidden;
}
.ur-pagination--small .more::before,
.ur-pagination--small li.more::before {
  line-height: 24px;
}
.ur-pagination--small button,
.ur-pagination--small span:not([class*='suffix']) {
  height: 22px;
  line-height: 22px;
}
.ur-pagination--small .ur-pagination__editor,
.ur-pagination--small .ur-pagination__editor.ur-input .ur-input__inner {
  height: 22px;
}
.ur-pagination__sizes {
  margin: 0 10px 0 0;
  font-weight: 400;
  color: #606266;
}
.ur-pagination__sizes .ur-input .ur-input__inner {
  font-size: 13px;
  padding-left: 8px;
}
.ur-pagination__sizes .ur-input .ur-input__inner:hover {
  border-color: #409eff;
}
.ur-pagination__total {
  margin-right: 10px;
  font-weight: 400;
  color: #606266;
}
.ur-pagination__jump {
  margin-left: 24px;
  font-weight: 400;
  color: #606266;
}
.ur-pagination__jump .ur-input__inner {
  padding: 0 3px;
}
.ur-pagination__rightwrapper {
  float: right;
}
.ur-pagination__editor {
  line-height: 18px;
  padding: 0 2px;
  height: 28px;
  text-align: center;
  margin: 0 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
}
.ur-pager,
.ur-pagination.is-background .btn-next,
.ur-pagination.is-background .btn-prev {
  padding: 0;
}
.ur-pagination__editor.ur-input {
  width: 50px;
}
.ur-pagination__editor.ur-input .ur-input__inner {
  height: 28px;
}
.ur-pagination__editor .ur-input__inner::-webkit-inner-spin-button,
.ur-pagination__editor .ur-input__inner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ur-pagination.is-background .btn-next,
.ur-pagination.is-background .btn-prev,
.ur-pagination.is-background .ur-pager li {
  margin: 0 5px;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
}
.ur-pagination.is-background .btn-next.disabled,
.ur-pagination.is-background .btn-next:disabled,
.ur-pagination.is-background .btn-prev.disabled,
.ur-pagination.is-background .btn-prev:disabled,
.ur-pagination.is-background .ur-pager li.disabled {
  color: #c0c4cc;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
}
.ur-pagination.is-background .ur-pager li:not(.disabled):hover {
  // color: #409eff;
  box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff;
}
.ur-pagination.is-background .ur-pager li:not(.disabled).active {
  // background-color: #409eff;
  // color: #fff;
  box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff;
}
.ur-pagination.is-background.ur-pagination--small .btn-next,
.ur-pagination.is-background.ur-pagination--small .btn-prev,
.ur-pagination.is-background.ur-pagination--small .ur-pager li {
  margin: 0 3px;
  min-width: 22px;
}
.ur-pager,
.ur-pager li {
  vertical-align: top;
  display: inline-block;
  margin: 0;
}
.ur-pager {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  list-style: none;
  font-size: 0;
}
.ur-pager .more::before {
  line-height: 30px;
}
.ur-pager li {
  padding: 0 4px;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
  background-color: #e6e7ee;
}
.ur-pager li.btn-quicknext,
.ur-pager li.btn-quickprev {
  line-height: 28px;
  color: #303133;
}
.ur-pager li.btn-quicknext.disabled,
.ur-pager li.btn-quickprev.disabled {
  color: #c0c4cc;
}
.ur-pager li.active + li {
  border-left: 0;
}
.ur-pager li:hover {
  color: #409eff;
}
.ur-pager li.active {
  color: #409eff;
  cursor: default;
}
</style>
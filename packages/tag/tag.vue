<script>
export default {
  name: 'UrTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      },
    },
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    },
  },
  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
  },
  render() {
    const { type, tagSize, hit, effect } = this;
    const classes = [
      'ur-tag',
      type ? `ur-tag--${type}` : '',
      tagSize ? `ur-tag--${tagSize}` : '',
      effect ? `ur-tag--${effect}` : '',
      hit && 'is-hit',
    ];
    const tagUr = (
      <span class={classes} style={{ backgroundColor: this.color }} on-click={this.handleClick}>
        {this.$slots.default}
        {this.closable && <i class="ur-tag__close" on-click={this.handleClose}>
          <svg t="1616421224350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2058" width="200" height="200"><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="2059" fill="#707070"></path></svg>
        </i>}
      </span>
    );

    return this.disableTransitions ? tagUr : <transition name="ur-zoom-in-center">{tagUr}</transition>;
  },
};
</script>

<style lang="scss">
  .ur-tag {
    background-color: transparent;
    border: 0.0625rem solid #D1D9E6;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
    display: inline-block;
    height: 1.5rem;
    padding: 0 0.425rem;
    line-height: 1.6;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    color: #409eff;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.55rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;

    .ur-tag__close {
      width: 1rem;
      height: 1rem;
      display: inline-block;
      border-radius: 50%;
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
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
    position: rurative;
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
</style>

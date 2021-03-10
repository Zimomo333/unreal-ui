<template>
  <div
    class="ur-carousel"
    :class="direction"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    >
    <slot class="carousel-img"></slot>
    <div class="carousel-control-prev">
      <button
        type="button"
        v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
        @mouseenter="handleButtonEnter('left')"
        @mouseleave="handleButtonLeave"
        @click.stop="setActiveItem(activeIndex - 1)"
        class="icon-wrap"
      >
        <img class="icon" src="../../assets/icons/arrow.svg"/>
      </button>
    </div>
    <div class="carousel-control-next">
      <button
        type="button"
        v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
        @click.stop="setActiveItem(activeIndex + 1)"
        class="icon-wrap"
      >
        <img class="icon" src="../../assets/icons/arrow.svg"/>
      </button>
    </div>
    <ol
      v-if="indicatorPosition !== 'none'"
      class="carousel-indicators"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'active': index === activeIndex }"
        @click.stop="handleIndicatorClick(index)"
      />
    </ol>
  </div>
</template>

<script>

export default {
  name: 'unreal-carousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0,
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true,
    },
    arrow: {
      type: String,
      default: 'hover',
    },
    type: String,
    loop: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      },
    },
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
    };
  },

  computed: {
    arrowDisplay() {
      return this.arrow !== 'never' && this.direction !== 'vertical';
    },

    indicatorsClasses() {
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction];
      return classes;
    },
  },

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit('change', val, oldVal);
      }
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    },
  },

  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if ((index === length - 1 && item.inStage && this.items[0].active) || (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (
        (index === 0 && item.inStage && this.items[length - 1].active) ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)
      ) {
        return 'right';
      }
      return false;
    },

    handleButtonEnter(arrow) {
      if (this.direction === 'vertical') return;
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      if (this.direction === 'vertical') return;
      this.items.forEach(item => {
        item.hover = false;
      });
    },

    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'unreal-carousel-item');
    },

    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },
  },

  created() {
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    this.pauseTimer();
  },
};
</script>

<style lang="scss">
.ur-carousel {
  position: relative;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #ffffff;
  border-radius: 0.55rem;
  border-color: #d1d9e6;
  border: 0.0625rem solid #fafbfe;

  &.horizontal {
    overflow-x: hidden;

    .carousel-indicators {
      bottom: 0.4rem;
      width: 100%;
    }

    .carousel-control-prev,
    .carousel-control-next {
      height: 100%;
      align-items: center;

      .icon-wrap {
        padding: 0.4rem;
      }
    }

    .carousel-control-prev {
      left: 0.6rem;
    }

    .carousel-control-next {
      right: 0.6rem;

      img {
        transform: rotate(180deg);
      }
    }
  }

  &.vertical {
    overflow-y: hidden;

    .carousel-indicators {
      right: 0.4rem;
      height: 100%;
      flex-direction: column;
    }

    .carousel-control-prev,
    .carousel-control-next {
      width: 100%;
      justify-content: center;

      .icon-wrap {
        padding: 0 0.8rem;
      }
    }

    .carousel-control-prev {
      top: 0.6rem;

      img {
        transform: rotate(90deg);
      }
    }

    .carousel-control-next {
      bottom: 0.6rem;
      
      img {
        transform: rotate(270deg);
      }
    }

  }

  .carousel-indicators {
    position: absolute;
    z-index: 5;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;

    li {
      height: 1.2rem;
      width: 1.2rem;
      background: transparent;
      margin: 0.4rem;
      border: 0;
      border-radius: 50%;
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff;
      cursor: pointer;

      &.active {
        box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
      }
    }
  }

  .carousel-img {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }


  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    z-index: 5;
    display: flex;
    color: #ecf0f3;

    .icon-wrap{
      border: 0;
      box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
      border-radius: 0.5rem;
      cursor: pointer;
      background: transparent;
      
      .icon {
        display: inline-block;
        width: 1rem;
        height: 1.7rem;
      }
      
      &:active {
        box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff;
      }
    }
  }
}
</style>
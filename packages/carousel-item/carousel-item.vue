<template>
  <div
    v-show="ready"
    class="ur-carousel-item"
    :class="{
      'is-active': active,
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="itemStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
import { autoprefixer } from '@/utils/util';
const CARD_SCALE = 0.83;
export default {
  name: 'ur-carousel-item',

  props: {
    name: String,
    label: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false,
    };
  },

  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },

    calcCardTranslate(index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth;
      if (this.inStage) {
        return (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4;
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4;
      } else {
        return ((3 + CARD_SCALE) * parentWidth) / 4;
      }
    },

    calcTranslate(index, activeIndex, isVertical) {
      const distance = this.$parent.$el[isVertical ? 'offsetHeight' : 'offsetWidth'];
      return distance * (index - activeIndex);
    },

    translateItem(index, activeIndex, oldIndex) {
      const parentType = this.$parent.type;
      const parentDirection = this.parentDirection;
      const length = this.$parent.items.length;
      if (parentType !== 'card' && oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }
      if (parentType === 'card') {
        if (parentDirection === 'vertical') {
          console.warn('[Element Warn][Carousel]vertical direction is not supported in card mode');
        }
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.active = index === activeIndex;
        this.translate = this.calcCardTranslate(index, activeIndex);
        this.scale = this.active ? 1 : CARD_SCALE;
      } else {
        this.active = index === activeIndex;
        const isVertical = parentDirection === 'vertical';
        this.translate = this.calcTranslate(index, activeIndex, isVertical);
      }
      this.ready = true;
    },

    handleItemClick() {
      const parent = this.$parent;
      if (parent && parent.type === 'card') {
        const index = parent.items.indexOf(this);
        parent.setActiveItem(index);
      }
    },
  },

  computed: {
    parentDirection() {
      return this.$parent.direction;
    },

    itemStyle() {
      const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX';
      const value = `${translateType}(${this.translate}px) scale(${this.scale})`;
      const style = {
        transform: value,
      };
      return autoprefixer(style);
    },
  },

  created() {
    this.$parent && this.$parent.updateItems();
  },

  destroyed() {
    this.$parent && this.$parent.updateItems();
  },
};
</script>

<style lang="scss">
.ur-carousel-item {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.is-active {
    z-index: 2;
  }

  &.is-animating {
    -webkit-transition: -webkit-transform 0.4s ease-in-out;
    transition: -webkit-transform 0.4s ease-in-out;
    transition: transform 0.4s ease-in-out;
    transition: transform 0.4s ease-in-out, -webkit-transform 0.4s ease-in-out;
  }
}
</style>

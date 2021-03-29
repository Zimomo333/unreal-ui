<template>
  <button
    @click="handleClick"
    :class="[
      'ur-button',
      type ? type : '',
      shape ? shape : '',
      size ? size : '',
      {
        'loading': loading,
      }
    ]"
    type="button">
    <div v-if="loading" class="loading">
      <svg class="loading_icon" t="1617026719858" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6488" width="200" height="200"><path d="M512 0c282.8 0 512 229.2 512 512 0 49.5-40.1 89.6-89.6 89.6-48.5 0-87.9-38.5-89.5-86.5l-0.1-3.1c0-183.8-149-332.8-332.8-332.8S179.2 328.2 179.2 512c0 182 146 329.8 327.3 332.8h5.5c49.5 0 89.6 40.1 89.6 89.6 0 49.5-40.1 89.6-89.6 89.6C229.2 1024 0 794.8 0 512S229.2 0 512 0z" p-id="6489" fill="#707070"></path></svg>
      <span>加载中...</span>
    </div>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'ur-button',
  props: {
    type: String,
    size: String,
    shape: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>

<style lang="scss">
  .ur-button{
    position: relative;
    transition: all 0.2s ease;
    letter-spacing: 0.025em;
    font-size: 1rem;
    border: 0.0625rem solid #D1D9E6;
    border-radius: 0.55rem;
    padding: 0.55rem 0.6rem;
    box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
    color: #31344b;
    background-color: #e6e7ee;
    outline: none;
    
    &.loading {
      border: 0;
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
    }

    &:hover {
      cursor: pointer;
    }

    &:active {
      border-color: #e6e7ee;
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
    }

    &.round {
      border-radius: 2rem;
    }

    &.circle {
      border-radius: 50%;
    }

    &.mini {
      padding: 0.4rem;
      font-size: 0.6rem !important;
    }

    &.small {
      padding: 0.4rem;
      font-size: 0.8rem !important;
    }

    &.large {
      padding: 0.7rem;
      font-size: 1.4rem !important;
    }

    .loading {
      .loading_icon {
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        @keyframes rotating {
          0% {
            transform:rotate(0deg)
          }
          to {
            transform:rotate(1turn)
          }
        }
        animation: rotating 1s linear infinite;
      }
      span {
        vertical-align: middle;
      }
    }
  }
</style>

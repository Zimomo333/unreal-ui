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
      <img class="loading_icon" src="@/assets/icons/loading.svg" />
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
    padding: 0.55rem 0.95rem;
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
      padding: 0.5rem;
      font-size: 0.7rem !important;
    }

    &.small {
      padding: 0.6rem;
      font-size: 0.875rem !important;
    }

    &.large {
      font-size: 1.25rem !important;
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

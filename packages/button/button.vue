<template>
  <div>
    <button class="btn" type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'unreal-button'
}
</script>

<style lang="scss">
.btn {
  position: relative;
  transition: all 0.2s ease;
  letter-spacing: 0.025em;
  font-size: 1rem;
  border: 0.0625rem solid transparent;
  border-color: #D1D9E6;
  border-radius: 0.55rem;
  padding: 0.55rem 0.95rem;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
  color: #31344b;
  background-color: #e6e7ee;
  
  &:hover,
  &:focus,
  &:active {
    border-color: #e6e7ee;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
  }
}
// @import './button.scss';
// @import '../../scss/unreal-ui.scss';
</style>

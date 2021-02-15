<template>
  <div>
    <button class="btn" type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'UnrealButton',
  props: {
    type: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
</style>

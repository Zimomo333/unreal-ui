<template>
  <span class="ur-breadcrumb__item">
    <span
      :class="['ur-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="ur-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="ur-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
  export default {
    name: 'UrBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      };
    },

    inject: ['urBreadcrumb'],

    mounted() {
      this.separator = this.urBreadcrumb.separator;
      this.separatorClass = this.urBreadcrumb.separatorClass;
      const link = this.$refs.link;
      link.setAttribute('role', 'link');
      link.addEventListener('click', _ => {
        const { to, $router } = this;
        if (!to || !$router) return;
        this.replace ? $router.replace(to) : $router.push(to);
      });
    }
  };
</script>

<style lang="scss">
  .ur-breadcrumb__item {
    float: left;
  }
  .ur-breadcrumb__item:last-child .ur-breadcrumb__inner,
  .ur-breadcrumb__item:last-child .ur-breadcrumb__inner a,
  .ur-breadcrumb__item:last-child .ur-breadcrumb__inner a:hover,
  .ur-breadcrumb__item:last-child .ur-breadcrumb__inner:hover {
    font-weight: 400;
    color: #606266;
    cursor: text;
  }
  .ur-breadcrumb__item:last-child .ur-breadcrumb__separator {
    display: none;
  }
</style>
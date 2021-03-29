<template>
  <div class="ur-breadcrumb" aria-labur="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UrBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: '',
    },
  },

  provide() {
    return {
      urBreadcrumb: this,
    };
  },

  mounted() {
    const items = this.$el.querySelectorAll('.ur-breadcrumb__item');
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page');
    }
  },
};
</script>

<style lang="scss">
  .ur-breadcrumb {
    font-size: 1rem;
    line-height: 1;
    padding: 1rem;
    border-radius: 0.55rem;
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
  }
  .ur-breadcrumb::after,
  .ur-breadcrumb::before {
    display: table;
    content: '';
  }
  .ur-breadcrumb::after {
    clear: both;
  }
  .ur-breadcrumb__separator {
    margin: 0 9px;
    font-weight: 700;
    color: #c0c4cc;
  }
  .ur-breadcrumb__separator[class*='icon'] {
    margin: 0 6px;
    font-weight: 400;
  }
  .ur-breadcrumb__inner {
    color: #606266;
  }
  .ur-breadcrumb__inner a,
  .ur-breadcrumb__inner.is-link {
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: #5c5d61;
  }
  .ur-breadcrumb__inner a:hover,
  .ur-breadcrumb__inner.is-link:hover {
    color: #303133;
    cursor: pointer;
  }
</style>
<template>
  <div class="carousel">
    <ol class="carousel-indicators">
      <li data-slide-to="0"></li>
      <li data-slide-to="1" class="active"></li>
      <li data-slide-to="2"></li>
    </ol>
    <div class="carousel-img">
      <img class="d-block w-100" src="../../assets/img/carousel/image-2.jpg" alt="First slide" />
      <img class="d-block w-100" src="../../assets/img/carousel/image-3.jpg" alt="Second slide" />
      <img class="d-block w-100" src="../../assets/img/carousel/image-1.jpg" alt="Third slide" />
    </div>
    <div class="carousel-control-prev" href="#Carousel4" role="button" data-slide="prev">
      <div class="icon-wrap">
        <img class="icon" src="../../assets/icons/arrow-left.svg"/>
      </div>
    </div>
    <div class="carousel-control-next" href="#Carousel4" role="button" data-slide="next">
      <div class="icon-wrap">
        <img class="icon" src="../../assets/icons/arrow-right.svg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unreal-carousel',
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.carousel {
  position: relative;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #ffffff;
  padding: 1rem;
  border-radius: 0.55rem;
  border-color: #d1d9e6;
  border: 0.0625rem solid #fafbfe;
  overflow: hidden;

  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 0.5rem;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    padding-left: 0;
    list-style: none;

    li {
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      background: transparent;
      margin: 0 0.4rem;
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff;

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

  .carousel-control-prev {
    left: 0;
  }

  .carousel-control-next {
    right: 0;
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14%;
    color: #ecf0f3;
    text-align: center;

    .icon-wrap{
      padding: 0.4rem;
      box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
      border-radius: 50%;
      .icon {
        display: inline-block;
        width: 1.7rem;
        height: 1.7rem;
      }
      
      &:hover,
      &:focus {
        box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff;
      }
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .carousel-control-prev,
    .carousel-control-next {
      transition: none;
    }
  }

}
</style>
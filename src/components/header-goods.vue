<template>
  <div class="header">
    <div class="menu-left" @click="backHandler"><img src="@/assets/goods/button_back_r.png" alt=""></div>
    <div class="title ellipsis">
      <slot></slot>
    </div>
    <slot name="menus"></slot>
  </div>
</template>

<script>
  export default {
    methods: {
      backHandler() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .header {
    position: absolute;
    height: 96px;
    line-height: 96px;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 2;
    &.shadow {
      box-shadow: 0 7px 50px 10px rgba(170, 170, 170, 0.5);
    }
    .menu-left {
      width: 96px;
      height: 96px;
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px;
      img {
        height: 100%;
        display: block;
      }
    }
    .title {
      padding-left: 96px;
      font-size: 32px;
      color: #999;
      text-align: center;
      padding-right: 96px;
    }
    .menus {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      .menu {
        padding: 18px;
        width: 96px;
        height: 96px;
        img {
          height: 100%;
          display: block;
        }
      }
    }
  }
</style>


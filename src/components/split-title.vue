<template>
  <div class="title flex"><span><slot></slot></span></div>
</template>

<style lang="less" scoped>
  .title {
    position: relative;
    height: 84px;
    font-size: 24px;
    color: #ccc;
    width: 100%;
    justify-content: center;
    &:after {
      content: "";
      left: 30px;
      right: 30px;
      height: 1px; /*no*/
      background-color: #f0f0f0;
      display: block;
      top: 50%;
      position: absolute;
    }
    span {
      padding: 0 30px;
      background-color: #fff;
      z-index: 1;
    }
  }
</style>

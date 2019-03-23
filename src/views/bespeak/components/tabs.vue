<template>
  <div class="tabs-warp">
    <div class="tabs">
      <div class="tab"><span :class="{active:active==1}" @click="searchAppointment(1)">进行中</span></div>
      <div class="tab"><span :class="{active:active==2}" @click="searchAppointment(2)">已完成</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['active'],
    methods: {
      searchAppointment(type) {
        this.$emit('search-appointment', type);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .tabs-warp {
    position: absolute;
    height: 96px;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 7px 50px 10px rgba(170, 170, 170, 0.5);
    z-index: 1;
  }
  .tabs {
    position: absolute;
    left: 30px;
    right: 30px;
    height: 100%;
    background: #fff;
    border-top: 1px solid #f0f0f0; /*no*/
    display: flex;
    align-items: center;
    text-align: center;
    .tab {
      flex: 1;
      font-size: 30px;
      font-weight: bold;
      color: #666;
      height: 100%;
      span {
        display: inline-block;
        height: 96px;
        line-height: 96px;
        width: 150px;
        text-align: center;
        &.active {
          border-bottom: 3px solid @color2; /*no*/
        }
      }
    }
  }
</style>

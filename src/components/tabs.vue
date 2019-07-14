<template>
  <div class="tabs-warp">
    <div class="tabs">
      <div class="tab" v-for="(item, index) in tabs" :key="index" @click="handleClick(index)">
        <span :class="{active: activeIndex === index}">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        activeIndex: 0
      };
    },
    methods: {
      handleClick(index) {
        this.activeIndex = index;
        this.$emit('click', index);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '~@/style/vars.less';
  .tabs-warp {
    position: absolute;
    top: 96px;
    z-index: 1;
    width: 100%;
    height: 96px;
    box-shadow: 0 7px 50px 10px rgba(170, 170, 170, 0.5);
  }
  .tabs {
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
      color: #666;
      height: 100%;
      padding-top: 4px; /*no*/
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 150px;
        margin: 0 auto;
        border-bottom: 4px solid transparent; /*no*/
        &.active {
          font-weight: bold;
          border-bottom: 4px solid @color2; /*no*/
        }
      }
    }
  }
</style>


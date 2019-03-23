<template>
  <div class="tabs-warp">
    <div class="tabs">
      <div class="tab" v-for="(item, index) in orderTab" :key="index" @click="changeTab(item.type)">
        <span :class="{active:item.type == type}">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    props: ['type'],
    data() {
      return {
        orderTab: [
          {
            title: "全部",
            type: -1
          },
          {
            title: "待付款",
            type: 0
          },
          {
            title: "待发货",
            type: 1
          },
          {
            title: "待收货",
            type: 2
          },
          {
            title: "已完成",
            type: 3
          }
        ]
      };
    },
    methods: {
      ...mapMutations(['setOrderType']),
      changeTab(type) {
        this.setOrderType(type);
        this.$emit('search-orders');
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
    background: #fff;
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
      font-size: 20px;
      color: #666;
      height: 100%;
      span {
        display: inline-block;
        height: 96px;
        line-height: 96px;
        width: 80%;
        text-align: center;
        &.active {
          color: #333333;
          font-weight: bold;
          font-size: 24px;
          border-bottom: 3px solid @color2; /*no*/
        }
      }
    }
  }
</style>


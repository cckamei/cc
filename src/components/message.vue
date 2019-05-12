<template>
  <div class="message" @click="$emit('click')">
    <img class="icon" src="@/assets/coupon/icon_gift.png" alt="">{{msg}}
    <img class="arrow" src="@/assets/coupon/icon_arrow_r_g.png">
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String
      }
    }
  };
</script>

<style lang="less" scoped>
  .message {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
    height: 48px;
    line-height: 48px;
    margin: 20px;
    margin-bottom: 0;
    font-size: 20px;
    color: #666;
    .icon {
      width: 24px;
      margin-left: 24px;
      margin-right: 16px;
    }
    .arrow {
      position: absolute;
      right: 24px;
      width: 18px;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 0;
    }
  }
</style>



<template>
  <div class="stone flex">
    <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
    <div class="detail flex-auto flex">
      <span class="name">{{stone.zhusz}}克拉; {{stone.jd}}; {{stone.ys}}; {{stone.zslx}}证书 </span>
      <div class="line3 flex">
        <div class="price">￥{{stone.shouj | currency}}</div>
        <button class="label btn-txt">{{labels[+stone.fhlx - 1]}}</button>
      </div>
      <div class="cart"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      stone: {
        type: Object
      }
    },
    data() {
      return {
        labels: ['现货', '定制15天', '定制45天']
      };
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .stone {
    align-items: stretch;
    background-color: #fff;
    padding: 30px 16px;
    .img {
      width: 120px;
      height: 120px;
      margin-right: 40px;
      flex-shrink: 0;
      background-color: #f5f5f5;
      img {
        background-color: #fff;
        height: 100%;
      }
    }
    .detail {
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      .name {
        font-size: 24px;
        color: #666;
        padding-top: 10px;
      }
      .desc {
        font-size: 20px;
        color: #999;
        padding-top: 24px;
      }
      .line3 {
        position: absolute;
        width: 100%;
        bottom: 10px;
        left: 0;
        align-items: center;
        .price {
          font-size: 24px;
          color: @color4;
          span {
            font-size: 20px;
          }
        }
      }
      .cart {
        position: absolute;
        top: 68px;
        right: 16px;
        width: 40px;
        height: 40px;
        background: url("~@/assets/goods/icon_cart.png") no-repeat;
        background-size: 100%;
      }
    }

    .btn-txt {
      border-radius: 40px;
      font-size: 24px;
      color: @color2;
      border: 1px solid @color2; /*no*/
      padding: 0 16px;
      height: 32px;
      line-height: 32px;
      margin-left: 24px;
      background-color: transparent;
    }
  }
</style>

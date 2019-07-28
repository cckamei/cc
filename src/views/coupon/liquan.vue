<template>
  <div class="card flex">
    <div class="col1 flex-auto" @click="$emit('click')">
      <div class="price"><span>￥</span>{{card.discount_money | currency}}</div>
      <div class="limit">购物满{{card.all_money}}元使用</div>
      <div class="card-scope">使用要求：{{card.comment}}</div>
    </div>
    <div class="col2" @click.stop="$emit('click')">
      <div>{{useText}}</div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    props: {
      card: {
        required: true,
        type: Object
      },
      useText: {
        default: '已领取',
        type: String
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .card {
    background-color: #fff1f1;
    padding: 30px;
    padding-right: 0;
    background: url("~@/assets/coupon/coupon.png") no-repeat;
    background-size: 100% 100%;
    color: #fa7878;
    .col1 {
      position: relative;
      padding-right: 20px;
      .price {
        font-size: 60px;
        span {
          font-size: 36px;
        }
      }
      .limit,
      .expired {
        font-size: 20px;
      }
    }
    .col2 {
      width: 80px;
      flex-shrink: 0;
      text-align: center;
      div {
        width: 0;
        left: 50%;
        margin-left: 40%;
      }
    }
    .card-scope {
      font-size: 20px;
      padding-bottom: 10px;
    }
    .share {
      position: absolute;
      top: 12px;
      right: 62px;
      width: 80px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      font-size: 20px;
      color: #fa7878;
      text-align: center;
      border: 1px solid #fa7878; /*no*/
    }
  }
</style>



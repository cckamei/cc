<template>
  <div class="pt">
    <v-header>订单支付成功</v-header>
    <div class="content">
      <div class="section">
        <div class="success-info flex">
          <img src="~assets/payment/icon_pay_suc.png" alt="">
          <div class="pay-info">
            <p>支付方式：<span>微信支付</span></p>
            <p>支付金额：<span>{{getPayOrder.rest_money | currency}}元</span></p>
          </div>
        </div>
        <div class="btns">
          <button class="btn" @click="goOrderDetail">查看订单</button>
          <button class="btn" @click="$router.push({name: 'index'})">回到首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters(['getPayOrder'])
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      goOrderDetail() {
        this.setCommon({ orderId: this.getPayOrder.order_id });
        this.$router.push({ name: 'orderdetail' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .section {
    background-color: #fff;
    margin-bottom: 20px;
  }

  .success-info {
    justify-content: center;
    padding: 90px 0 70px 0;
    img {
      width: 180px;
      height: 180px;
    }
    .pay-info {
      padding-top: 20px;
      p {
        padding-top: 20px;
        color: #666;
        font-size: 24px;
        span {
          color: @color4;
        }
      }
    }
  }

  .btns {
    text-align: center;
    padding-bottom: 40px;
    .btn {
      font-size: 24px;
      height: 68px;
      width: 540px;
      border: 1px solid @color2; /*no*/
      background-color: #fff;
      color: @color2;
      margin-bottom: 20px;
    }
  }
</style>

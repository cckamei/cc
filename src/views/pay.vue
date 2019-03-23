<template>
  <div class="pt pb">
    <v-header>收银台</v-header>
    <div class="content">
      <div class="order-info section">
        <div class="order">订单内容：{{getPayOrder.goods[0].goods_name}}{{getPayOrder.goods.length>1?'等':''}} 共{{getPayOrder.goods.length}}件</div>
        <div class="order-time">下单时间：{{formatDate(getPayOrder.created_at,'yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="order-total">需支付：<span>{{getPayOrder.rest_money | currency}}元</span></div>
      </div>
      <div class="title">支付方式</div>
      <ul class="pay-select section">
        <li class="flex" @click="selectIndex = 0">
          <img src="~assets/payment/icon_WePay.png" alt="">
          <div class="flex-auto">
            <p>微信支付</p>
            <span class="note">微信安全支付</span>
          </div>
          <div class="select" :class="{active: selectIndex === 0}"></div>
        </li>
        <li v-if="0" class="flex" @click="selectIndex = 1">
          <img src="~assets/payment/icon_UnionPay.png" alt="">
          <div class="flex-auto">
            <p>银联支付</p>
            <span class="note">中国银联在线支付服务</span>
          </div>
          <div class="select" :class="{active: selectIndex === 1}"></div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn active" @click="pay">确认支付</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { weChatPay } from '../utils/wechat';
  import { formatDate } from '../utils';

  export default {
    data() {
      return {
        selectIndex: 0
      };
    },
    computed: {
      ...mapGetters(['getPayOrder'])
    },
    methods: {
      ...mapActions(['ajax']),
      formatDate,
      pay() {
        this.ajax({
          name: 'pay1',
          data: {
            order_id: this.getPayOrder.order_id
          }
        }).then(res => {
          this.ajax({
            name: 'pay2',
            data: {
              pay_id: res.pay_id,
              order_id: this.getPayOrder.order_id
            }
          }).then(res => {
            weChatPay(res, () => {
              setTimeout(() => {
                this.$router.replace({ name: 'paysuccess' });
              }, 500);
            });
          });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pb {
    padding-bottom: 150px;
  }

  .footer {
    height: 150px;
  }

  .section {
    margin: 20px;
    background-color: #fff;
    margin-bottom: 16px;
    border-radius: 10px;
    overflow: hidden;
    &.order-info {
      padding: 40px 20px;
      .order,
      .order-time {
        color: #999;
        padding-bottom: 20px;
      }
      .order-total {
        font-size: 30px;
        font-weight: bold;
        span {
          color: @color4;
        }
      }
    }
    &.pay-select {
      li {
        height: 124px;
        padding: 0 40px;
        border-bottom: 1px solid #f0f0f0; /*no*/
        &:last-child {
          border-bottom: none;
        }
        img {
          width: 60px;
          height: 60px;
          margin-right: 40px;
        }
        .select {
          background: url("~assets/payment/button_select_off.png") no-repeat;
          background-size: 100% 100%;
          width: 36px;
          height: 36px;
          &.active {
            background: url("~assets/payment/button_select_on.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .note {
          color: #999;
          font-size: 20px;
        }
      }
    }
  }

  .title {
    padding: 10px 0 0 40px;
    color: #999;
  }
</style>

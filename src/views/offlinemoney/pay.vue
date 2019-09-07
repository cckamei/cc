<template>
  <div class="pt offline-pay">
    <v-header>线下补款</v-header>
    <div class="content">
      <div class="row">
        <v-form-input :value="reqData.user_name" label="姓名" placeholder="请填写姓名" :readonly="true"></v-form-input>
      </div>
      <div class="row">
        <v-form-input :value="reqData.vip_code" label="VIP卡号" placeholder="请填写VIP卡号" :readonly="true"></v-form-input>
      </div>
      <div class="row">
        <v-form-input :value="reqData.phone" label="手机号" placeholder="请填写手机号" :readonly="true"></v-form-input>
      </div>
      <div class="tips">请核对您的账户信息，确保无误再付款</div>
      <div class="paid">已支付额：<span class="￥">￥</span><span class="price">{{reqData.has_payed}}</span></div>
      <div class="topaid">待支付额：<span class="￥">￥</span><span class="price">{{reqData.need_pay}}</span></div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn active" @click="handleConfirm()">支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        reqData: {}
      };
    },
    created() {
      this.reqData = this.$route.params;
      this.reqData.order_id = '5d6e4c84cba3491ada9b4963';
    },
    methods: {
      ...mapActions(['ajax']),
      handleConfirm() {
        this.ajax({
          name: 'omPay1',
          data: {
            order_id: this.reqData.order_id
          }
        }).then(res => {
          this.ajax({
            name: 'omPay2',
            data: {
              pay_id: res.pay_id,
              order_id: this.reqData.order_id
            }
          }).then(res => {
            weChatPay(res, () => {
              setTimeout(() => {
                this.$router.replace({ name: 'offlinemoneypaysuccess', params: { price: this.reqData.need_pay } });
              }, 500);
            });
          });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    background-color: #fff;
  }
  .row {
    height: 84px;
    border-bottom: 1px solid #f0f0f0; /*no*/
    margin: 0 24px;
  }
  .tips {
    color: @color2;
    text-align: center;
    padding-top: 30px;
  }
  .paid {
    padding-top: 168px;
    text-indent: 144px;
    font-size: 30px;
    .￥ {
      font-size: 36px;
    }
    .price {
      font-size: 48px;
    }
  }
  .topaid {
    padding-top: 44px;
    font-size: 30px;
    text-indent: 144px;
    .￥ {
      font-size: 36px;
    }
    .price {
      font-size: 60px;
      font-weight: bold;
    }
  }
  .footer {
    height: 96px;
    background-color: #fff;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

<style lang="less">
  .offline-pay {
    input {
      padding: 0;
    }
  }
</style>

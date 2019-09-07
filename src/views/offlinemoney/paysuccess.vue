<template>
  <div class="pt">
    <v-header :back="false">支付成功</v-header>
    <div class="content">
      <div class="section">
        <div class="success-info flex">
          <img src="@/assets/payment/icon_pay_suc.png" alt="">
          <div class="pay-info">
            <p>支付方式：<span>微信支付</span></p>
            <p>支付金额：<span>{{$route.params.price | currency}}元</span></p>
          </div>
        </div>
        <div class="btns">
          <button class="btn" @click="$router.replace({name: 'mypage'})">个人中心</button>
          <button class="btn" @click="$router.replace({name: 'index'})">回到首页</button>
        </div>
        <v-wechat-group :type="0"></v-wechat-group>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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

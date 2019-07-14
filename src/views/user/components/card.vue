<template>
  <div class="card">
    <div class="panel-header">
      <span>我的卡券</span>
    </div>
    <div class="card-type">
      <div class="card-item" @click="$router.push({ name: 'mycard' })">
        <div class="count">{{res.vipcard_count}}</div>
        <span>我的购物卡</span>
      </div>
      <div class="card-item" @click="$router.push({ name: 'mycoupon' })">
        <div class="count">{{res.coupon_count}}
        </div>
        <span>我的优惠券</span>
      </div>
      <div class="card-item" @click="$router.push({ name: 'couponmall' })">
        <div class="count">{{res.uncoupon_count}}
          <div v-if="dot" class="dot"></div>
        </div>
        <span>待领优惠券</span>
      </div>
      <div class="card-item" @click="$router.push({ name: 'memberbenefits' })">
        <div class="count">{{memberBenefits.length}}</div>
        <span>品牌礼遇</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from "vuex";

  export default {
    data() {
      return {
        res: {},
        dot: false,
        memberBenefits: []
      };
    },
    created() {
      this.getCouponCount();
      this.getBrandGift();
    },
    methods: {
      ...mapActions(['ajax']),
      getCouponCount() {
        this.ajax({
          name: 'getCouponCount'
        }).then(res => {
          this.res = res;
        });
      },
      getCoupons() {
        this.ajax({
          name: 'coupons'
        }).then(res => {
          this.dot = res.some(item => !item.already);
        });
      },
      getBrandGift() {
        this.ajax({
          name: 'getBrandGift'
        }).then(res => {
          this.memberBenefits = res.list;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .card {
    background: #ffffff;
    width: 710px;
    margin: 20px auto 0;
    border-radius: 10px;
    .card-type {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      .card-item {
        position: relative;
        text-align: center;
        .count {
          font-size: 48px;
          color: #666;
          margin-top: 30px;
          margin-bottom: 30px;
          font-weight: bold;
        }
        span {
          display: block;
          width: 100%;
          margin-bottom: 30px;
          color: #999999;
          font-size: 20px;
        }
        .dot {
          position: absolute;
          right: 0;
          top: 30px;
          width: 20px;
          height: 20px;
          background-color: #fa7878;
          border-radius: 30px;
        }
      }
    }
  }
</style>

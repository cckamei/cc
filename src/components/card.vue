<template>
  <div class="card flex">
    <div class="col1 flex-auto">
      <div class="price"><span>￥</span>{{card.discount_money | currency}}</div>
      <div class="limit">购物满{{card.all_money}}元使用</div>
      <div class="expired">有效期至 {{formatDate(card.starttime, 'yyyy-MM-dd')}} 至 {{formatDate(card.endtime, 'yyyy-MM-dd')}}</div>
    </div>
    <div v-if="card.use" class="col2">{{useText}}</div>
    <div v-else class="col2" @click="addCoupons">{{unuseText}}</div>
  </div>
</template>

<script>
  import { formatDate } from '../utils';
  import { mapActions } from 'vuex';

  export default {
    props: {
      card: {
        required: true,
        type: Object
      },
      useText: {
        default: '已领取',
        type: String
      },
      unuseText: {
        default: '立即领取',
        type: String
      },
      radio: {
        default: false,
        type: Boolean
      }
    },
    methods: {
      ...mapActions(['ajax']),
      formatDate,
      addCoupons() {
        if(this.radio) {
          this.card.use = true;
          this.$emit('select');
        } else {
          this.ajax({
            name: 'addCoupons',
            data: {
              coupon_id: this.card.coupon_id
            }
          }).then(res => {
            this.card.use = true;
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .card {
    background-color: #fff8f5;
    padding: 30px;
    background: url("~assets/goods/coupon.png") no-repeat;
    background-size: 100% 100%;
    color: @color4;
    margin-bottom: 30px;
    .col1 {
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
      width: 170px;
      flex-shrink: 0;
      text-align: center;
    }
  }
</style>



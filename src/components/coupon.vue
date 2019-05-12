<template>
  <div class="card flex">
    <div class="col1 flex-auto">
      <div class="price"><span>￥</span>{{card.discount_money | currency}}</div>
      <div class="limit">购物满{{card.all_money}}元使用</div>
      <div class="expired">有效期 {{formatDate(card.starttime, 'yyyy-MM-dd')}} 至 {{formatDate(card.endtime, 'yyyy-MM-dd')}}</div>
      <div class="share" v-if="card.status === 0" @click.stop="copy(card.starttime)">分享</div>
    </div>
    <div v-if="card.already" class="col2" @click.stop>{{useText}}</div>
    <div v-else class="col2" @click.stop="addCoupons">{{unuseText}}</div>
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
          this.card.already = true;
          this.$emit('select');
        } else {
          this.ajax({
            name: 'addCoupons',
            data: {
              coupon_id: this.card.coupon_id
            }
          }).then(res => {
            this.card.already = true;
          });
        }
      },
      copy(txt) {
        this.$copyText(txt).then(() => {
          this.toast('已经复制到剪贴板');
        }).catch(() => {
          this.toast('复制失败');
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .card {
    background-color: #fff1f1;
    padding: 30px;
    background: url("~@/assets/coupon/coupon.png") no-repeat;
    background-size: 100% 100%;
    color: #fa7878;
    .col1 {
      position: relative;
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



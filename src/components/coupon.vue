<template>
  <div class="card flex">
    <div class="col1 flex-auto" @click="$emit('click')">
      <div class="price"><span>￥</span>{{card.discount_money | currency}}</div>
      <div class="limit">购物满{{card.all_money}}元使用</div>
      <div class="card-scope">适用范围：{{scope}}</div>
      <div class="expired">有效期 {{formatDate(card.starttime, 'yyyy-MM-dd')}} 至 {{formatDate(card.endtime, 'yyyy-MM-dd')}}</div>
      <div class="share" v-if="isShare && card.status === 0" @click.stop="share">分享</div>
    </div>
    <div v-if="card.already" class="col2" @click="$emit('click')">
      <div>{{useText}}</div>
    </div>
    <div v-else class="col2" @click.stop="addCoupons">
      <div>{{unuseText}}</div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../utils';
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
      },
      unuseText: {
        default: '立即领取',
        type: String
      },
      radio: {
        default: false,
        type: Boolean
      },
      isShare: {
        default: true,
        type: Boolean
      }
    },
    computed: {
      scope() {
        if(this.card.use_type_range) {
          let text = this.card.use_type_range.join('、');

          switch(this.card.use_type) {
            case 0: text = '全部商品'; break;
            case 1: text += '套系'; break;
            case 2: text += '款式'; break;
            case 3: text += '镶嵌方式'; break;
            default: text = '';
          }
          return text;
        } else {
          return '';
        }
      }
    },
    methods: {
      ...mapMutations(['setShareCard']),
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
            this.$emit('click');
          });
        }
      },
      share() {
        this.setShareCard({
          url: window.location.href.split('#')[0] + '#/coupon/mycoupon/couponmall/' + this.card.coupon_id,
          type: 0
        });
        this.$router.push({ name: 'sharecard' });
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



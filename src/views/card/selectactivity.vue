<template>
  <div class="pt" :class="{pb: showIndex === 0}">
    <v-header class="header">优惠活动</v-header>
    <v-tabs :tabs="['会员优惠', '店铺优惠']" @click="i => showIndex = i"></v-tabs>
    <div class="content">
      <ul class="cards" v-if="vipCoupon.length" v-show="showIndex === 0">
        <li class="card" v-for="(item, index) in vipCoupon" :key="index">
          <card :card="item" :isShare="false" />
        </li>
      </ul>
      <div v-else class="card-empty" v-show="showIndex === 0">
        <img src="@/assets/card/bg_card_empty.png" alt="">
        <span>暂无购物卡</span>
      </div>
      <ul class="coupons" v-if="shopCoupon.length" v-show="showIndex === 1">
        <li class="coupon shop-coupon" v-for="(item, index) in shopCoupon" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="use">
            <template v-if="item.zengquan === '1'">
              <span class="label">可赠券：</span>满¥{{item.coupons.all_money}}减<span class="price"><span class="¥">￥</span>{{item.coupons.discount_money | currency}}</span>一张
              <img class="coupon-btn" src="@/assets/card/icon_coupon.png" alt="" @click="openCouponDetail(item.coupons)">
            </template>
            <template v-else>
              <span class="label">可优惠：</span><span class="price"><span class="¥">￥</span>{{item.save_money | currency}}</span>
            </template>
            <button class="btn-txt" @click="handleUseShopCoupon(item)">立即使用</button>
          </div>
        </li>
      </ul>
      <div v-else class="card-empty" v-show="showIndex === 1">
        <img src="@/assets/card/bg_card_empty.png" alt="">
        <span>暂无购物卡</span>
      </div>
    </div>
    <div class="footer flex" v-if="vipTotal" v-show="showIndex === 0">
      <span>可优惠：</span><span class="fs-30">￥</span><span class="price">{{vipTotal | currency}}</span>
      <button class="btn-txt" @click="handleUseVipCoupon">立即使用</button>
    </div>
    <v-popup-confirm2 class="coupon-popup" title="赠券详情" :confirm-btn="false" cancel-text="关闭" ref="coupon-popup">
      <div class="scope">适用范围：{{zengCoupon.scope}}</div>
      <div class="period">有效期：{{zengCoupon.period}}</div>
    </v-popup-confirm2>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import card from './components/card';
  import { formatDate } from '@/utils';

  export default {
    components: {
      card
    },
    data() {
      return {
        showIndex: 0,
        vipCoupon: [],
        shopCoupon: [],
        vipTotal: 0,
        zengCoupon: {
          scope: '',
          period: ''
        }
      };
    },
    computed: {
      ...mapState(['cart'])
    },
    created() {
      this.getOrderVipCoupon();
      this.getOrderShopCoupon();
    },
    methods: {
      ...mapMutations(['setPayOrder']),
      ...mapActions(['ajax']),
      getOrderVipCoupon() {
        this.ajax({ name: 'getOrderActivity', data: { "skus": this.cart.map(item => item.cart_id), "kind": "0" } }).then(res => {
          this.vipCoupon = res.list;
          this.vipTotal = res.save_money;
        });
      },
      getOrderShopCoupon() {
        this.ajax({ name: 'getOrderActivity', data: { "skus": this.cart.map(item => item.cart_id), "kind": "1" } }).then(res => {
          res.list.forEach(item => {
            let desc = ['全店商品', '相关商品'][+item.use_kind];
            if(item.active_type === '0') {
              desc += `${item.discount}折`;
            } else {
              let text = '';
              switch(item.discount_type) {
                case '0': text += `满${item.all}元`; break;
                case '1': text += `每满${item.all}元`; break;
                case '2': text += `满${item.all}件`; break;
                case '3': text += `每满${item.all}件`; break;
                default:
              }

              if(item.zengquan === '1') {
                text += `赠优惠券一张`;
              } else {
                text += `减${item.discount_money}元`;
              }

              desc += text;

              // desc += item.items.map(d => {
              //   let text = '';
              //   switch(item.discount_type) {
              //     case '0': text += `满${d.all}元`; break;
              //     case '1': text += `每满${d.all}元`; break;
              //     case '2': text += `满${d.all}件`; break;
              //     case '3': text += `每满${d.all}件`; break;
              //     default:
              //   }

              //   if(item.zengquan === '1') {
              //     text += `赠优惠券一张`;
              //   } else {
              //     text += `减${d.discount_money}元`;
              //   }
              //   return text;
              // }).join('，');
            }
            desc += `，活动时间至${formatDate(item.end, 'yyyy-MM-dd')}`;
            item.desc = desc;
          });
          this.shopCoupon = res.list;
        });
      },
      handleUseVipCoupon() {
        this.setPayOrder({ activity: { kind: 0, discount_money: this.vipTotal } });
        this.$router.go(-1);
      },
      handleUseShopCoupon(card) {
        this.setPayOrder({ activity: Object.assign({ kind: 1 }, card, { discount_money: card.save_money }) });
        this.$router.go(-1);
      },
      openCouponDetail(val) {
        this.$refs['coupon-popup'].open();

        let text = val.use_type_range.join('、');
        switch(val.use_type) {
          case 0: text = '全部商品'; break;
          case 1: text += '套系'; break;
          case 2: text += '款式'; break;
          case 3: text += '镶嵌方式'; break;
          default: text = '';
        }
        this.zengCoupon.scope = text;
        this.zengCoupon.period = formatDate(val.starttime, 'yyyy-MM-dd') + ' 至 ' + formatDate(val.endtime, 'yyyy-MM-dd');
      },
      openQrcode() {
        this.$refs['qrcode-popup'].open();
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    padding-top: 196px;
    .header {
      box-shadow: none;
    }
  }

  .cards {
    padding: 20px;
    .card {
      padding-bottom: 20px;
    }
  }

  .coupons {
    padding: 20px 0;
  }

  .card-empty {
    width: 260px;
    padding-top: 100px;
    text-align: center;
    margin: 0 auto;
    span {
      color: #999;
      font-size: 30px;
      padding-top: 40px;
    }
  }

  .shop-coupon {
    font-size: 24px;
    color: #666;
    padding: 40px 30px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0; /*no*/
    margin-bottom: 16px;
    &:last-child {
      border: none;
    }
    .title {
      padding-bottom: 20px;
    }
    .desc {
      color: #999;
      font-size: 20px;
    }
    .use {
      padding-top: 46px;
      color: #999;
      position: relative;
      .label {
        color: #666;
      }
      .¥ {
        font-size: 30px;
        color: #666;
      }
      .price {
        font-size: 42px;
        color: #666;
      }
      .btn-txt {
        position: absolute;
        bottom: 2px;
        right: 30px;
      }
      .coupon-btn {
        width: 30px;
        height: 30px;
        margin-left: 20px;
      }
    }
  }

  .footer {
    padding: 0 30px;
    background-color: #fff;
    color: #666;
    .price {
      font-size: 42px;
    }
    .btn-txt {
      position: absolute;
      right: 30px;
    }
  }

  .coupon-popup {
    .scope {
      padding-left: 20px;
      color: #666;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .period {
      padding-left: 20px;
      color: #666;
      padding-bottom: 30px;
    }
  }
</style>

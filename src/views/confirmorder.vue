<template>
  <div class="pt pb confirm-order">
    <v-header>确认订单</v-header>
    <div class="content">
      <ul class="sections">
        <li class="section">
          <v-receipt :ziti="true"></v-receipt>
        </li>
        <li class="section cart-list">
          <ul>
            <li class="flex" v-for="(item, index) in cart" :key="index">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="detail flex-auto flex">
                <div class="line1">
                  <span class="name">{{item.goods_title}}</span>
                  <div class="lettering" @click="$router.push({name: 'lettering', params: {type: 'cart', index}})"><img src="@/assets/lettering/icon_inscribe.png" alt=""></div>
                </div>
                <span class="desc">{{item.skuLabel}}</span>
                <div class="line3 flex">
                  <span class="price"><span>￥</span>{{item.price | currency}}</span>
                  <div class="number">X{{item.count}}</div>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="option section">
          <div class="row">
            <v-form-input v-if="payOrder.activity" class="activity" label="优惠活动" :arrow="true" :value="'已选 ' + (payOrder.activity.zengquan === '1' ? '赠券一张' : ('优惠' + activityMoney))" @input-click="$router.push({name: 'selectactivity'})"></v-form-input>
            <v-form-input v-else-if="activityLength" class="activity" label="优惠活动" :arrow="true" :value="activityLength + '个 可参与的活动'" @input-click="$router.push({name: 'selectactivity'})"></v-form-input>
            <v-form-input v-else label="优惠活动" class="activity" :arrow="true" value="没有可参与的活动" @input-click="$router.push({name: 'selectactivity'})"></v-form-input>
          </div>
          <div class="row">
            <v-form-input v-if="payOrder.coupon" class="coupon" label="优惠券" :arrow="true" :value="'已选 优惠' + couponMoney" @input-click="$router.push({name: 'selectcoupon'})"></v-form-input>
            <v-form-input v-else-if="couponLength" class="coupon" label="优惠券" :arrow="true" :value="couponLength + '张 可用的优惠券'" @input-click="$router.push({name: 'selectcoupon'})"></v-form-input>
            <v-form-input v-else label="优惠券" class="coupon" :arrow="true" value="没有可用的优惠券" @input-click="$router.push({name: 'selectcoupon'})"></v-form-input>
          </div>
          <div v-if="getAddress.type" class="row">
            <v-form-datepicker label="自提时间" title="自提时间" v-model="reqData.ziti_time" format="yyyy-MM-dd" placeholder="选择自提时间" :startDate="startDate" :endDate="new Date('2050/01/01')" :arrow="true"></v-form-datepicker>
          </div>
          <div class="row">
            <v-form-slide-up label="配送方式" title="配送方式" confirmText="完成">
              <template slot="value">
                <div v-for="(item, index) in delivery" :key="index" v-if="index === deliveryIndex" class="">{{item.name}} ￥{{item.price}}</div>
              </template>
              <ul class="delivery">
                <li class="flex" v-for="(item, index) in delivery" @click="deliveryIndex = index" :key="index">
                  <div class="flex-auto">
                    <p class="name">{{item.name}}</p>
                    <span class="desc">{{item.desc}}</span>
                  </div>
                  <img v-show="index === deliveryIndex" src="@/assets/goods/icon_selected.png" alt="">
                </li>
              </ul>
            </v-form-slide-up>
          </div>
          <div class="row">
            <v-form-input v-model="invoice.use || ''" label="申请开票" placeholder="(选填) 填写开票信息" :arrow="true" @input-click="$router.push({name: 'invoice'})"></v-form-input>
          </div>
          <!-- <div class="row">
            <div class="insurance flex">
              <div class="label flex-auto">运险费</div>
              <span @click="reqData.insurance = !reqData.insurance">确认收货前退货可赔付11元 ¥1.80</span>
              <div class="select" :class="{active: reqData.insurance}" @click="reqData.insurance = !reqData.insurance"></div>
            </div>
          </div> -->
          <div class="row">
            <v-form-input class="remark" label="留言" v-model="reqData.yaoqiu" placeholder="（选填）建议留言前先与卖家沟通确认"></v-form-input>
          </div>
        </li>
        <li class="summary section">
          <div class="row">
            <v-form-input label="商品总额" :value="'￥' + shopMoney" :readonly="true"></v-form-input>
          </div>
          <div class="row" v-if="delivery.length">
            <v-form-input class="freight" label="运费" :value="'+￥' + delivery[deliveryIndex].price" :readonly="true"></v-form-input>
          </div>
          <!-- <div class="row">
            <v-form-input label="运费险" v-model="shopMoney" :readonly="true"></v-form-input>
          </div> -->
          <div class="row">
            <v-form-input class="freight" label="优惠活动" :value="'-￥' + activityMoney" :readonly="true"></v-form-input>
          </div>
          <div class="row">
            <v-form-input class="freight" label="优惠券" :value="'-￥' + couponMoney" :readonly="true"></v-form-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer flex">
      <span class="total-label">合计：</span>
      <div class="price">￥{{totalMoney | currency}}</div>
      <button class="btn settlement" @click="addOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import confirmOrderMixins from './mixins/confirmorder.vue';
  import { formatPrice } from '@/utils';

  export default {
    mixins: [confirmOrderMixins],
    beforeRouteEnter(to, from, next) {
      if(from.name === 'pay') {
        next(vm => {
          vm.$router.go(-1);
        });
      } else {
        next();
      }
    },
    beforeRouteLeave(to, from, next) {
      if(['goodsdetail', 'cart'].includes(to.name)) {
        next();
      } else {
        this.setPayOrder({ ziti_time: this.reqData.ziti_time, yaoqiu: this.reqData.yaoqiu });
        next();
      }
    },
    data() {
      return {
        shopMoney: 0, //商品总额
        couponMoney: 0, //优惠券
        activityMoney: 0, //优惠活动
        cart: [],
        deliveryIndex: 0,
        delivery: [], //快递
        activityLength: 0,
        couponLength: 0,
        reqData: {
          pslx: 0, //0快递， 1自提
          address_id: '', //地址id
          store_id: '', //自提门店id
          ziti_time: '', //自提时间
          coupon_id: '', //优惠券id
          yaoqiu: '', //备注
          logitics_id: '', //快递id
          active_type: 1, //优惠活动类型 1: 购物卡优惠 2: 店铺优惠
          active_id: '', // 当active_type 为店铺优惠时，传指定的活动ID
          liquan_id: '' // 优惠礼券ID 即会员礼遇
        }
      };
    },
    created() {
      this.cart = this.getCart;
      this.shopMoney = this.cart.reduce((sum, item) => {
        return sum + item.price * +item.count;
      }, 0);

      // 回填要求、自提时间
      this.reqData.yaoqiu = this.getPayOrder.yaoqiu || '';
      this.reqData.ziti_time = this.getPayOrder.ziti_time || '';

      // 回填地址、自提相关
      if(this.getAddress) {
        this.reqData.address_id = this.getAddress.id;
        if(this.getAddress.type) {
          this.reqData.pslx = this.getAddress.type;
          if(this.getAddress.shopId) {
            this.reqData.store_id = this.getAddress.shopId;
          }
        }
      }

      //回填优惠券、礼券
      if(this.payOrder.coupon) {
        this.couponMoney = formatPrice(this.payOrder.coupon.discount_money);
        if(this.payOrder.coupon.type === 1) {
          this.reqData.liquan_id = this.payOrder.coupon.id;
        } else {
          this.reqData.coupon_id = this.payOrder.coupon.coupon_id;
        }
      }

      // 回填优惠活动
      if(this.payOrder.activity) {
        this.activityMoney = formatPrice(this.payOrder.activity.discount_money);
        if(this.payOrder.activity.kind === 1) {
          this.reqData.active_type = 2;
          this.reqData.active_id = this.payOrder.activity.id;
        }
      }

      this.fetchLogitics();
      this.getOrderActivity('0');
      this.getOrderActivity('1');
      this.getOrderCoupons();
    },
    computed: {
      ...mapState(['common', 'payOrder']),
      ...mapGetters(['getAddress', 'getCart', 'getPayOrder']),
      totalMoney() {
        let deliveryMoney = 0;
        if(this.delivery.length) {
          deliveryMoney = this.delivery[this.deliveryIndex].price;
        }

        return formatPrice(this.shopMoney + deliveryMoney - this.couponMoney - this.activityMoney);
      },
      startDate() {
        const date = new Date();

        date.setDate(date.getDate() + 7);
        return date;
      }
    },
    methods: {
      ...mapMutations(['setPayOrder']),
      ...mapActions(['ajax']),
      getGoodsStock(skuId, cb) {
        this.ajax({
          name: 'goodsStock',
          data: {
            sku: skuId
          }
        }).then(res => {
          cb(res.stock);
        });
      },
      setGoodsStock() {
        this.cart.forEach(item => {
          this.getGoodsStock(item.cart_id, stock => {
            item.limit = stock;
          });
        });
      },
      fetchLogitics() {
        this.ajax({ name: 'getLogitics' }).then(res => {
          this.delivery = res;
          let index = res.findIndex(item => item.id == this.getPayOrder.logitics_id);
          if(index != -1) {
            this.deliveryIndex = index;
          }
        });
      },
      getOrderActivity(kind) {
        this.ajax({ name: 'getOrderActivity', data: { "skus": this.cart.map(item => item.cart_id), "kind": kind } }).then(res => {
          if(kind === '0') {
            this.activityLength += res.list.length ? 1 : 0;
          } else {
            this.activityLength += res.list.length;
          }
        });
      },
      getOrderCoupons() {
        this.ajax({ name: 'getOrderCoupon', data: { "skus": this.cart.map(item => item.cart_id) } }).then(res => {
          this.couponLength = res.filter(item => item.can_use).length;
        });
      },
      addOrder() {
        this.reqData.logitics_id = this.delivery[this.deliveryIndex].id;

        if(this.cart.filter(item => item.limit == 0).length) {
          this.toast('商品库存不足');
          return false;
        }

        if(!this.reqData.address_id) {
          this.toast('亲，您还未设置收货地址！');
          return false;
        }

        if(this.reqData.pslx) {
          if(!this.reqData.store_id) {
            this.toast('请选择自提门店！');
            return false;
          }

          if(!this.reqData.ziti_time) {
            this.toast('请选择自提时间');
            return false;
          }
        }

        if(!this.getPayOrder.num) {
          //购物车支付
          this.ajax({
            name: 'addOrder',
            data: {
              ...this.reqData,
              // pslx: this.reqData.pslx + '',
              skus: this.cart.map(res => res.cart_id)
            }
          }).then(res => {
            if(this.invoice.use) {
              this.applyInvock(res.order_id);
            }
            Object.assign(res, this.reqData);
            this.setPayOrder(res);
            this.$router.push({ name: 'pay' });
          }).catch(() => {
            this.setGoodsStock();
          });
        } else {
          //立即购买
          this.ajax({
            name: 'buyNow',
            data: {
              ...this.reqData,
              sku: this.cart.map(res => res.cart_id)[0],
              num: this.getPayOrder.num,
              emp_id: this.getPayOrder.emp_id
            }
          }).then(res => {
            if(this.invoice.use) {
              this.applyInvock(res.order_id);
            }
            Object.assign(res, this.reqData);
            this.setPayOrder(res);
            this.$router.push({ name: 'pay' });
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .sections {
    position: relative;
    margin: 20px;
    .section {
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 10px;
      &.cart-list {
        position: relative;
        padding: 30px 40px 30px 20px;
        li {
          background-color: #fff;
          padding-bottom: 30px;
          align-items: stretch;
          position: relative;
          &.last-child {
            padding-bottom: 0;
          }
          .img {
            width: 200px;
            height: 240px;
            padding-top: 20px;
            padding-bottom: 20px;
            margin-right: 30px;
            flex-shrink: 0;
            // background-color: #f5f5f5;
            img {
              height: 100%;
            }
          }
          .detail {
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            .line1 {
              width: 100%;
              .name {
                font-size: 24px;
                color: #666;
                padding-top: 10px;
              }
              .lettering {
                width: 30px;
                height: 30px;
                float: right;
              }
            }
            .desc {
              font-size: 20px;
              color: #999;
              padding-top: 24px;
            }
            // .kezi {
            //   font-size: 20px;
            //   color: @color4;
            //   padding-top: 24px;
            // }
            .line3 {
              position: absolute;
              width: 100%;
              bottom: 0;
              left: 0;
              align-items: center;
              justify-content: space-between;
              .price {
                font-size: 30px;
                color: @color4;
                span {
                  font-size: 20px;
                }
              }
              .number {
                font-size: 24px;
                color: #666;
                font-weight: bold;
              }
            }
          }
        }
      }
      &.option {
        padding: 0 20px;
        .row {
          height: 84px;
        }
        .insurance {
          height: 84px;
          justify-content: space-between;
          color: #666;
          .label {
            color: #999;
          }
          .select {
            margin-left: 6px;
            background: url("~@/assets/payment/button_select_off.png") no-repeat;
            background-size: 100% 100%;
            width: 24px;
            height: 24px;
            &.active {
              background: url("~@/assets/payment/button_select_on.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .remark {
          font-size: 24px;
        }
      }
      &.summary {
        padding: 0 20px;
        .row {
          height: 84px;
        }
      }
    }
  }

  .footer {
    padding: 0 20px 0 30px;
    height: 96px;
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
    background-color: #fff;
    .total-label {
      font-size: 30px;
      color: #333;
    }
    .price {
      font-size: 30px;
      font-weight: bold;
      color: @color4;
    }
    .settlement {
      margin-left: auto;
      width: 220px;
      height: 68px;
      color: #fff;
      background-color: @color5;
      border-radius: 34px;
    }
  }
</style>

<style lang="less">
  .confirm-order {
    .delivery {
      li {
        font-size: 24px;
        color: #666;
        padding: 30px 16px;
        border-bottom: 1px solid #f0f0f0; /*no*/
        justify-content: space-between;
        &:last-child {
          border-bottom: 0;
        }
        img {
          width: 36px;
          height: 36px;
        }
        .name {
          color: #666;
          padding-bottom: 10px;
        }
        .desc {
          color: #999;
          font-size: 20px;
        }
      }
    }
    .remark.flex {
      input {
        font-size: 24px;
      }
    }
    .summary {
      .label,
      .flex input {
        font-size: 24px;
      }
    }
  }

  .lettering {
    li {
      padding: 20px;
      font-size: 24px;
      color: #666;
      .lettering-text {
        height: 84px;
        line-height: 84px;
        font-size: 24px;
        color: #999;
        border-bottom: 1px solid #f0f0f0; /*no*/
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
      }
    }
  }
</style>

<style lang="less">
  @import "~@/style/vars.less";
  .confirm-order {
    .benifit-list {
      li {
        padding-bottom: 20px;
      }
    }

    .lettering-enable button {
      width: 272px;
    }
    .row > .flex {
      padding-left: 0;
    }
    .summary .label,
    .remark .label {
      color: #999 !important;
    }
    .option {
      .activity,
      .coupon {
        input {
          color: @color2;
        }
      }
    }
    .freight {
      input {
        color: @color2;
      }
    }
  }
</style>



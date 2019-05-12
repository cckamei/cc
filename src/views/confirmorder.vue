<template>
  <div class="pt pb confirm-order">
    <v-header>确认订单</v-header>
    <div class="content">
      <ul class="sections">
        <li class="section address" @click="$router.push({name: 'myaddress'})">
          <div class="arrow" :class="{empty: !getAddress.address}">
            <template v-if="getAddress.address">
              <div class="line1">收货人：{{getAddress.name}} <span class="tel">{{getAddress.phone}}</span></div>
              <div class="line2">收货地址：{{getAddress.address}}</div>
            </template>
            <template v-else>
              <div class="line1">添加收货地址</div>
              <div class="line2">填写您的收货地址和联系方式</div>
            </template>
          </div>
        </li>
        <li class="section cart-list">
          <ul>
            <li class="flex" v-for="(item, index) in cart" :key="index">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="detail flex-auto flex">
                <span class="name">{{item.goods_title}}</span>
                <span class="desc">{{item.skuLabel}}</span>
                <div class="kezi">
                  <span v-if="item.has_kezi" @click="openKezi(item)">刻字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>库存：{{item.limit}}</span>
                </div>
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
            <v-form-slide-up label="优惠券" title="选择优惠券" placeholder="选择优惠券">
              <template slot="value">
                <div v-for="(card, index) in benifit" :key="index" v-if="card.use" class="benifit-btn">已选 优惠{{card.discount_money}}元&nbsp;</div>
              </template>
              <ul>
                <li v-for="(card, index) in benifit" :key="index">
                  <v-card :card="card" useText="已使用" unuseText="立即使用" :radio="true" @select="handleUse(index)"></v-card>
                </li>
              </ul>
            </v-form-slide-up>
          </div>
          <div class="row">
            <v-form-slide-up label="配送方式" title="配送方式" confirmText="完成">
              <template slot="value">
                <div v-for="(item, index) in delivery" :key="index" v-if="index === deliveryIndex" class="">{{item.name}} {{item.price}}元</div>
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
            <v-form-input label="商品总额" v-model="shopMoney" :readonly="true"></v-form-input>
          </div>
          <div class="row" v-if="delivery.length">
            <v-form-input label="运费" v-model="delivery[deliveryIndex].price" :readonly="true"></v-form-input>
          </div>
          <!-- <div class="row">
            <v-form-input label="运费险" v-model="shopMoney" :readonly="true"></v-form-input>
          </div> -->
          <div class="row">
            <v-form-input label="优惠券" v-model="benefitMoney" :readonly="true"></v-form-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer flex">
      <span class="total-label">合计：</span>
      <div class="price">￥{{totalMoney | currency}}</div>
      <button class="btn settlement" @click="addOrder">提交订单</button>
    </div>
    <v-slide-up v-model="lettering.keziVisible" title="刻字定制">
      <ul class="lettering">
        <li class="lettering-enable">
          <div class="title">是否刻字</div>
          <v-button-radio :disabled="true" v-model="lettering.disable" :list="['是', '否']"></v-button-radio>
        </li>
        <li>
          <div class="title">刻字內容</div>
          <input :disabled="true" v-model="lettering.text" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的刻字内容（详细描述不超过50个字）">
        </li>
        <li>
          <div class="title">要求</div>
          <input :disabled="true" v-model="lettering.remarks" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的要求（不超过50个字）">
        </li>
      </ul>
    </v-slide-up>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        shopMoney: 0, //商品总额
        benefitMoney: 0, //优惠券
        cart: [],
        benifit: [], //优惠
        deliveryIndex: 0,
        delivery: [], //快递
        lettering: { //刻字
          keziVisible: false,
          disable: 1,
          text: '',
          remarks: '',
          lettering: '',
          skuId: ''
        },
        reqData: {
          skus: [],
          coupon_id: '', //优惠券id
          address_id: '', //地址id
          yaoqiu: '',
          logitics_id: '' //快递id
        }
      };
    },
    created() {
      this.cart = this.getCart;
      this.reqData.skus = this.cart.map(res => res.cart_id);
      this.shopMoney = this.cart.reduce((sum, item) => {
        return sum + item.price * +item.count;
      }, 0);
      if(this.getAddress) {
        this.reqData.address_id = this.getAddress.id;
      }

      if(this.getPayOrder.order_id) {
        this.reqData.coupon_id = this.getPayOrder.coupon_id;
        this.reqData.yaoqiu = this.getPayOrder.yaoqiu;
        this.reqData.logitics_id = this.getPayOrder.logitics_id;
      }

      this.fetchMyCoupons();
      this.fetchLogitics();
    },
    computed: {
      ...mapGetters(['getAddress', 'getCart', 'getPayOrder']),
      totalMoney() {
        let deliveryMoney = 0;
        if(this.delivery.length) {
          deliveryMoney = this.delivery[this.deliveryIndex].price;
        }

        return this.shopMoney + deliveryMoney - this.benefitMoney;
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
      fetchMyCoupons() {
        this.ajax({ name: 'getCoupons' }).then(res => {
          res.forEach(item => {
            item.use = false;
          });

          if(this.getPayOrder.order_id) {
            res = res.concat(this.getPayOrder.selectCoupons);
          }
          this.benifit = res;
          if(res.length && this.getPayOrder.order_id) {
            this.handleUse(res.length - 1);
          }
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
      addOrder() {
        this.reqData.logitics_id = this.delivery[this.deliveryIndex].id;
        this.reqData.selectCoupons = this.benifit.filter(item => item.use);

        if(this.cart.filter(item => item.limit == 0).length) {
          this.toast('商品库存不足');
          return false;
        }

        if(!this.reqData.address_id) {
          this.toast('亲，您还未设置收货地址！');
          return false;
        }

        //修改
        if(this.getPayOrder.order_id) {
          this.ajax({
            name: 'updateOrder',
            data: {
              order_id: this.getPayOrder.order_id,
              coupon_id: this.reqData.coupon_id,
              logitics_id: this.reqData.logitics_id,
              yaoqiu: this.reqData.yaoqiu
            }
          }).then(res => {
            Object.assign(res, this.reqData);
            this.setPayOrder(res);
            this.$router.push({ name: 'pay' });
          }).catch(() => {
            this.setGoodsStock();
          });
        } else {
          if(!this.getPayOrder.num) {
            //购物车支付
            this.ajax({ name: 'addOrder', data: this.reqData }).then(res => {
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
                coupon_id: this.reqData.coupon_id, //优惠券id
                address_id: this.reqData.address_id, //地址id
                yaoqiu: this.reqData.yaoqiu,
                logitics_id: this.reqData.logitics_id, //快递id
                sku: this.getPayOrder.cart_id,
                num: this.getPayOrder.num,
                kezi: this.getPayOrder.kezi,
                kezi_yaoqiu: this.getPayOrder.kezi_yaoqiu,
                emp_id: this.getPayOrder.emp_id
              }
            }).then(res => {
              Object.assign(res, this.reqData);
              this.setPayOrder(res);
              this.$router.push({ name: 'pay' });
            });
          }
        }
      },
      handleUse(index) {
        this.benifit.forEach(item => {
          item.use = false;
        });
        this.benifit[index].use = true;

        let selectBenefit = this.benifit[index];
        this.benefitMoney = selectBenefit.discount_money;
        this.reqData.coupon_id = selectBenefit.coupon_id;
      },
      openKezi(val) {
        this.lettering.keziVisible = true;
        this.lettering.disable = Number(!val.kezi.kezi);
        this.lettering.text = val.kezi.kezi;
        this.lettering.remarks = val.kezi.yaoqiu;
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
      &.address {
        padding: 40px 20px;
        padding-right: 20px;
        .line1 {
          font-size: 30px;
          font-weight: bold;
          .tel {
            padding-left: 60px;
          }
        }
        .line2 {
          font-size: 24px;
          color: #666;
          padding-top: 16px;
        }
        .empty {
          .line1,
          .line2 {
            color: #999;
          }
        }
      }
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
            .name {
              font-size: 24px;
              color: #666;
              padding-top: 10px;
            }
            .desc {
              font-size: 20px;
              color: #999;
              padding-top: 24px;
            }
            .kezi {
              font-size: 20px;
              color: @color4;
              padding-top: 24px;
            }
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
  .confirm-order {
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
  }
</style>



<template>
  <div class="cart pt pb">
    <v-header>购物车</v-header>
    <div class="content">
      <ul class="cart-list">
        <li class="flex" v-for="(item, index) in cart" v-touch.press="handlePress" :data-index="index">
          <div class="checkbox" :class="{active: item.checked, disabled: !item.limit}" @click="item.limit && (item.checked = !item.checked)"></div>
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <div class="detail flex-auto flex">
            <span class="name">{{item.goods_title}}</span>
            <span class="desc">{{item.skuLabel}}</span>
            <div class="kezi">
              <span v-if="has_kezi" @click="openKezi(item)">刻字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>库存：{{item.limit}}</span>
            </div>
            <template v-if="item.limit">
              <div class="line3">
                <span class="price"><span>￥</span>{{item.price | currency}}</span>
                <div class="add-minus flex">
                  <div @click="item.count > 1 && minusCart(item)" class="btn minus" :class="{active: item.count > 1}"></div>
                  <input v-model="item.count" type="text" readonly>
                  <div @click="item.count < item.limit && addCart(item)" class="btn plus" :class="{active: item.count < item.limit}"></div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="line3 flex">
                <span class="note">所选规格库存不足</span>
                <button class="rechoose btn" @click="goGoodsDetail(item)">重选</button>
              </div>
            </template>
          </div>
          <div class="mask-delete flex" v-if="item.deleteVisible" @click="item.deleteVisible = false">
            <div class="delete" @click="removeCart(item, index)">删除</div>
          </div>
        </li>
      </ul>
      <v-recommend title="为你推荐" :list="recommend"></v-recommend>
    </div>
    <div class="footer flex">
      <div class="checkbox" :class="{active: checkedAll}" @click="checkAll"></div>
      <span class="checkbox-label">全选</span>
      <span class="total-label">合计：</span>
      <div class="price">￥{{totalMoney | currency}}</div>
      <button class="btn settlement" @click="settlement">结算（ {{totalCount}} ）</button>
    </div>
    <v-slide-up v-model="lettering.keziVisible" title="刻字定制" @confirm="handleKezi">
      <ul class="lettering">
        <li class="lettering-enable">
          <div class="title">是否刻字</div>
          <v-button-radio v-model="lettering.disable" :list="['是', '否']"></v-button-radio>
        </li>
        <li>
          <div class="title">刻字內容</div>
          <input :disabled="!!lettering.disable" v-model="lettering.text" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的刻字内容（详细描述不超过50个字）">
        </li>
        <li>
          <div class="title">要求</div>
          <input :disabled="!!lettering.disable" v-model="lettering.remarks" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的要求（不超过50个字）">
        </li>
      </ul>
    </v-slide-up>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        checkedAll: false,
        totalCount: 0,
        totalMoney: 0,
        skuVisible: false,
        skuIndex: 0,
        recommend: [],
        cart: [],
        lettering: { //刻字
          keziVisible: false,
          disable: 1,
          text: '',
          remarks: '',
          lettering: '',
          skuId: ''
        }
      };
    },
    created() {
      this.fetchCart();
      this.fetchRecommend();
    },
    watch: {
      'cart': {
        handler(val) {
          this.checkedAll = !this.cart.filter(item => item.limit && !item.checked).length;
          this.totalCount = this.cart.filter(item => item.limit && item.checked).reduce((total, { count }) => total + +count, 0);
          this.totalMoney = this.cart.filter(item => item.limit && item.checked).reduce((total, { price, count }) => total + price * count, 0);
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations(['setCommon', 'setCart', 'clearPayOrder']),
      ...mapActions(['ajax']),
      fetchCart() {
        this.ajax({
          name: 'cart'
        }).then(res => {
          res.forEach(item => {
            item.checked = false;
            item.deleteVisible = false;
            item.limit = item.stock;
            if(item.is_diamond) {
              item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.guige};${item.guige}`;
            } else {
              item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.guige};${item.guige}`;
            }
          });
          this.cart = res;
        });
      },
      checkAll() {
        let isCheckedAll = this.checkedAll;
        this.cart.filter(item => item.limit).forEach(item => {
          item.checked = !isCheckedAll;
        });
      },
      handlePress(eventName, e, hammer) {
        if(eventName === 'press') {
          this.cart[hammer.index].deleteVisible = true;
        }
      },
      addCart(item) {
        this.cardHandle(item.cart_id, 1, () => {
          item.count++;
        });
      },
      minusCart(item) {
        this.cardHandle(item.cart_id, -1, () => {
          item.count--;
        });
      },
      removeCart(item, index) {
        this.cardHandle(item.cart_id, -item.count, () => {
          this.cart.splice(index, 1);
        });
      },
      cardHandle(skuId, count, cb) {
        this.ajax({
          name: 'addCart',
          data: {
            'cart_id': skuId,
            num: count
          }
        }).then(res => {
          cb();
        });
      },
      settlement() {
        if(!this.totalCount) {
          this.toast('请选择商品');
          return false;
        }
        this.setCart(this.cart.filter(item => item.checked));
        this.clearPayOrder();
        this.$router.push({ name: 'confirmorder' });
      },
      fetchRecommend() {
        this.ajax({
          name: 'cartRecommend'
        }).then(res => {
          this.recommend = res;
        });
      },
      goGoodsDetail(item) {
        this.setCommon({ goodsId: item.goods_id });
        this.$router.push({ name: 'goodsdetail', params: { openSKU: true } });
      },
      openKezi(val) {
        this.lettering.keziVisible = true;
        this.lettering.disable = Number(!val.kezi.kezi);
        this.lettering.text = val.kezi.kezi;
        this.lettering.remarks = val.kezi.yaoqiu;
        this.lettering.skuId = val.cart_id;
      },
      handleKezi() {
        this.ajax({
          name: 'addCart',
          data: {
            'cart_id': this.lettering.skuId,
            num: 0,
            kezi: this.lettering.disable ? '' : this.lettering.text,
            yaoqiu: this.lettering.disable ? '' : this.lettering.remarks
          }
        }).then(res => {
          this.fetchCart();
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .cart-list {
    position: relative;
    margin: 20px;
    li {
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 10px;
      padding: 30px 40px 30px 20px;
      align-items: stretch;
      position: relative;
      .checkbox {
        width: 36px;
        height: 36px;
        background: url("~assets/payment/button_select_off.png") no-repeat;
        background-size: 100% 100%;
        flex-shrink: 0;
        align-self: center;
        &.active {
          background: url("~assets/payment/button_select_on.png") no-repeat;
          background-size: 100% 100%;
        }
        &.disabled {
          background: url("~assets/payment/button_select_una.png") no-repeat;
          background-size: 100% 100%;
          background-color: #fff !important;
        }
      }
      .img {
        width: 200px;
        height: 240px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 20px;
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
          font-size: 30px;
          color: #666;
          padding-top: 10px;
        }
        .desc {
          font-size: 20px;
          color: #999;
          padding-top: 20px;
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
          .note {
            font-size: 20px;
            color: #666;
          }
          .rechoose {
            height: 40px;
            width: 90px;
            border-radius: 20px;
            background-color: #fff;
            font-size: 20px;
            color: @color2;
            border: 1px solid @color2; /*no*/
          }
          .add-minus {
            color: #666;
            font-size: 24px;
            justify-content: space-between;
            position: absolute;
            right: 0;
            bottom: 0;
            .btn {
              width: 32px;
              height: 32px;
              &.plus {
                background: url("~assets/goods/button_plus_l.png") no-repeat;
                background-size: 100%;
                &.active {
                  background: url("~assets/goods/button_plus_d.png") no-repeat;
                  background-size: 100%;
                }
              }
              &.minus {
                background: url("~assets/goods/button_minus_l.png") no-repeat;
                background-size: 100%;
                &.active {
                  background: url("~assets/goods/button_minus_d.png") no-repeat;
                  background-size: 100%;
                }
              }
            }
            input {
              width: 0;
              min-width: 60px;
              color: #666;
              background-color: #f0f0f0;
              text-align: center;
              padding: 0 10px;
              margin: 0 8px;
            }
          }
        }
      }
      .mask-delete {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
        right: 0;
        height: 100%;
        justify-content: center;
        margin: 0 -20px;
        .delete {
          width: 120px;
          height: 120px;
          color: #fff;
          background-color: @color2;
          text-align: center;
          line-height: 120px;
          font-size: 24px;
          border-radius: 50%;
        }
      }
    }
  }

  .footer {
    padding: 0 20px 0 30px;
    height: 96px;
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
    background-color: #fff;
    .checkbox {
      width: 36px;
      height: 36px;
      margin-right: 20px;
      background: url("~assets/payment/button_select_off.png") no-repeat;
      background-size: 100% 100%;
      flex-shrink: 0;
      align-self: center;
      &.active {
        background: url("~assets/payment/button_select_on.png") no-repeat;
        background-size: 100% 100%;
      }
      &.disabled {
        background: url("~assets/payment/button_select_una.png") no-repeat;
        background-size: 100% 100%;
        background-color: #fff !important;
      }
    }
    .checkbox-label {
      font-size: 24px;
      color: #999;
      padding-right: 40px;
    }
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

  .sku {
    li {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      &.sku-icon {
        align-items: flex-end;
        border: none;
        .icon {
          width: 200px;
          height: 200px;
          margin-right: 30px;
        }
        .price {
          color: @color4;
          font-size: 42px;
        }
        .code {
          color: #999;
          font-size: 20px;
        }
      }
      &.count {
        color: #666;
        font-size: 24px;
        justify-content: space-between;
        .btn {
          width: 40px;
          height: 40px;
          &.plus {
            background: url("~assets/goods/button_plus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~assets/goods/button_plus_d.png") no-repeat;
              background-size: 100%;
            }
          }
          &.minus {
            background: url("~assets/goods/button_minus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~assets/goods/button_minus_d.png") no-repeat;
              background-size: 100%;
            }
          }
        }
        input {
          width: 0;
          min-width: 120px;
          color: #666;
          text-align: center;
          padding: 0 10px;
        }
      }
      .title {
        color: #666;
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
  .cart .lettering-enable button {
    width: 272px;
  }
</style>


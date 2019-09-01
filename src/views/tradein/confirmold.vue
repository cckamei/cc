<template>
  <div class="pt pb confirm-old">
    <v-header>以旧换新</v-header>
    <div class="content">
      <div class="content-wrapper">
        <section>
          <v-receipt></v-receipt>
        </section>
        <section class="old-goods">
          <div class="row old-title">
            <v-form-input v-model="value1" :arrow="true" label="旧品信息" placeholder="添加旧品" @input-click="$router.push({name: 'tradeinaddold'})"></v-form-input>
          </div>
          <ul class="goods">
            <li v-for="(item, index) in tradeinList" :key="index" @click="$router.push({name: 'tradeinaddold', params: {index}})">
              <div class="item-wrapper flex">
                <div class="img"><img :src="item.goodsPicList[0]" alt=""></div>
                <div class="detail flex-auto flex">
                  <div class="detail-row flex">
                    <div class="col">品牌：{{getTradeinOptions.brands[item.brandIndex].title}}</div>
                  </div>
                  <div class="detail-row flex">
                    <div class="col">预估价：{{item.price === 'UNKNOW' ? '该类型商品仅支持人工估值' :  '￥' + item.price}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section class="summary">
          <div class="row pre-price">
            <v-form-input class="pr-0" label="预估旧品总额" :value="goodsMoney === 'UNKNOW' ? '包含仅支持人工估值的商品' : '￥' + goodsMoney" :readonly="true"></v-form-input>
          </div>
          <!-- <div class="row" v-if="delivery.length">
            <v-form-input class="freight" label="运费" :value="'+￥' + delivery[deliveryIndex].price" :readonly="true"></v-form-input>
          </div> -->
        </section>
        <section class="option">
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
          <div class="row">
            <v-form-input class="pr-0" label="留言" v-model="yaoqiu" placeholder="（选填）建议留言前先与卖家沟通确认"></v-form-input>
          </div>
        </section>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        yaoqiu: '',
        value1: '',
        goodsMoney: 0, //商品总额
        deliveryIndex: 0,
        delivery: [], //快递
        tradeinList: []
      };
    },
    created() {
      this.fetchLogitics();
      this.reqTradeinCalOld();
    },
    computed: {
      ...mapState(['stoneMade']),
      ...mapGetters(['getAddress', 'getTradeinOld', 'getTradeinOptions']),
      // totalMoney() {
      //   let deliveryMoney = 0;
      //   if(this.delivery.length) {
      //     deliveryMoney = this.delivery[this.deliveryIndex].price;
      //   }

      //   return this.goodsMoney + deliveryMoney;
      // },
      isActive() {
        return this.tradeinList.length;
      }
    },
    methods: {
      ...mapMutations(['setCommon']),
      ...mapActions(['ajax']),
      fetchLogitics() {
        this.ajax({ name: 'getLogitics' }).then(res => {
          this.delivery = res;
        });
      },
      reqTradeinCalOld() {
        // jlx_key
        // pdlx_key
        // stone_key
        // pp_key
        // goods_imgs
        // cert_imgs
        // other_imgs_info

        // brandIndex: 0,
        // brands: [], //品牌
        // goldIndex: 0,
        // golds: [], //金信息
        // stoneIndex: 0,
        // stones: [], //石信息
        // wearIndex: 0,
        // wears: [], //佩戴分类
        // goodsPicList: [], //商品照片
        // certifyPicList: [], //鉴定证书
        // otherPicList: [] //其他票据
        if(this.getTradeinOld.length) {
          this.ajax({ name: 'tradeinCalOld', data: { old_goods: this._getOldGoods() } }).then(res => {
            this.tradeinList = this.getTradeinOld.map((item, index) => {
              return {
                ...item,
                price: res.goods[index].auto_cal_price
              }
            });
            this.goodsMoney = res.auto_cal;
          });
        }
      },
      handleConfirm() {
        const reqData = {
          old_goods: this._getOldGoods(),
          address_id: this.getAddress.id,
          logitics_id: this.delivery[this.deliveryIndex].id,
          yaoqiu: this.yaoqiu
        }

        if(!reqData.address_id) {
          this.toast('亲，您还未设置收货地址！');
          return false;
        }

        this.$router.push({ name: 'tradeinagreement', params: { reqData } });
      },
      _getOldGoods() {
        const { brands, golds, stones, wears } = this.getTradeinOptions;
        const oldGoods = this.getTradeinOld.map((item, index) => {
          return {
            jlx_key: golds[item.goldIndex].key,
            pdlx_key: wears[item.goldIndex].key,
            stone_key: stones[item.wearIndex].key,
            pp_key: brands[item.brandIndex].key,
            goods_imgs: item.goodsPicList,
            cert_imgs: item.certifyPicList,
            other_imgs_info: item.otherPicList
          }
        });
        return JSON.stringify(oldGoods);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .content-wrapper {
    position: relative;
    margin: 20px;
    section {
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 10px;
      overflow: hidden;
      .row {
        height: 84px;
        padding: 0 20px;
        &.pre-price {
          height: 104px;
        }
      }
      &.option {
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
      }
      .goods {
        .item-wrapper {
          background-color: #fff;
          padding: 30px 40px;
          align-items: stretch;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
          .img {
            width: 120px;
            height: 120px;
            margin-right: 40px;
            flex-shrink: 0;
            background-color: #f5f5f5;
            img {
              height: 100%;
            }
          }
          .detail {
            flex-direction: column;
            position: relative;
            align-items: flex-start;
            justify-content: center;
            .detail-row {
              font-size: 24px;
              color: #333;
              width: 100%;
              &:last-child {
                padding-top: 10px;
              }
              .col {
                // width: 50%;
              }
            }
          }
        }
      }
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
  @import "~@/style/vars.less";
  .confirm-old {
    .row {
      &.old-title .label {
        color: #666;
      }
      > .flex {
        padding-left: 0;
      }
    }
    .freight {
      input {
        color: @color2;
      }
    }
    .pr-0 {
      padding-right: 0;
    }
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
  }
</style>

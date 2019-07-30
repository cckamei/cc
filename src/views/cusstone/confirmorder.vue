<template>
  <div class="pt pb confirm-order">
    <v-header>确认订单</v-header>
    <div class="content">
      <ul class="sections">
        <li class="section">
          <v-receipt></v-receipt>
        </li>
        <li class="section flex goods">
          <div class="img">
            <img :src="stoneMade.img" alt="">
          </div>
          <div class="detail flex-auto flex">
            <span class="name">{{stoneMade.goods_title}}</span>
            <span class="desc">{{stoneMade[stoneMade.ddlx].zhusz}}克拉; {{stoneMade[stoneMade.ddlx].zhusjd}}; {{stoneMade[stoneMade.ddlx].zhusys}}; {{stoneMade[stoneMade.ddlx].zslx}}证书; {{stoneMade[stoneMade.ddlx].zhusqg}}切工</span>
            <div class="line3 flex">
              <span class="price"><span>￥</span>{{stoneMade[stoneMade.ddlx].shouj | currency}}</span>
              <div class="number">x1</div>
            </div>
          </div>
        </li>
        <li class="option section">
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
            <v-form-input v-model="invoice.use" label="申请开票" placeholder="(选填) 填写开票信息" :arrow="true" @input-click="$router.push({name: 'invoice'})"></v-form-input>
          </div>
          <div class="row">
            <v-form-input class="remark" label="留言" v-model="reqData.yaoqiu" placeholder="（选填）建议留言前先与卖家沟通确认"></v-form-input>
          </div>
        </li>
        <li class="summary section">
          <div class="row">
            <v-form-input label="商品总额" :value="'￥' + goodsMoney" :readonly="true"></v-form-input>
          </div>
          <div class="row" v-if="delivery.length">
            <v-form-input class="freight" label="运费" :value="'+￥' + delivery[deliveryIndex].price" :readonly="true"></v-form-input>
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
  import confirmOrderMixins from '../mixins/confirmorder.vue';

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
    data() {
      return {
        goodsMoney: 0, //商品总额
        deliveryIndex: 0,
        delivery: [], //快递
        reqData: {
          goods_id: '', //商品id
          address_id: '', //地址id
          logitics_id: '', //快递id
          yaoqiu: '',
          gsmh: '', // 公司模号 必填
          jinys: '', // 金类型
          shouc: '', // 手寸
          zhusz: '', // 主石重
          zhusjd: '', // 主石净度
          zhusys: '', // 主石颜色
          zhusqg: '', // 主石切工
          zhuspg: '', // 主石抛光
          zhusdc: '', // 主石对称
          zslx: '', // 证书类型
          shouj: '', // 售价
          fhlx: '', // 发货类型 # 1：现货 2： 15天 3：45天
          ddlx: '' // 订单类型 # N：普通定制 S：高级定制
        }
      };
    },
    created() {
      if(this.getAddress) {
        this.reqData.address_id = this.getAddress.id;
      }

      this.goodsMoney = +this.stoneMade[this.stoneMade.ddlx].shouj;
      this.reqData.goods_id = this.stoneMade.goods_id;
      this.reqData.yaoqiu = this.stoneMade.remark || '';
      this.fetchLogitics();
    },
    computed: {
      ...mapState(['stoneMade']),
      ...mapGetters(['getAddress']),
      totalMoney() {
        let deliveryMoney = 0;
        if(this.delivery.length) {
          deliveryMoney = this.delivery[this.deliveryIndex].price;
        }

        return this.goodsMoney + deliveryMoney;
      }
    },
    methods: {
      ...mapMutations(['clearPayOrder', 'setPayOrder']),
      ...mapActions(['ajax']),
      fetchLogitics() {
        this.ajax({ name: 'getLogitics' }).then(res => {
          this.delivery = res;
        });
      },
      addOrder() {
        this.reqData.logitics_id = this.delivery[this.deliveryIndex].id;
        Object.assign(this.reqData, this.stoneMade[this.stoneMade.ddlx]);

        if(!this.reqData.address_id) {
          this.toast('亲，您还未设置收货地址！');
          return false;
        }

        this.ajax({ name: 'addDIYStoneOrder', data: this.reqData }).then(res => {
          if(this.invoice.use) {
            this.applyInvock(res.order_id);
          }
          this.clearPayOrder();
          this.setPayOrder(res);
          this.$router.push({ name: 'pay' });
        });
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
      &.goods {
        position: relative;
        padding: 30px 40px 30px 20px;
        display: flex;
        background-color: #fff;
        padding-bottom: 30px;
        align-items: stretch;
        position: relative;
        .img {
          width: 200px;
          height: 200px;
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
</style>

<style lang="less">
  @import "~@/style/vars.less";
  .confirm-order {
    .row > .flex {
      padding-left: 0;
    }
    .summary .label,
    .remark .label {
      color: #999 !important;
    }
    .freight {
      input {
        color: @color2;
      }
    }
  }
</style>



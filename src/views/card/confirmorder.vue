<template>
  <div class="pt pb confirm-order">
    <v-header>确认订单</v-header>
    <div class="content">
      <ul class="sections">
        <li class="section flex goods">
          <div class="img">
            <img src="@/assets/card/img_card.png" alt="">
          </div>
          <div class="detail flex-auto flex">
            <span class="name">{{card.name}}</span>
            <div class="card-discount"><span>{{card.discount * 10}}</span>&nbsp;折</div>
            <span class="desc">适用范围：{{card.scope}}</span>
            <div class="line3 flex">
              <span class="price"><span>￥</span>{{card.price | currency}}</span>
              <div class="number">x1</div>
            </div>
          </div>
        </li>
        <li class="summary section">
          <div class="row">
            <v-form-input label="商品总额" :value="'￥' + goodsMoney" :readonly="true"></v-form-input>
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

  export default {
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
          address_id: '5bed19f4a2154f5303a38d36', //地址id
          logitics_id: '5be148b4a2154f6a3731a5f8', //快递id
          yaoqiu: '',
          vipcard_id: ''
        }
      };
    },
    created() {
      this.goodsMoney = this.card.price;
    },
    computed: {
      ...mapState(['card']),
      ...mapGetters(['getAddress']),
      totalMoney() {
        return this.goodsMoney;
      }
    },
    methods: {
      ...mapMutations(['clearPayOrder', 'setPayOrder']),
      ...mapActions(['ajax']),
      addOrder() {
        this.reqData.vipcard_id = this.card.card_id;
        this.ajax({ name: 'buyCard', data: this.reqData }).then(res => {
          this.clearPayOrder();
          this.setPayOrder(res);
          this.$router.replace({ name: 'pay' });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
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
          .card-discount {
            font-size: 20px;
            color: #999;
            padding-top: 24px;
          }
          .desc {
            font-size: 20px;
            color: #999;
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
      font-size: 30px;
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
  .confirm-order {
    .row > .flex {
      padding-left: 0;
    }
    .freight {
      input {
        color: @color2;
      }
    }
  }
</style>



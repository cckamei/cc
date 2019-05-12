<template>
  <div class="order-list">
    <div class="item" v-for="(order,i) in orders" :key="i">
      <div class="item-title" @click="goDetail(order.order_id)">
        <div class="titleleft">
          <img src="@/assets/mypage/icon_shop.png" alt="">
          <span>{{appName}}</span>
        </div>
        <div class="listright">{{typename(order.status)}}</div>
      </div>
      <div class="item-content" v-for="(good,j) in order.goods" :key="j" @click="goDetail(order.order_id)">
        <div class="contentleft">
          <img :src="good.goods_img" alt="">
        </div>
        <div class="contentright">
          <div class="contenttitle">
            <span>{{good.goods_name}}</span>
            <span>￥{{good.goods_price}}</span>
          </div>
          <div class="contentmessage">
            <p>{{good.skuLabel}}</p>
            <div class="messageright">
              <s>&nbsp;</s>
              <span>X{{good.goods_count}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-price">
        共{{order.goods.length}}件商品 实付款： <span>￥{{order.rest_money}}</span> （含运费￥{{order.logistics_money}}）
      </div>
      <div class="item-footer">
        <!-- 待收货 2-->
        <div class="ordertypeDF" v-if="order.status==2">
          <!-- <button class="btngrey btnleft"> </button>
          <button class="btnpink" @click="$router.push({ name: 'pay' })">确认收货</button> -->
          <button class="btngrey btnleft" @click="gotLogistics(order.order_id)">查看物流</button>
          <button class="btnpink" @click="isConform = true;orderId = order.order_id; ">确认收货</button>
        </div>
        <!-- 已完成 3-->
        <div class="ordertypeDF" v-if="order.status==3">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="tradeIn">以旧换新</button>
        </div>
        <!-- 待付款 0-->
        <div class="ordertypeDF" v-if="order.status==0">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btnpink" @click="parOrder(order)">立即付款</button>
        </div>
        <!-- 已取消 8-->
        <div class="ordertypeDF" v-if="order.status==8">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="goGoodsDetail">再次购买</button>
        </div>
        <!-- 退款中 4-->
        <div class="ordertypeDS" v-if="order.status==4">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
        </div>
        <!-- 待发货 1-->
        <div class="ordertypeWC" v-if="order.status==1">
          <button class="btngrey" @click="serviceVisible = true">联系客服</button>
        </div>
        <!-- 已退款 6-->
        <div class="ordertypeDS" v-if="order.status==6">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
        </div>
      </div>
    </div>
    <v-popup-confirm title="" v-model="serviceVisible" @confirm="goCustomService">
      <div class="txt-center">
        即将离开商城，接通您的专属客服。<br>您可以在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
    </v-popup-confirm>
    <v-popup-confirm v-model="isConform" @confirm="handleSConfirm">
      <div class="txt-center">确定商品已被本人亲自签收了吗？</div>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        serviceVisible: false,
        isConform: false,
        orderId: ''
      };
    },
    props: ['orders'],
    created() {
    },
    computed: {
      appName() {
        return window.htp.appName;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon', 'setAppointment', 'setPayOrder', 'setOrderType']),
      goDetail(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'orderdetail' });
      },
      goRefundDetail(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'refunddetail' });
      },
      tradeIn() {
        this.setAppointment({
          appointment: {
          },
          edit: 1,
          type: 1
        });
        this.$router.push({ name: 'addappointment' });
      },
      goGoodsDetail() {
        this.$router.push({ name: 'goodslist' });
      },
      typename(type) {
        let _typenames = ['待付款', '待发货', '待收货', '已完成', '退款中', '', '已退款', '', '已取消'];
        return _typenames[type];
      },
      gotLogistics(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'logistics' });
      },
      handleSConfirm() {
        this.ajax({
          name: 'changeOrder',
          data: {
            order_id: this.orderId,
            action: 'affirm'
          }
        }).then(res => {
          window.location.reload();
        });
      },
      goCustomService() {
        window.wx.closeWindow();
      },
      parOrder(order) {
        this.setPayOrder(order);
        this.$router.push({ name: 'pay' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .txt-center {
    padding: 30px 0;
  }
  .order-list {
    margin-top: 112px;
    .item {
      background: #ffffff;
      margin-bottom: 16px;
      &-title {
        padding: 0 30px;
        height: 64px;
        line-height: 64px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .titleleft {
          img {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 12px;
          }
        }
        .listright {
          font-size: 24px;
          color: @color4;
        }
      }
      &-content {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        vertical-align: middle;
        align-items: center;
        padding: 0 30px;
        background: #f5f5f5;
        margin-bottom: 8px;
        .contentleft {
          width: 120px;
          height: 120px;
          margin: 20px 20px 20px 0;
          background: #ffffff;
          img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
        .contentright {
          flex: 1;
          .contenttitle {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin: 30px 0 20px;
            color: #666666;
            font-size: 24px;
            span:nth-child-of(2) {
              text-align: right;
            }
          }
          .contentmessage {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            font-size: 24px;
            margin-bottom: 30px;
            color: #999999;
            p {
              width: 360px;
            }
            .messageright {
              text-align: right;
            }
            s {
              color: #cccccc;
              display: block;
            }
          }
        }
      }
      &-price {
        height: 64px;
        line-height: 64px;
        text-align: right;
        padding: 0 30px;
        font-size: 20px;
        color: #666666;
        border-bottom: 2px solid #cccccc;
        span {
          font-size: 24px;
        }
      }
      &-footer {
        height: 80px;
        text-align: right;
        padding: 0 30px;
        button {
          width: 140px;
          height: 52px;
          border-radius: 26px;
          font-size: 20px;
          margin-top: 14px;
        }
        .btnleft {
          margin-right: 30px;
        }
        .btngrey {
          background: #ffffff;
          border: 2px solid #cccccc;
          color: #666666;
        }
        .btnpink {
          background: @color5;
          border: 2px solid @color5;
          color: #ffffff;
        }
      }
    }
  }
  .txt-center {
    padding: 50px 0;
  }
</style>

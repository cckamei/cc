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
      <!-- 正常商品 -->
      <goods-normal :orderlist="true" v-if="order.kind === 1" :goods="order.goods"></goods-normal>
      <!-- 购物卡 -->
      <goods-card v-if="order.kind === 2" :goods="order.goods"></goods-card>
      <!-- 钻石定制 -->
      <goods-stone v-else-if="order.kind === 3" :goods="order.goods"></goods-stone>
      <!-- 套餐 -->
      <goods-package :orderlist="true" v-else-if="order.kind === 4" :goods="order.goods[0]"></goods-package>
      <!-- 裸石 -->
      <bare-stone v-else-if="order.kind === 6" :goods="order.goods"></bare-stone>
      <div class="item-price">
        <template v-if="order.kind === 4">
          共 {{order.goods[0].goods_list.length}}
        </template>
        <template v-else-if="order.kind === 6">
          共 {{order.goods[0].shl}}
        </template>
        <template v-else>
          共 {{order.goods.length}}
        </template>
        件商品 实付款： <span>￥{{order.rest_money}}</span> <span v-if="order.kind !== 2">（含运费￥{{order.logistics_money}}）</span>
      </div>
      <div class="item-footer">
        <!-- 待付款 0-->
        <div class="ordertypeDF" v-if="order.status==0">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btnpink" @click="parOrder(order)">立即付款</button>
        </div>
        <!-- 待发货 1-->
        <div class="ordertypeWC" v-if="order.status==1">
          <button class="btngrey" @click="serviceVisible = true">联系客服</button>
        </div>
        <!-- 待收货 2-->
        <div class="ordertypeDF" v-if="order.status == 2">
          <!-- <button class="btngrey btnleft"> </button>
          <button class="btnpink" @click="$router.push({ name: 'pay' })">确认收货</button> -->
          <button class="btngrey btnleft" @click="gotLogistics(order.order_id)">查看物流</button>
          <button class="btnpink" @click="isConform = true;orderId = order.order_id; ">确认收货</button>
        </div>
        <!-- 已完成 3-->
        <div class="ordertypeDF" v-if="order.status==3">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <!-- <button class="btngrey" @click="tradeIn">以旧换新</button> -->
        </div>
        <!-- 退款中 4-->
        <div class="ordertypeDS" v-if="order.status==4">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
        </div>
        <!-- 已退款 6-->
        <div class="ordertypeDS" v-if="order.status==6">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
        </div>
        <!-- 已取消 8-->
        <div class="ordertypeDF" v-if="order.status==8">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <!-- <button class="btngrey" @click="goGoodsDetail">再次购买</button> -->
        </div>
        <!-- 定制中 9-->
        <div class="ordertypeWC" v-if="order.status == 9">
          <button class="btngrey" @click="serviceVisible = true">联系客服</button>
        </div>
        <!-- 待取货 10-->
        <div class="ordertypeDF" v-if="order.status == 10">
          <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
          <button class="btnpink" @click="isConform = true;orderId = order.order_id; ">确认收货</button>
        </div>
      </div>
    </div>
    <v-popup-confirm title="" v-model="serviceVisible" @confirm="goCustomService">
      <div class="txt-center">
        即将离开商城，接通您的专属客服。<br>在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
    </v-popup-confirm>
    <v-popup-confirm v-model="isConform" @confirm="handleSConfirm">
      <div class="txt-center">确定商品已被本人亲自签收了吗？</div>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import goodsPackage from './package.vue';
  import goodsCard from './card.vue';
  import goodsNormal from './normal.vue';
  import goodsStone from './stone.vue';
  import bareStone from './bare.vue';

  export default {
    components: {
      goodsPackage,
      goodsCard,
      goodsNormal,
      goodsStone,
      bareStone
    },
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
        this.setCommon({ isTradein: false });
        this.$router.push({ name: 'goodslist' });
      },
      typename(type) {
        let _typenames = ['待付款', '待发货', '待收货', '已完成', '退款中', '', '已退款', '', '已取消', '定制中', '待取货'];
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
        this.$router.replace({ name: 'pay' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .txt-center {
    padding: 30px 0;
  }
  .order-list {
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

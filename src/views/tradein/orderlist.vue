<template>
  <div class="order pt">
    <v-header>订单列表</v-header>
    <tabs :type="getOrderType" @search-orders="getOrders"></tabs>
    <div class="content">
      <div class="order-list">
        <div class="item" v-for="(order,i) in orders" :key="i" v-if="order.kind === 1">
          <div class="item-title" @click="goDetail(order.order_id)">
            <div class="titleleft">
              <img src="@/assets/mypage/icon_shop.png" alt="">
              <span>以旧换新线上服务</span>
            </div>
            <div class="listright">{{typename(order.status)}}</div>
          </div>
          <goods-old :goods="order.goods"></goods-old>
          <div class="item-price">
            共{{order.goods.length}}件旧品 <template v-if="[2, 3, 4].includes(order.status)">实付款： <span>￥{{order.rest_money}}</span> <span>（含运费￥{{order.logistics_money}}）</span></template>
          </div>
          <div class="item-footer">
            <!-- 待验货 0-->
            <div class="ordertypeDF" v-if="order.status === 0">
              <button class="btnpink" @click="$router.push({name: 'tradeindelivery'})">填写快递</button>
            </div>
            <!-- 待付款 1-->
            <div class="ordertypeDF" v-if="order.status === 1">
              <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
              <button class="btngrey" @click="$router.push({name: 'tradeinaddnew'})">选择新品</button>
            </div>
            <!-- 新品待发货 2-->
            <div class="ordertypeWC" v-if="order.status === 2">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
            <!-- 新品待收货 3-->
            <div class="ordertypeDF" v-if="order.status === 3">
              <button class="btngrey btnleft" @click="gotLogistics(order.order_id)">查看物流</button>
              <button class="btnpink" @click="isConform = true;orderId = order.order_id; ">确认收货</button>
            </div>
            <!-- 已完成 4-->
            <div class="ordertypeDF" v-if="order.status === 4">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
            <!-- 旧品待发货 5-->
            <div class="ordertypeDF" v-if="order.status === 5">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
            <!-- 旧品待收货 6-->
            <div class="ordertypeDF" v-if="order.status === 6">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
            <!-- 已取消 7-->
            <div class="ordertypeDF" v-if="order.status === 7">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
            <!-- 已关闭 8-->
            <div class="ordertypeDF" v-if="order.status === 8">
              <button class="btngrey" @click="serviceVisible = true">联系客服</button>
            </div>
          </div>
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
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import tabs from './components/tabs';
  import goodsOld from './components/goodsold';

  export default {
    components: {
      tabs,
      goodsOld
    },
    data() {
      return {
        type: -1,
        orders: [],
        serviceVisible: false,
        isConform: false,
        orderId: ''
      };
    },
    computed: {
      ...mapGetters(['getOrderType'])
    },
    created() {
      this.getOrders();
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      getOrders() {
        this.ajax({
          name: 'getOrders'
        }).then(res => {
          this.orders = res;
          this.orders.forEach(item => {
            item.status = 8;
          });
          if(this.getOrderType != -1) {
            this.orders = this.orders.filter(order => {
              switch(this.getOrderType) {
                case 0: return order.status === 0; break;
                case 1: return order.status === 1; break;
                case 2: return [2, 3, 5, 6].includes(order.status); break;
                case 3: return [4, 7].includes(order.status); break;
                default: return true;
              };
            });
          }
        });
      },
      goDetail(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'tradeinorderdetail' });
      },
      typename(type) {
        let _typenames = ['待验货', '待付款', '新品待发货', '新品待收货', '已完成', '旧品待发货', '旧品待收货', '已取消', '已关闭'];
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
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    padding-top: 196px;
    .header {
      box-shadow: none;
    }
  }
  .order-warp {
    .bespeak-warp {
      position: absolute;
      left: 0;
      right: 0;
      top: 96px;
      bottom: 0;
      background: #fff;
    }
  }
  .txt-center {
    padding: 30px 0;
  }
  .order-list {
    .item {
      background: #ffffff;
      margin-top: 16px;
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

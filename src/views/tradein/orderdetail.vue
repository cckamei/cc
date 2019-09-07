<template>
  <div class="orderdetailpage pt">
    <v-header to="tradeinorderlist">订单详情</v-header>
    <!-- 订单地址、收货人、物流信息 -->
    <div class="content">
      <div class="logistics" @click="gotLogistics()">
        <div class="logisticsInfo" v-if="order.logistics.info.data.length === 0">
          <div class="logitem">
            <div>
              <img src="@/assets/mypage/icon_exp.png" alt="">
              <span class="logInfo">暂无物流信息</span>
            </div>
          </div>
          <div v-if="order.status === 11" class="order-status-notes">订单等待验货中</div>
          <div v-else-if="order.status === 0" class="order-status-notes">订单等待付款中</div>
          <div v-else-if="order.status === 12" class="order-status-notes">订单等待发货中</div>
          <div v-else-if="order.status === 13" class="order-status-notes">订单等待发货中</div>
          <div v-else-if="order.status === 7" class="order-status-notes">订单已关闭</div>
        </div>
        <div class="logisticsInfo" v-else>
          <div class="logitem">
            <div>
              <img src="@/assets/mypage/icon_exp.png" alt="">
              <span class="logInfo">{{order.logistics.info.data[0].context}}</span>
            </div>
            <img @click="gotLogistics()" class="rightarrow" src="@/assets/common/icon_right_arrow.png" alt="">
          </div>
          <p>{{order.logistics.info.data[0].time}}</p>
        </div>
        <!-- 收货地址 -->
        <div class="receiverInfo">
          <div>
            <img src="@/assets/mypage/icon_package.png" alt="">
            <span>收货人：{{order.address.name}}</span>
            <span class="phone">{{order.address.phone}}</span>
          </div>
          <p>收货地址：{{order.address.province+order.address.city+order.address.district+order.address.street}}</p>
        </div>
      </div>

      <!-- 旧品地址 -->
      <div class="logistics" v-if="order.status === 11">
        <div class="logisticsInfo">
          <div class="logitem">
            <div>
              <img src="@/assets/tradein/icon_add.png" alt="">
              <span class="oldlogInfo">请将旧品寄往此地址</span>
            </div>
          </div>
        </div>
        <div class="oldReceiverInfo">
          <p>
            <span>收货人：{{order.yh_address_info.name}}</span>
            <span class="phone">{{order.yh_address_info.tel}}</span>
          </p>
          <p>收货地址：{{order.yh_address_info.address}}</p>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="listitem">
        <div class="itemtitle">
          <div class="titleleft">
            <img src="@/assets/mypage/icon_shop.png" alt="">
            <span>以旧换新线上服务</span>
          </div>
          <div class="listright">{{typename(order.status)}}</div>
        </div>
        <goods-old :showTitle="true" :goods="order.old_goods" @click="goViewOld"></goods-old>
        <goods-new :goods="order.goods" v-if="[0, 12, 14, 3].includes(order.status) && order.goods.length"></goods-new>
        <div class="itemprice" v-if="[0, 12, 14, 3].includes(order.status) && order.goods.length">
          <ul>
            <li class="priceType">
              <span>补差价额</span>
              <span>￥{{order.all_money}}</span>
            </li>
            <li class="priceType">
              <span>运费</span>
              <span>+￥{{order.logistics_money}}</span>
            </li>
            <li class="priceType realPaymoney">
              <span>实付款</span>
              <span class="paymoney">￥{{order.rest_money}}</span>
            </li>
          </ul>
        </div>
        <div class="itemfoot">
          <!-- 待验货 -->
          <div class="ordertypeDF" v-if="order.status === 11">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btnpink" @click="$router.push({name: 'tradeindelivery', params: {orderId: order.logistics.old_id, brand: order.logistics.old_name}})">填写快递</button>
          </div>
          <!-- 待付款 -->
          <div class="ordertypeDF" v-if="order.status === 0">
            <button class="btngrey btnleft flexleft" @click="cancelOrder">取消换新</button>
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey btnleft" @click="goTradeinNew">选择新品</button>
            <button :class="order.goods.length ? 'btnpink' : 'disabled'" @click="order.goods.length && parOrder(order)">立即付款</button>
          </div>
          <!-- 新品待发货 -->
          <div class="ordertypeDF" v-if="order.status === 12">
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
          <!-- 新品待收货 -->
          <div class="ordertypeDS" v-if="order.status == 14">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btnpink" @click="isConform = true">确认收货</button>
          </div>
          <!-- 已完成 -->
          <div class="ordertypeDF" v-if="order.status === 3">
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
          <!-- 旧品待发货 -->
          <div class="ordertypeDF" v-if="order.status === 13">
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
          <!-- 旧品待收货 -->
          <div class="ordertypeDS" v-if="order.status === 15">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btnpink" @click="isConform = true">确认收货</button>
          </div>
          <!-- 已取消 -->
          <div class="ordertypeDF" v-if="order.status === 8">
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
          <!-- 已关闭 -->
          <div class="ordertypeDF" v-if="order.status === 7">
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderInfo">
        <ul class="orderInfoItem">
          <li><span>订单编号：</span> {{order.orderid}}</li>
          <li><span>下单时间：</span> {{formatDate(order.created_at,'yyyy-MM-dd hh:mm:ss')}}</li>
          <li v-if="order.status === 8"><span>取消时间：</span> {{formatDate(order.finish_at,'yyyy-MM-dd hh:mm:ss')}}</li>
        </ul>
        <ul class="orderInfoItem">
          <li><span>配送方式：</span> 快递运输</li>
        </ul>
        <!-- 支付方式 -->
        <ul class="orderInfoItem" v-if="[12, 14, 3].includes(order.status)">
          <li><span>支付方式：</span> 微信支付</li>
          <li><span>支付时间：</span> {{formatDate(order.pay_time)}}</li>
        </ul>
        <!-- 完成时间 -->
        <ul class="orderInfoItem" v-if="[3].includes(order.status)">
          <li><span>完成时间：</span> {{formatDate(order.finish_at)}}</li>
        </ul>
      </div>
    </div>
    <v-popup-confirm v-model="cancelVisible" @confirm="handleConfirm">
      <div class="text">确定取消此订单？</div>
    </v-popup-confirm>
    <v-popup-confirm v-model="isConform" @confirm="handleSConfirm">
      <div class="text">确定商品已被本人亲自签收了吗？</div>
    </v-popup-confirm>
    <v-popup-confirm title="" v-model="serviceVisible" @confirm="goCustomService">
      <div class="txt-center">
        即将离开商城，接通您的专属客服。<br>在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
    </v-popup-confirm>
  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import { formatDate } from '@/utils';
  import goodsOld from './components/goodsold.vue';
  import goodsNew from './components/goodsnew.vue';
  export default {
    components: {
      goodsOld,
      goodsNew
    },
    data() {
      return {
        cancelVisible: false,
        serviceVisible: false,
        isConform: false,
        order: {
          address: {},
          yh_address_info: {},
          goods: [],
          logistics: {
            info: {
              data: []
            }
          }
        }
      };
    },
    created() {
      this.getOrderDetail();
    },
    computed: {
      ...mapGetters(['getOrderId', 'getTradeinNew'])
    },
    methods: {
      ...mapMutations(['setCommon', 'setPayOrder', 'setOrderType', 'setAppointment', 'setTradeinNew', 'setTradeinViewOld']),
      ...mapActions(['ajax']),
      getOrderDetail() {
        this.ajax({
          name: 'getOrder',
          id: this.getOrderId
        }).then(res => {
          this.order = res;

          // this.order.status = 8;
          //0'待验货', 1'待付款', 2'新品待发货', 3'新品待收货', 4'已完成', 5'旧品待发货', 6'旧品待收货', 7'已取消', 8'已关闭'
          //0: 待付款, 1:'待发货', 2:'待收货', 3:'已完成', 4:'退款中', '', 6:'已退款', 7:'已关闭', 8:'已取消' 9:'定制中' 10:'待取货', 11:'待验货', 12:'新品待发货', 13:'旧品待发货', 14:'新品待收货', 15:'旧品待收货'

          if(!this.order.logistics.info || !this.order.logistics.info.data) {
            this.order.logistics.info = { data: [] };
          }
        });
      },
      typename(type) {
        let _typenames = ['待付款', '待发货', '待收货', '已完成', '退款中', '', '已退款', '已关闭', '已取消', '定制中', '待取货', '待验货', '新品待发货', '旧品待发货', '新品待收货', '旧品待收货'];
        return _typenames[type];
      },
      formatDate,
      gotLogistics() {
        this.$router.push({ name: 'logistics' });
      },
      cancelOrder() {
        this.cancelVisible = true;
      },
      // 确认签收
      handleSConfirm() {
        this.ajax({
          name: 'tradeinUpdateOrder',
          data: {
            action: 'affirm'
          },
          id: this.getOrderId
        }).then(res => {
          this.getOrderDetail();
        });
      },
      // 取消订单
      handleConfirm() {
        this.ajax({
          name: 'tradeinUpdateOrder',
          data: {
            action: 'cancel'
          },
          id: this.getOrderId
        }).then(res => {
          this.getOrderDetail();
        });
      },
      goCustomService() {
        window.wx.closeWindow();
      },
      // 立即付款
      parOrder(order) {
        this.setPayOrder(order);
        this.$router.replace({ name: 'pay', params: { isTradein: true } });
      },
      goTradeinNew() {
        const tradeinNew = this.order.goods.map(item => {
          let skuLabel = '';
          if(item.good_kind === '0') {
            skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.color};${item.guige}`;
          } else if(item.good_kind === '1') {
            skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.color};${item.guige}`;
          } else {
            skuLabel = `${item.s_jinleixing};${item.s_jinzhong};${item.guige}`;
          }
          return {
            skuId: item.sku_id,
            goods_title: item.goods_name,
            img: item.goods_img,
            price: item.goods_price,
            skuLabel
          };
        });

        this.setTradeinNew(tradeinNew);
        this.$router.push({ name: 'tradeinaddnew' });
      },
      goViewOld(val) {
        this.setTradeinViewOld(val);
        this.$router.push({ name: 'tradeinviewold' });
      }
    }
  };
</script>
<style lang="less" scoped>
  .txt-center {
    padding: 30px 0;
  }
  .text {
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 28px;
  }
  .orderdetailpage {
    background: #f0f0f0;
    overflow-y: scroll;
    .logistics {
      width: 710px;
      margin: 116px auto 16px;
      margin-top: 16px;
      padding: 0 30px;
      border-radius: 10px;
      background: #ffffff;
      font-size: 24px;
      .logitem {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        img {
          width: 36px;
          height: 36px;
        }
        > div {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
        }
        .rightarrow {
          width: 18px;
          height: 18px;
          margin-top: 30px;
        }
      }
      .logInfo {
        max-width: 500px;
      }
      .oldlogInfo {
        color: @color2;
      }
      img {
        display: inline;
        margin-right: 20px;
      }
      p {
        margin-left: 56px;
        margin-top: 10px;
        color: #333;
      }
    }
    .logisticsInfo {
      padding-top: 34px;
      span {
        color: #666666;
      }
      p {
        color: #999999;
      }
      .order-status-notes {
        padding-left: 55px;
        color: #999999;
      }
    }
    .receiverInfo {
      padding-bottom: 40px;
      margin-top: 60px;
      &.ziti {
        margin: 0;
        padding-top: 40px;
      }
      span {
        color: #666666;
        font-weight: bold;
        display: inline;
      }
      span.phone {
        margin-left: 100px;
      }
      p {
        color: #666;
      }
      img {
        width: 36px;
        height: 36px;
      }
    }
    .oldReceiverInfo {
      padding-bottom: 40px;
    }
    .listitem {
      background: #ffffff;
      margin-bottom: 16px;
      position: relative;
      z-index: 1;
      .itemtitle {
        padding: 0 30px;
        height: 64px;
        line-height: 64px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .titleleft {
          img {
            margin-right: 12px;
            width: 26px;
          }
        }
        .listright {
          font-size: 24px;
          color: @color4;
        }
      }
      .itemcontent {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 0 30px;
        background: #f5f5f5;
        vertical-align: middle;
        align-items: center;
        margin-bottom: 8px;
        .contentleft {
          flex-shrink: 0;
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
            color: #666666;
            font-size: 24px;
            span:nth-child-of(2) {
              text-align: right;
            }
          }
          .contentmessage {
            padding-top: 10px;
            flex: 1;
            font-size: 20px;
            color: #999999;
            .line2.flex {
              justify-content: space-between;
              .scope {
                padding-right: 20px;
              }
            }
            p {
              width: 360px;
            }
            .messageright {
              text-align: right;
            }
          }
        }
      }
      .itemprice {
        padding: 20px 30px 0;
        background: #ffffff;
        border-bottom: 2px solid #cccccc;
        margin-bottom: 16px;
        li {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          font-size: 20px;
          color: #666666;
          margin-bottom: 20px;
        }
        li.realPaymoney {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          .paymoney {
            color: @color2;
          }
        }
      }
      .itemfoot {
        height: 80px;
        text-align: right;
        padding: 0 30px;
        button {
          width: 140px;
          height: 52px;
          border-radius: 25px;
          font-size: 20px;
          margin-top: 5px;
        }
        .btnleft {
          margin-right: 30px;
        }
        .flexleft {
          float: left;
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
    .orderInfo {
      background: #ffffff;
      font-size: 24px;
      color: #666666;
      margin-bottom: 20px;
      .orderInfoItem {
        border-bottom: 2px solid #cccccc;
        &:last-child {
          border-bottom: 0;
        }
        padding: 30px 30px 0;
        li {
          padding-bottom: 20px;
        }
        li:last-child {
          padding-bottom: 30px;
        }
      }
      .giveMethod {
        padding: 30px;
        border-bottom: 2px solid #cccccc;
      }
      .paymethod {
        border-bottom: 2px solid #cccccc;
        padding: 30px 30px 0;
        li {
          margin-bottom: 20px;
        }
      }
      .finishtime {
        padding: 30px;
        border-bottom: 2px solid #cccccc;
      }
    }
  }
</style>


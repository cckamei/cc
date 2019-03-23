<template>
  <div class="orderdetailpage pt">
    <v-header :gocancel="getGoCancel">订单详情</v-header>
    <!-- 订单地址、收货人、物流信息 -->
    <div class="content">
      <div class="logistics" @click="gotLogistics()">
        <div class="logisticsInfo" v-if="order.logistics.info.data.length==0">
          <div class="logitem">
            <div>
              <img src="~assets/mypage/icon_exp.png" alt="">
              <span class="logInfo">暂无物流信息</span>
            </div>
          </div>
        </div>
        <div class="logisticsInfo" v-else>
          <div class="logitem">
            <div>
              <img src="~assets/mypage/icon_exp.png" alt="">
              <span class="logInfo">{{order.logistics.info.data[0].context}}</span>
            </div>
            <img @click="gotLogistics()" class="rightarrow" src="~assets/common/icon_right_arrow.png" alt="">
          </div>
          <p>{{order.logistics.info.data[0].time}}</p>
        </div>
        <!-- 收货地址 -->
        <div class="receiverInfo">
          <div>
            <img src="~assets/mypage/icon_package.png" alt="">
            <span>收货人：{{order.address.name}}</span>
            <span class="phone">{{order.address.phone}}</span>
          </div>
          <p>收货地址：{{order.address.province+order.address.city+order.address.district+order.address.street}}</p>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="listitem">
        <div class="itemtitle">
          <div class="titleleft">
            <img src="~assets/mypage/icon_shop.png" alt="">
            <span>{{appName}}</span>
          </div>
          <div class="listright">{{typename(order.status)}}</div>
        </div>
        <div class="itemcontent" v-for="(good,i) in order.goods" @click="goGoodsDetail(good.goods_id)">
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
        <div class="itemprice">
          <ul>
            <li class="priceType">
              <span>商品总额</span>
              <span>￥{{order.all_money}}</span>
            </li>
            <li class="priceType">
              <span>运费</span>
              <span>+￥{{order.logistics_money}}</span>
            </li>
            <!-- <li class="priceType">
              <span>运费险</span>
              <span>+￥{{order.discount_money}}</span>
            </li> -->
            <li class="priceType">
              <span>优惠券</span>
              <span>-￥{{order.discount_money}}</span>
            </li>
            <li class="priceType realPaymoney">
              <span>商品总额</span>
              <span class="paymoney">￥{{order.rest_money}}</span>
            </li>
          </ul>
        </div>
        <div class="itemfoot">
          <!-- 待收货 -->
          <div class="ordertypeDS" v-if="order.status==2">
            <button class="btngrey btnleft flexleft" @click="goApplyRefund()">申请退款</button>
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btnpink" @click="isConform = true">确认收货</button>
          </div>
          <!-- 待发货 -->
          <div class="ordertypeWC" v-if="order.status==1">
            <button class="btngrey btnleft flexleft" @click="goApplyRefund">申请退款</button>
            <button class="btngrey" @click="serviceVisible = true">联系客服</button>
          </div>
          <!-- 待付款 -->
          <div class="ordertypeDF" v-if="order.status==0">
            <button class="btngrey btnleft flexleft" @click="cancelOrder">取消订单</button>
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btnpink" @click="parOrder(order)">立即付款</button>
          </div>
          <!-- 已完成 -->
          <div class="ordertypeQX" v-if="order.status==3">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="tradeIn">以旧换新</button>
          </div>
          <!-- 退款中 -->
          <div class="ordertypeTK" v-if="order.status==4">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goRefundDetail">查看退款</button>
          </div>
          <!-- 已退款 -->
          <div class="ordertypeTK" v-if="order.status==6">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goRefundDetail">查看退款</button>
          </div>
          <div class="ordertypeTK" v-if="order.status==8">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goGoods">再次购买</button>
          </div>

        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderInfo">
        <ul class="orderInfoItem">
          <li><span>订单编号：</span> {{order.orderid}}</li>
          <li><span>下单时间：</span> {{formatDate(order.created_at,'yyyy-MM-dd hh:mm:ss')}}</li>
          <li v-if="order.status==8"><span>取消时间：</span> {{formatDate(order.finish_at,'yyyy-MM-dd hh:mm:ss')}}</li>
        </ul>
        <!-- 配送方式 -->
        <!-- <div class="giveMethod" v-if="order.status!=8">
          配送方式：快递运输
        </div> -->
        <ul class="orderInfoItem" v-if="order.status!=8">
          <li><span>配送方式：</span> 快递运输</li>
        </ul>
        <!-- 支付方式 -->
        <ul class="orderInfoItem" v-if="getOrderStat(order.status)">
          <li><span>支付方式：</span> 微信支付</li>
          <li><span>支付时间：</span> {{formatDate(order.pay_time)}}</li>
        </ul>
        <!-- 完成时间 -->
        <ul class="orderInfoItem" v-if="order.status==3||order.status==6">
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
        即将离开商城，接通您的专属客服。<br>您可以在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
    </v-popup-confirm>
  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import { formatDate } from '@/utils';
  export default {
    data() {
      return {
        cancelVisible: false,
        serviceVisible: false,
        isConform: false,
        order: {
          address: {},
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
      let orderId = this.getOrderId;
      this.getorderDetail(orderId);
    },
    computed: {
      ...mapGetters(['getOrderId']),
      getGoCancel: function() {
        if(this.order.status === 4 || this.order.status === 6 || this.order.status === 8) {
          return true;
        } else {
          return false;
        }
      },
      computed: {
        appName() {
          return window.htp.appName;
        }
      }
    },
    methods: {
      ...mapMutations(['setCommon', 'setPayOrder', 'setOrderType', 'setAppointment']),
      ...mapActions(['ajax']),
      getOrderStat(status) {
        if(status === 0) {
          return false;
        } else {
          if(status === 8) {
            return false;
          } else {
            return true;
          }
        }
      },
      getorderDetail(orderId) {
        this.ajax({
          name: 'getOrder',
          id: orderId
        }).then(res => {
          this.order = res;
          this.order.goods.forEach(item => {
            if(item.is_diamond) {
              item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.guige};${item.guige}`;
            } else {
              item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.guige};${item.guige}`;
            }
          });
          if(!this.order.logistics.info) {
            this.order.logistics = {
              info: {
                data: []
              }
            };
          }
        });
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
      goGoods() {
        this.$router.push({ name: 'goodslist' });
      },
      typename(type) {
        let _typenames = ['待付款', '待发货', '待收货', '已完成', '退款中', '', '已退款', '', '已取消'];
        return _typenames[type];
      },
      formatDate,
      gotLogistics() {
        this.$router.push({ name: 'logistics' });
      },
      goApplyRefund() {
        this.$router.push({ name: 'applyrefund' });
      },
      goRefundDetail() {
        this.$router.push({ name: 'refunddetail' });
      },
      cancelOrder() {
        this.cancelVisible = true;
      },
      handleSConfirm() {
        this.ajax({
          name: 'changeOrder',
          data: {
            order_id: this.getOrderId,
            action: 'affirm'
          }
        }).then(res => {
          this.setOrderType(3);
          this.$router.push({ name: 'orderlist' });
        });
      },
      handleConfirm() {
        this.ajax({
          name: 'changeOrder',
          data: {
            order_id: this.getOrderId,
            action: 'cancel'
          }
        }).then(res => {
          this.setOrderType(0);
          this.$router.push({ name: 'orderlist' });
        });
      },
      goCustomService() {
        window.wx.closeWindow();
      },
      //商品详情
      goGoodsDetail(id) {
        this.setCommon({ goodsId: id });
        this.$router.push({ name: 'goodsdetail' });
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
      img {
        display: inline;
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
      p {
        margin-left: 62px;
        margin-top: 10px;
      }
    }
    .logisticsInfo {
      padding-top: 34px;
      span {
        color: #666666;
        padding-top: 6px;
      }
      p {
        color: #999999;
      }
    }
    .receiverInfo {
      padding-bottom: 40px;
      margin-top: 60px;
      span {
        color: #666666;
        font-weight: bold;
        display: inline;
      }
      span.phone {
        margin-left: 100px;
      }
      p {
        color: #999999;
      }
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
            display: inline;
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
            margin: 30px 0 10px;
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
        padding: 30px 30px 0;
        li {
          margin-bottom: 20px;
        }
        li:last-child {
          margin-bottom: 30px;
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


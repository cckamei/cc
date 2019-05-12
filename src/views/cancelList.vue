<template>
  <div class="pt">
    <v-header :mypage="true">订单列表</v-header>
    <div class="content">
      <div class="listitem" v-for="(order,i) in orders" :key="i">
        <div class="itemtitle" @click="goDetail()">
          <div class="titleleft">
            <img src="@/assets/mypage/icon_shop.png" alt="">
            <span>{{htp.appName}}</span>
          </div>
          <div class="listright">{{order.status===4?'退款中':(order.status === 8?'已取消':'已退款')}}</div>
        </div>
        <div class="itemcontent" v-for="(good,j) in order.goods" :key="j" @click="goDetail(order.order_id)">
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
          共{{order.goods.length}}件商品 实付款： <span>￥{{order.rest_money}}</span> （含运费￥{{order.logistics_money}}）
        </div>
        <div class="itemfoot">
          <!-- 已取消 -->
          <div class="ordertypeQX" v-if="order.status === 8">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goGoodsDetail">再次购买</button>
          </div>
          <div class="ordertypeQX" v-if="order.status === 4">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
          </div>
          <div class="ordertypeQX" v-if="order.status === 6">
            <button class="btngrey btnleft" @click="serviceVisible = true">联系客服</button>
            <button class="btngrey" @click="goRefundDetail(order.order_id)">查看退款</button>
          </div>
        </div>
      </div>
    </div>
    <v-popup-confirm title="" v-model="serviceVisible" @confirm="goCustomService">
      <div class="txt-center">
        即将离开商城，接通您的专属客服。<br>您可以在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        orders: [],
        serviceVisible: false
      };
    },
    created() {
      this.getOrders();
    },
    computed: {
      appName() {
        return window.htp.appName;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      goCustomService() {
        window.wx.closeWindow();
      },
      getOrders() {
        this.ajax({
          name: 'getOrders'
        }).then(res => {
          this.orders = res;
          this.orders = this.orders.filter(order => {
            return order.status == 4 || order.status == 8 || order.status == 6;
          });
          this.orders.forEach(order => {
            order.goods.forEach(item => {
              if(item.is_diamond) {
                item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.guige};${item.guige}`;
              } else {
                item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.guige};${item.guige}`;
              }
            });
          });
        });
      },
      ...mapMutations(['setCommon']),
      goDetail(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'orderdetail' });
      },
      goGoodsDetail() {
        this.$router.push({ name: 'goodslist' });
      },
      goRefundDetail(orderId) {
        this.setCommon({ orderId: orderId });
        this.$router.push({ name: 'refunddetail' });
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~@/style/vars.less";
  .txt-center {
    padding: 30px 0;
  }
  .listitem {
    background: #ffffff;
    margin-bottom: 16px;
    .itemtitle {
      padding: 0 30px;
      height: 64px;
      line-height: 64px;
      margin-top: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .titleleft {
        img {
          display: inline;
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
      margin-bottom: 8px;
      vertical-align: middle;
      align-items: center;
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
    .itemprice {
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
    .itemfoot {
      height: 80px;
      text-align: right;
      padding: 0 30px;
      button {
        width: 140px;
        height: 52px;
        border-radius: 25px;
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
</style>


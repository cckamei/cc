<template>
  <div class="applyrefundPage">
    <v-header>退款详情</v-header>
    <div class="pagecontent">
      <ul class=" refunditem refundGoods">
        <li>
          <span>订单内容：</span>
          <p>
            <i v-for="(good,i) in order.goods" :key="i">{{good.goods_name}}<span>共{{good.goods_count}}件</span></i><br>
          </p>
        </li>
        <li>
          <span>下单时间</span>
          <p>{{formatDate(order.created_at,'yyyy-MM-dd hh:mm:ss')}}</p>
        </li>
        <li>
          <span>总金额：</span>
          <p>{{order.all_money}}元</p>
        </li>
      </ul>
      <div class="refunditem refundline" v-if="order.is_rejected==false">
        <div class="line" v-if="order.status==4">
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==2}"></i>
          <s :class="{active: lines==3}"></s>
          <i :class="{active: lines==2}"></i>
          <s :class="{active: lines==3}"></s>
        </div>
        <div class="line" v-if="order.status==5">
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==1}"></i>
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==2}"></i>
          <s :class="{active: lines==3}"></s>
        </div>
        <div class="line" v-if="order.status==6">
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==1}"></i>
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==1}"></i>
          <s :class="{active: lines==1}"></s>
        </div>
        <ul class="lintext">
          <li>
            <p :class="{active: lines==1}">发起退款</p>
          </li>
          <li>
            <p :class="{active: lines==1}">审核通过</p>
          </li>
          <li>
            <p :class="{active: lines==1}">退款成功</p>
          </li>
        </ul>
      </div>
      <div class="refunditem refundline" v-else>
        <div class="line">
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==1}"></i>
          <s :class="{active: lines==1}"></s>
          <i :class="{active: lines==2}"></i>
          <s :class="{active: lines==3}"></s>
        </div>
        <ul class="lintext">
          <li>
            <p :class="{active: lines==1}">发起退款</p>
          </li>
          <li>
            <p :class="{active: lines==1}">审核不通过</p>
          </li>
          <li>
            <p :class="{active: lines==1}">退款成功</p>
          </li>
        </ul>
      </div>
      <div class="refunditem applyreason">
        <div class="reasonchoice">
          <span>申请原因</span>
          <h2>{{reasonlist[Number.parseInt(order.refund_info.choice)]}}</h2>
        </div>
        <p>如需退货请注意保持商品的完好，建议您先与买家沟通</p>
        <h1>问题描述</h1>
        <div class="reasontext">
          {{order.refund_info.desc}}
        </div>
      </div>
      <div class="refunditem">
        <ul class="refundMessage">
          <li>
            <label>联系人</label>
            <p>{{order.refund_info.name}}</p>
          </li>
          <li>
            <label>联系人电话</label>
            <p>{{order.refund_info.phone}}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import { formatDate } from '@/utils';
  export default {
    data() {
      return {
        lines: 1,
        order: {
          refund_info: {}
        },
        reasonlist: ['拍错货/产品规格选错/数量填错', '联系信息填错/地址填错', '发错货/发漏货', '产品发生损坏/有质量问题', '不喜欢/不想要']
      };
    },
    created() {
      let orderId = this.getOrderId;
      this.ajax({
        name: 'getOrder',
        id: orderId
      }).then(res => {
        this.order = res;
      });
    },
    computed: {
      ...mapGetters(['getOrderId'])

    },
    methods: {
      ...mapActions(['ajax']),
      formatDate
    }
  };
</script>
<style lang="less" scoped>
  @import "~@/style/vars.less";
  .applyrefundPage {
    overflow-y: auto;
    .pagecontent {
      padding: 0 20px 30px;
    }
    .refunditem {
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 16px;
    }
    .refundGoods {
      margin-top: 96px;
      padding: 40px 20px;
      li {
        padding: 0 20px;
        display: flex;
        flex-flow: row nowrap;
        font-size: 24px;
        color: #666666;
        margin-bottom: 20px;
        span {
          width: 120px;
        }
        p {
          width: 500px;
          span {
            display: inline;
            margin-left: 10px;
          }
        }
      }
      li:last-child {
        padding: 0 20px;
        display: flex;
        flex-flow: row nowrap;
        font-size: 30px;
        color: #333333;
        margin-bottom: 20px;
      }
    }
    .applyreason {
      padding: 40px 20px 30px;
      .reasonchoice {
        font-size: 24px;
        color: #666666;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        h2 {
          text-align: right;
          color: #999999;
          border: none;
          font-weight: normal;
        }
      }
      p {
        margin-top: 20px;
        color: @color4;
        font-size: 20px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 30px;
      }
      h1 {
        font-size: 24px;
        color: #666666;
        margin: 30px 0;
        font-weight: normal;
      }
      .reasontext {
        background: #f5f5f5;
        border-radius: 10px;
        height: 240px;
        padding: 30px;
        font-size: 24px;
        color: #999999;
      }
    }
    .refundMessage {
      padding: 10px 20px;
      border-radius: 10px;
      li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        height: 84px;
        line-height: 84px;
        border-bottom: 2px solid #f0f0f0;
        label {
          color: #666666;
        }
        p {
          width: 300px;
          height: 100%;
          text-align: right;
          color: #999999;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .refundline {
      padding: 54px 0 40px;
      .line {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-left: 108px;
        s {
          width: 20px;
          height: 20px;
          background: #dcdcdc;
          border-radius: 50%;
        }
        s.active {
          background: @color1;
        }
        i {
          width: 217px;
          height: 4px;
          background: #dcdcdc;
        }
        i.active {
          background: @color1;
        }
      }
      .lintext {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-top: 30px;
        margin-left: 10px;
        text-align: center;
        li {
          flex: 1;
        }
        p {
          font-size: 24px;
          color: #999999;
          margin-bottom: 12px;
        }
        p.active {
          color: #666666;
        }
        span {
          font-size: 20px;
          color: #999999;
        }
      }
    }
  }
</style>


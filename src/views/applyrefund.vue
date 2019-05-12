<template>
  <div class="applyrefundPage">
    <v-header :godetail="true">申请退款</v-header>
    <div class="content">
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
      <div class="refunditem refundline" v-if="order.is_rejected">
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
          <p class="reasion">
            <input type="text" v-model="reqData.reason" placeholder="请选择申请原因" @click="visible = true" readonly />
            <img src="@/assets/mypage/icon_arrow_r_s.png" alt="">
          </p>

          <v-slide-up v-model="visible" title="选择申请原因" @confirm="confirm" :isConfirm="selectedIndex !== -1">
            <v-input-radio v-model="selectedIndex" :list="reasonlist"></v-input-radio>
          </v-slide-up>
        </div>
        <p>如需退货请注意保持商品的完好，建议您先与买家沟通</p>
        <h1>问题描述</h1>
        <textarea placeholder="请描述申请退款的详细信息，不超过500字（选填）" v-model="reqData.desc"></textarea>
      </div>
      <div class="refunditem">
        <ul class="refundMessage">
          <li>
            <label>联系人</label>
            <input type="text" v-model="reqData.linkman" maxlength="6" placeholder="请填写退款联系人姓名" />
          </li>
          <li>
            <label>联系人电话</label>
            <input type="tel" v-model="reqData.linkphone" maxlength="11" placeholder="请填写联系人手机号" />
          </li>
        </ul>
      </div>
      <div class="btns fix">
        <button class="btn" :class="{active: isActive}" @click="submit">{{order.is_rejected?'重新提交':'确认提交'}}</button>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import { formatDate } from '@/utils';
  export default {
    data() {
      return {
        selectedIndex: -1,
        visible: false,
        lines: 1,
        order: {},
        reasonlist: ['拍错货/产品规格选错/数量填错', '联系信息填错/地址填错', '发错货/发漏货', '产品发生损坏/有质量问题', '不喜欢/不想要'],
        reqData: {
          reason: '',
          linkman: '',
          linkphone: '',
          desc: ''
        }
      };
    },
    created() {
      let orderId = this.getOrderId;
      this.setCommon({ orderId: this.getOrderId });
      this.ajax({
        name: 'getOrder',
        id: orderId
      }).then(res => {
        this.order = res;
        if(this.order.is_rejected) {
          this.reqData.reason = this.reasonlist[Number.parseInt(this.order.refund_info.choice)];
          this.reqData.linkman = this.order.refund_info.name;
          this.reqData.linkphone = this.order.refund_info.phone;
          this.reqData.desc = this.order.refund_info.desc;
        }
      });
    },
    computed: {
      ...mapGetters(['getOrderId']),
      isActive() {
        return this.reqData.linkman && this.reqData.linkphone && this.reqData.reason;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      formatDate,
      confirm() {
        let selected = this.reasonlist[this.selectedIndex];
        this.reqData.reason = typeof selected === 'string' ? selected : selected[this.keyName];
        this.$emit('input', this.selectedIndex);
      },
      submit() {
        this.ajax({
          name: 'changeOrder',
          data: {
            order_id: this.getOrderId,
            action: 'refund',
            choice: this.selectedIndex,
            name: this.reqData.linkman,
            desc: this.reqData.desc,
            phone: this.reqData.linkphone
          }
        }).then(res => {
          this.setCommon({ orderId: this.getOrderId });
          this.$router.push({ name: 'orderdetail' });
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~@/style/vars.less";
  .applyrefundPage {
    .content {
      padding: 0 20px;
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
      padding: 0 20px 30px;
      .reasonchoice {
        font-size: 24px;
        color: #666666;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #f0f0f0;
        p {
          text-align: right;
        }
        img {
          width: 18px;
          height: 18px;
          margin-left: 15px;
        }
        input {
          text-align: right;
          width: 300px;
          color: #999999;
        }
      }
      p {
        margin-top: 20px;
        color: @color4;
        font-size: 20px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 30px;
      }
      p.reasion {
        border-bottom: 0;
      }
      h1 {
        font-size: 24px;
        color: #666666;
        margin: 30px 0;
        font-weight: normal;
      }
      textarea {
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
        input {
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
          background: @color5;
        }
        i {
          width: 217px;
          height: 4px;
          background: #dcdcdc;
        }
        i.active {
          background: @color5;
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


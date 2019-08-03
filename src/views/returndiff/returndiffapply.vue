<template>
  <div class="returndiffapply pt">
    <v-header>申请退差价</v-header>
    <div class="content">
      <ul>
        <li>
          <v-form-input v-model="reqData.bankcard" label="收款账户" placeholder="请填写收款账户银行卡号"></v-form-input>
        </li>
        <li>
          <v-form-input v-model="reqData.name" label="收款户名" placeholder="请填写收款账户户名"></v-form-input>
        </li>
        <li>
          <v-form-input v-model="reqData.bank" label="收款银行" placeholder="请填写收款银行名称"></v-form-input>
        </li>
        <li>
          <v-form-input v-model="reqData.bank_child" label="收款银行支行" placeholder="请填写收款支行名称"></v-form-input>
        </li>
        <li class="address">
          <v-form-input v-model="address" :arrow="true" label="收款银行地区" placeholder="请选择收款银行地区" @input-click="$refs.address.open()"></v-form-input>
        </li>
      </ul>
      <ul>
        <li>
          <v-form-input v-model="reqData.return_amount" type="number" label="申请退差价金额" placeholder="请填写约定的退差价金额"></v-form-input>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">完成</button>
      </div>
    </div>
    <v-address ref="address" @confirm="handleAddressConfirm"></v-address>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    beforeRouteEnter(to, from, next) {
      if(from.name === 'returndiffstatus') {
        next(vm => {
          vm.$router.go(-1);
        });
      } else {
        next();
      }
    },
    data() {
      return {
        address: '',
        reqData: {
          order_id: '',
          name: '',
          bankcard: '',
          bank: '',
          bank_child: '',
          receivables_province: '',
          receivables_city: '',
          return_amount: ''
        }
      };
    },
    computed: {
      ...mapGetters(['getOrderId']),
      isActive() {
        return this.reqData.name.length && this.reqData.bankcard.length && this.reqData.bank.length && this.reqData.bank_child.length && this.reqData.receivables_province.length && this.reqData.return_amount.length;
      }
    },
    created() {
      this.reqData.order_id = this.getOrderId;
    },
    methods: {
      ...mapActions(['ajax']),
      handleAddressConfirm({ province, city, district }) {
        this.reqData.receivables_province = province;
        this.reqData.receivables_city = city;
        this.address = `${province} ${city} ${district}`;
      },
      handleConfirm(val) {
        this.ajax({
          name: 'returnMoney',
          data: this.reqData
        }).then(() => {
          this.$router.push({ name: 'returndiffstatus' });
        });
      }
    }
  };
</script>


<style lang="less" scoped>
  .content {
    padding: 0 20px;
  }

  ul {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  }

  li {
    border-bottom: 1px solid #f0f0f0; /*no*/
    padding: 30px 0;
    color: #666;
    &:last-child {
      border-bottom: none;
    }
    .row {
      padding-bottom: 15px;
      &:last-child {
        padding-bottom: 0;
      }
      .label {
        width: 150px;
      }
    }
  }

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

<style lang="less">
  .returndiffapply {
    li {
      > .flex {
        padding: 0;
        .label {
          color: #666;
        }
      }
      &.address .arrow {
        padding-right: 20px;
      }
    }
  }
</style>



<template>
  <div class="pt pb invoice">
    <v-header class="header">开票信息</v-header>
    <div class="content">
      <ul class="invoice-content">
        <li>
          <div class="title">发票抬头</div>
          <v-button-radio className="fixwidth" v-model="reqData.invoiceType" :list="['个人', '单位']"></v-button-radio>
          <div v-if="reqData.invoiceType === 0" class="input-wrapper flex">
            <input v-model="reqData.ticketName" placeholder="购票人姓名"></input>
          </div>
          <template v-else>
            <div class="input-wrapper flex">
              <input v-model="reqData.ticketCompanyName" placeholder="购票单位名称"></input>
            </div>
            <div class="input-wrapper flex">
              <input v-model="reqData.ticketId" placeholder="纳税人识别编号"></input>
            </div>
          </template>
        </li>
        <li>
          <div class="title">收票人信息</div>
          <div class="input-wrapper flex">
            <input v-model="reqData.invoiceName" placeholder="收票人姓名"></input>
          </div>
          <div class="input-wrapper flex">
            <input type="tel" v-model="reqData.invoicePhone" placeholder="收票人手机号码">
          </div>
        </li>
        <li>
          <div class="title">收票地址是否同收货地址</div>
          <v-button-radio className="fixwidth" v-model="reqData.isSameAddress" :list="['是', '否']"></v-button-radio>
        </li>
        <li>
          <template v-if="reqData.address">
            <div class="title">收票地址</div>
            <div class="input-wrapper flex arrow" @click="selectAddress">
              <input v-model="reqData.address" readonly placeholder="收票人姓名"></input>
            </div>
          </template>
          <v-form-input class="address" v-else v-model="reqData.address" label="收票地址" placeholder="进入地址列表选择" :arrow="true" @input-click="selectAddress"></v-form-input>
          <div v-if="reqData.isSameAddress === 0 && reqData.address" class="input-wrapper flex">
            <input type="number" v-model="reqData.postalCode" placeholder="请填写邮编" />
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      return {
        reqData: {
          invoiceType: 0,
          isSameAddress: 0,
          ticketName: '',
          invoiceName: '',
          invoicePhone: '',
          postalCode: '',
          address: '',
          ticketCompanyName: '',
          ticketId: ''
        }
      };
    },
    computed: {
      ...mapState(['invoice']),
      isActive() {
        const {
          invoiceType,
          isSameAddress,
          ticketName,
          invoiceName,
          invoicePhone,
          postalCode,
          address,
          ticketCompanyName,
          ticketId
        } = this.reqData;

        if(invoiceType === 0) {
          if(!ticketName.length) {
            return false;
          }
        } else {
          if(!ticketCompanyName.length || !ticketId.length) {
            return false;
          }
        }

        if(isSameAddress === 0) {
          if(!postalCode.length) {
            return false;
          }
        }

        if(!address.length || !invoiceName.length || !invoicePhone) {
          return false;
        }

        return true;
      }
    },
    created() {
      this.reqData = { ...this.reqData, ...this.invoice };
    },
    methods: {
      ...mapMutations(['setInvoice']),
      selectAddress() {
        this.setInvoice(this.reqData);
        this.$router.push({ name: 'myaddress' });
      },
      handleConfirm() {
        this.setInvoice({ ...this.reqData, use: '已填写' });
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    background-color: #fff;
  }

  .invoice-content {
    padding: 0 24px;
    overflow: auto;
    height: 100%;
    li {
      padding: 40px 16px 20px 16px;
      .title {
        font-size: 24px;
        color: #666;
      }
      .input-wrapper {
        border-bottom: 1px solid #f0f0f0; /*no*/
        // margin-top: 20px;
        height: 84px;
        input {
          color: #999;
        }
      }
    }
  }

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }
</style>

<style lang="less">
  .invoice {
    .fixwidth {
      min-width: 200px;
    }
    .address {
      padding-left: 0;
      .label {
        color: #666;
      }
    }
  }
</style>


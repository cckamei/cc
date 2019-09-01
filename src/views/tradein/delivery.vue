<template>
  <div class="pt delivery">
    <v-header>填写快递</v-header>
    <div class="content">
      <div class="row">
        <v-form-input v-model="brand" label="快递品牌" placeholder="请填写快递品牌"></v-form-input>
      </div>
      <div class="row">
        <v-form-input v-model="orderId" label="快递单号" placeholder="请填写快递单号"></v-form-input>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        brand: '',
        orderId: ''
      };
    },
    computed: {
      ...mapGetters(['getOrderId']),
      isActive() {
        return this.brand.length && this.orderId.length;
      }
    },
    created() {
      const { brand, orderId } = this.$route.params;
      this.brand = brand || '';
      this.orderId = orderId || '';
    },
    methods: {
      ...mapActions(['ajax']),
      handleConfirm() {
        this.ajax({
          name: 'tradeinUpdateOrder',
          data: {
            action: 'send',
            logistic_num: this.orderId,
            logistic_name: this.brand
          },
          id: this.getOrderId
        }).then(() => {
          this.$router.go(-1);
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .delivery {
    background-color: #f0f0f0;
    .row {
      height: 84px;
      background-color: #fff;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 6px;
    }
    .footer {
      height: 96px;
      background-color: #fff;
      .btns {
        padding: 14px 20px;
      }
    }
  }
</style>

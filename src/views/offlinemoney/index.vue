<template>
  <div class="pt pb">
    <v-header>线下补款</v-header>
    <div class="content">
      <div class="input-wrpper">
        <input type="text" v-model="guaranteeNumber" placeholder="请填写保证单号">
      </div>
      </div>
      <div class="footer">
        <div class="btns">
          <button class="btn" :class="{active: guaranteeNumber.length}" @click="guaranteeNumber.length && handleConfirm()">校验</button>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        guaranteeNumber: ''
      };
    },
    methods: {
      ...mapActions(['ajax']),
      handleConfirm() {
        this.ajax({
          name: 'omGetPrice',
          data: {
            bzd_id: this.guaranteeNumber
          }
        }).then(res => {
          if(res.msg) {
            this.toast(res.msg);
          } else {
            this.$router.push({ name: 'offlinemoneypay', params: { ...res } });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    background-color: #fff;
  }
  .input-wrpper {
    position: absolute;
    left: 24px;
    right: 24px;
    border-bottom: 1px solid #f0f0f0; /*no*/
    height: 96px;
    line-height: 96px;
    top: 50%;
    margin-top: -48px;
    text-align: center;
    input {
      width: 100%;
      text-align: center;
      font-size: 30px;
      color: #666;
    }
  }
  .footer {
    height: 96px;
    background-color: #fff;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

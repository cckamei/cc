<template>
  <div class="pt">
    <v-header>补款</v-header>
    <div class="content">
      <div class="input-wrpper">
        <input type="text" v-model="guaranteeNumber" placeholder="请填写保证单号" />
      </div>
        <div class="check-btn btns">
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
    top: 360px;
    left: 24px;
    right: 24px;
    border-bottom: 1px solid #f0f0f0; /*no*/
    height: 96px;
    line-height: 96px;
    text-align: center;
    input {
      width: 100%;
      text-align: center;
      font-size: 30px;
      color: #666;
    }
  }
  .check-btn {
    position: absolute;
    top: 622px;
    width: 100%;
  }
  .footer {
    height: 96px;
    background-color: #fff;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

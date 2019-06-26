<template>
  <div class="pt">
    <v-header>验证手机</v-header>
    <div class="content">
      <ul class="form">
        <li>
          <v-input-text placeholder="请输入手机号码" type="tel" v-model="account" clear maxlength="16" class="input"></v-input-text>
        </li>
        <li>
          <v-input-code :phone="account" placeholder="请输入验证码" v-model="code" maxlength="16" class="input" action="bind"></v-input-code>
        </li>
      </ul>
      <v-agreement v-model="checked"></v-agreement>
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && next()">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        account: '',
        code: '',
        checked: false
      };
    },
    computed: {
      isActive() {
        return this.account.length && this.code.length && this.checked;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      next() {
        this.ajax({
          name: 'wxBindPhone',
          data: {
            vcode: this.code,
            phone: this.account
          }
        }).then(res => {
          this.$router.push({ name: 'perfectinfo' });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .form {
    padding: 0 20px;
    background-color: #fff;
    li {
      border-bottom: 1px solid #f0f0f0; /*no*/
      padding: 0 20px;
      height: 96px;
      .input {
        height: 100%;
      }
    }
  }

  .btns {
    padding: 36px 40px;
  }
</style>

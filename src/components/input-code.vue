<template>
  <div class="flex">
    <input :maxlength="maxlength" type="tel" v-model="code" :placeholder="placeholder" />
    <button class="btn" :class="{active: !sending}" @click="!sending && sendAuthCode()">{{text}}</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { checkPhone } from '../utils';

  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      placeholder: {
        type: String
      },
      maxlength: {
        type: [Number, String],
        default: 100
      },
      clear: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        code: '',
        text: '获取验证码',
        sending: false
      };
    },
    watch: {
      code(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      ...mapActions(['ajax']),
      sendAuthCode() {
        if(!this.phone.length) {
          this.toast('手机号码不能为空');
          return false;
        }

        if(!checkPhone(this.phone)) {
          this.toast('手机号格式不正确');
          return false;
        }

        this.ajax({
          name: 'authCode',
          data: {
            action: this.action,
            phone: this.phone
          }
        }).then(res => {
          this.sending = true;
          this.text = 59;
          let i = 0;
          let t = setInterval(() => {
            i++;
            this.text = 59 - i;
            if(i == 59) {
              this.text = '重新获取';
              this.sending = false;
              clearInterval(t);
            }
          }, 1000);
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .flex {
    width: 100%;
    input {
      width: 100%;
      padding: 0 10px;
      font-size: 32px;
      color: #333;
    }
    .btn {
      flex-shrink: 0;
      color: #fff;
      font-size: 24px;
      border-radius: 27px;
      width: 180px;
      height: 54px;
      line-height: 54px;
      background-color: #ccc;
      border: 0;
      &.active {
        background-color: @color6;
      }
    }
  }
</style>



<template>
  <div class="agreement flex" @click="checked = !checked">
    <div class="checkbox" :class="{active: checked}"></div>
    <span class="label">我已阅读并同意</span><span class="protocol" @click="$router.push({name: 'agreement'})">  《用户注册和使用协议》</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false
      };
    },
    watch: {
      checked(val) {
        this.$emit('input', val);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .agreement {
    font-size: 24px;
    padding: 36px 40px;
    .checkbox {
      width: 35px;
      height: 35px;
      background: url("~assets/home/button_a_g.png");
      background-size: 100% 100%;
      margin-right: 20px;
      &.active {
        background: url("~assets/home/button_a.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .label {
      color: #666;
    }
    .protocol {
      color: @color2;
      font-weight: bold;
    }
  }
</style>


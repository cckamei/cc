<template>
  <div class="pt">
    <v-header>注册成功</v-header>
    <div class="content">
      <div class="info">
        <img src="~assets/home/icon_ok_b.png" alt="">
        <p>将在 {{time}} 秒后自动回到首页</p>
      </div>
      <div class="btns">
        <button class="btn" @click="go">回到首页</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        time: 3
      };
    },
    mounted() {
      let t = setInterval(() => {
        this.time--;
        if(!this.time) {
          clearInterval(t);
          this.go();
        }
      }, 1000);
    },
    methods: {
      ...mapActions(['ajax']),
      go() {
        this.$router.push({ name: 'index' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .content {
    background-color: #fff;
  }

  .info {
    text-align: center;
    padding: 100px 0 40px 0;
    img {
      width: 180px;
      height: 180px;
      margin-bottom: 40px;
    }
  }

  .btns {
    text-align: center;
    .btn {
      font-size: 24px;
      height: 68px;
      width: 540px;
      border: 1px solid @color2; /*no*/
      background-color: #fff;
      color: @color2;
    }
  }
</style>

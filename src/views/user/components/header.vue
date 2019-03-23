<template>
  <div class="mymessage">
    <img class="head" :src="userInfo.avatar" alt="">
    <div class="usermessage">
      <h2>{{userInfo.nick_name == null?'新用户':userInfo.nick_name}}</h2>
      <span class="card">VIP卡号：{{userInfo.vip_code}}</span><br>
      <span>积分：{{userInfo.score || 0}}</span>
    </div>
    <img class="userset" src="~assets/mypage/set-icon.png" alt="" @click="$router.push({ name: 'myset' })">
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';

  export default {
    data() {
      return {
        userInfo: {}
      };
    },
    created() {
      this.pageInit();
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(["setUserInfo"]),
      pageInit() {
        this.ajax({
          name: 'getUserInfo'
        }).then(res => {
          let userInfo = res;
          this.userInfo = res;
          this.setUserInfo(userInfo);
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .mymessage {
    width: 100%;
    height: 280px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    background: url("~assets/mypage/bg-img.png") no-repeat;
    background-size: 100% 100%;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 40px 30px 0px 40px;
    }
    .head {
      margin-top: 60px;
    }
    .usermessage {
      color: #ffffff;
      h2 {
        font-size: 30px;
        margin: 60px 0 10px 0;
      }
      span {
        font-size: 20pxm;
        padding: 14px 0;
      }
    }
    .userset {
      position: absolute;
      top: 40px;
      right: 50px;
      width: 70px;
      height: 70px;
    }
  }
</style>

<template>
  <div class="buttons flex">
    <div class="btn home" :class="{active: $route.name === 'index'}" @click="$router.push({name:'index'})"></div>
    <button class="btn-txt btn-txt1" @click="goGoodsList()">全部作品</button>
    <button class="btn-txt btn-txt2" :class="{active: $route.name === 'freebuy'}" @click="$router.push({name:'freebuy'})">无忧购</button>
    <div class="btn mine" @click="goMypage()"><img :src="getUserInfo.avatar" alt=""></div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['token', 'getUserInfo'])
    },
    methods: {
      ...mapMutations(['setCommon']),
      goGoodsList(goodsType = '') {
        this.setCommon({ goodsType });
        this.$router.push({ name: 'goodslist' });
      },
      goMypage() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { page: 'index' } });
          return false;
        }
        this.$router.push({ name: 'mypage' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .buttons {
    position: absolute;
    width: 100%;
    bottom: 0;
    justify-content: center;
    padding: 24px 0;
    .btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      &.home {
        background: url("~@/assets/home/button_home_b.png");
        background-size: 100%;
        &.active {
          background: url("~@/assets/home/button_home.png");
          background-size: 100%;
        }
      }
      &.mine {
        background: url("~@/assets/common/icon_avatar.png");
        background-size: 100%;
      }
    }
    .btn-txt {
      width: 160px;
      height: 60px;
      border: 0;
      color: #333;
      background-color: #fff;
      &1 {
        margin: 0 24px 0 91px;
      }
      &2 {
        margin: 0 91px 0 24px;
        &.active {
          background-color: #484848;
          color: #fff;
        }
      }
    }
  }
</style>

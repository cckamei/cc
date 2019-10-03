<template>
  <div class="freebuy">
    <div class="content">
      <div class="appointment" @click="goTradein">
        <img src="http://img.cc-jewel.com/wyg_huanxin.png" alt="" srcset="">
      </div>
      <div class="appointment" @click="$router.push({'name':'bespeak'})">
        <img :src="getUserInfo._YUYUE" alt="" srcset="">
      </div>
      <div class="appointment" @click="goPage">
        <img :src="getUserInfo.fenqi" alt="" srcset="">
      </div>
      <!-- getUserInfo.yjhx TODO -->
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    methods: {
      ...mapMutations(['setTradeinOld']),
      goPage() {
        window.location.href = 'https://mp.weixin.qq.com/s/14P5TU2BtwRwEwyLKI1H1A';
      },
      goTradein() {
        this.setTradeinOld([]);
        this.$router.push({ name: 'tradeinconfirmold' });
      }
    }
  };
</script>


<style lang="less" scoped>
  .freebuy {
    .appointment {
      margin: 20px;
    }
    .instalments {
      margin: 0 20px 20px 20px;
    }
    .instalments,
    .appointment {
      img {
        width: 100%;
        height: 300px;
        display: block;
      }
    }
  }
</style>

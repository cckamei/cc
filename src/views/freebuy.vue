<template>
  <div class="freebuy">
    <div class="appointment" @click="$router.push({'name':'bespeak'})">
      <img :src="getUserInfo._YUYUE" alt="" srcset="">
    </div>
    <div class="instalments" @click="goPage">
      <img :src="getUserInfo.fenqi" alt="" srcset="">
    </div>
    <button @click="$router.push({name: 'tradeinconfirmold'})">以旧换新</button>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    methods: {
      goPage() {
        window.location.href = 'https://mp.weixin.qq.com/s/14P5TU2BtwRwEwyLKI1H1A';
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
        height: 100%;
      }
    }
  }
</style>

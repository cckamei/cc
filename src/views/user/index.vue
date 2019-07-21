<template>
  <div class="mypage pb">
    <div class="content">
      <user-header></user-header>
      <user-tabs></user-tabs>
      <order-menu></order-menu>
      <commission v-if="getUserInfo.is_distributor"></commission>
      <card />
      <div class="panel-header" @click="$router.push({ name: 'wechatgroup'})">
        <span>会员微群</span>
        <div class="more">
          <span>查看微群信息</span>
          <img src="@/assets/mypage/icon_arrow_r_s.png" alt="">
        </div>
      </div>
    </div>
    <div class="footer">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import userHeader from './components/header';
  import userTabs from './components/usertabs';
  import orderMenu from './components/ordermenu';
  import commission from './components/commission';
  import mixin from './components/mixin';
  import card from './components/card';

  export default {
    components: {
      userHeader,
      userTabs,
      orderMenu,
      commission,
      card
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    mixins: [mixin],
    created() {
      this.setOrderType(-1);
    },
    methods: {
      ...mapMutations(['setOrderType'])
    }
  };
</script>
<style lang="less" scoped>
  .mypage {
    background: #f0f0f0;
    .panel-header {
      margin: 20px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
</style>

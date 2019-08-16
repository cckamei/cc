<template>
  <div class="mypage pb">
    <div class="content">
      <user-header></user-header>
      <user-tabs></user-tabs>
      <order-menu></order-menu>
      <!-- <commission v-if="getUserInfo.is_distributor"></commission> -->
      <card />
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
  }
</style>

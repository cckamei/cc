<template>
  <div class="order pt">
    <v-header :mypage="true">订单列表</v-header>
    <div class="content">
      <div class="order-warp">
        <tabs :type="getOrderType" @search-orders="searchOrders"></tabs>
        <order-list :orders="orders" @reload-orders="reloadOrders"></order-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import tabs from './components/tabs';
  import orderList from './components/orders';
  export default {
    components: {
      tabs,
      orderList
    },
    data() {
      return {
        type: -1,
        orders: []
      };
    },
    computed: {
      ...mapGetters(['getOrderType'])
    },
    created() {

      this.getOrders();
    },
    methods: {
      ...mapActions(['ajax']),
      searchOrders() {
        this.getOrders();
      },
      reloadOrders() {
        this.getOrders();
      },
      getOrders() {
        this.ajax({
          name: 'getOrders'
        }).then(res => {
          this.orders = res;
          if(this.getOrderType != -1) {
            this.orders = this.orders.filter(order => {
              return order.status == this.getOrderType;
            });
          }
          this.orders.forEach(order => {
            order.goods.forEach(item => {
              if(item.good_kind === '0') {
                item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.color};${item.guige}`;
              } else if(item.good_kind === '1') {
                item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.color};${item.guige}`;
              } else {
                item.skuLabel = `${item.s_jinleixing};${item.s_jinzhong};${item.guige}`;
              }
            });
          });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .order {
    .header {
      box-shadow: 0 0 0 0 rgba(170, 170, 170, 0.5) !important;
    }
  }
  .order-warp {
    .bespeak-warp {
      position: absolute;
      left: 0;
      right: 0;
      top: 96px;
      bottom: 0;
      background: #fff;
    }
  }
</style>

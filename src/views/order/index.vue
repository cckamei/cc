<template>
  <div class="order pt">
    <v-header>订单列表</v-header>
    <tabs :type="getOrderType" @search-orders="searchOrders"></tabs>
    <div class="content">
      <div class="order-warp">
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
              if(this.getOrderType == 1) {
                return order.status == this.getOrderType || order.status == 9;
              } else if(this.getOrderType == 2) {
                return order.status == this.getOrderType || order.status == 10;
              } else {
                return order.status == this.getOrderType;
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    padding-top: 196px;
    background-color: #fff;
    .header {
      box-shadow: none;
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

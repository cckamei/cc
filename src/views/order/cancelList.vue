<template>
  <div class="pt">
    <v-header>订单列表</v-header>
    <div class="content">
      <order-list :orders="orders"></order-list>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  import orderList from './components/orders';

  export default {
    components: {
      orderList
    },
    data() {
      return {
        orders: [],
        serviceVisible: false
      };
    },
    created() {
      this.getOrders();
    },
    computed: {
      appName() {
        return window.htp.appName;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      getOrders() {
        this.ajax({
          name: 'getOrders'
        }).then(res => {
          this.orders = res;
          this.orders = this.orders.filter(order => {
            return order.status == 4 || order.status == 8 || order.status == 6;
          });
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .txt-center {
    padding: 30px 0;
  }
  .listitem {
    background: #ffffff;
    margin-bottom: 16px;
    .itemtitle {
      padding: 0 30px;
      height: 64px;
      line-height: 64px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .titleleft {
        img {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
      .listright {
        font-size: 24px;
        color: @color4;
      }
    }
    .itemcontent {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 30px;
      background: #f5f5f5;
      margin-bottom: 8px;
      vertical-align: middle;
      align-items: center;
      .contentleft {
        width: 120px;
        height: 120px;
        margin: 20px 20px 20px 0;
        background: #ffffff;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .contentright {
        flex: 1;
        .contenttitle {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          margin: 30px 0 20px;
          color: #666666;
          font-size: 24px;
          span:nth-child-of(2) {
            text-align: right;
          }
        }
        .contentmessage {
          flex: 1;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          font-size: 24px;
          margin-bottom: 30px;
          color: #999999;
          p {
            width: 360px;
          }
          .messageright {
            text-align: right;
          }
          s {
            color: #cccccc;
            display: block;
          }
        }
      }
    }
    .itemprice {
      height: 64px;
      line-height: 64px;
      text-align: right;
      padding: 0 30px;
      font-size: 20px;
      color: #666666;
      border-bottom: 2px solid #cccccc;
      span {
        font-size: 24px;
      }
    }
    .itemfoot {
      height: 80px;
      text-align: right;
      padding: 0 30px;
      button {
        width: 140px;
        height: 52px;
        border-radius: 25px;
        font-size: 20px;
        margin-top: 14px;
      }
      .btnleft {
        margin-right: 30px;
      }
      .btngrey {
        background: #ffffff;
        border: 2px solid #cccccc;
        color: #666666;
      }
      .btnpink {
        background: @color5;
        border: 2px solid @color5;
        color: #ffffff;
      }
    }
  }
</style>


<template>
  <div class="shoplist pt">
    <v-header-menus back shadow>
      选择门店
      <div slot="menus" class="menus">
        <div class="menu" @click="$refs.address.open()">筛选</div>
      </div>
    </v-header-menus>
    <div class="content">
      <ul class="shoplist-list">
        <li class="shoplist-item" v-for="(item, index) in shoplist" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="time">营业时间：{{item.starttime}} - {{item.endtime}}</div>
          <div class="address">门店地址：{{item.address}}</div>
          <div class="detail" @click="$router.push({name: 'shopdetail', params: {id: item.shopId}})">
            门店详情 <img src="@/assets/shop/icon_arrow_c.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <v-address ref="address" @click="reqShoplist(item)"></v-address>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        shoplist: [{
          shopId: 1,
          name: '钟楼开元商城店',
          starttime: '08:00',
          endtime: '21:00',
          address: '西安市碑林区解放市场6号开元商城F1'
        }, {
          shopId: 2,
          name: '钟楼开元商城店',
          starttime: '08:00',
          endtime: '21:00',
          address: '西安市碑林区解放市场6号开元商城F1'
        }]
      };
    },
    created() {
      // this.fetchCart();
    },
    methods: {
      reqShoplist() {

      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .shoplist {
    .shoplist-item {
      position: relative;
      background-color: #fff;
      padding: 40px 30px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      .name {
        font-size: 30px;
        color: #666;
        font-weight: bold;
      }
      .time,
      .address {
        color: #999;
        font-size: 24px;
        padding-top: 20px;
      }
      .detail {
        position: absolute;
        color: @color4;
        right: 30px;
        top: 44px;
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-left: 12px;
        }
      }
    }
    .menu {
      line-height: 40px;
      font-size: 30px;
      color: #999;
    }
  }
</style>


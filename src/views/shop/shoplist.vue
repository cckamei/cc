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
          <div class="time">营业时间：{{item.business_hours}}</div>
          <div class="address">门店地址：{{item.address}}</div>
          <div class="detail" @click="$router.push({name: 'shopdetail', params: {id: item.id}})">
            门店详情 <img src="@/assets/shop/icon_arrow_c.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <v-address ref="address" @confirm="handleConfirm"></v-address>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        shoplist: []
      };
    },
    created() {
      this.getShopList();
    },
    methods: {
      ...mapMutations(['setShopList']),
      ...mapActions(['ajax']),
      getShopList() {
        this.ajax({
          name: 'shopList',
          data: {
            offline_type: 3
          }
        }).then(res => {
          this.shoplist = res;
          this.setShopList(res);
        });
      },
      handleConfirm({ province }) {
        this.ajax({
          name: 'shopList',
          data: {
            province,
            offline_type: 3
          }
        }).then(res => {
          this.shoplist = res;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
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


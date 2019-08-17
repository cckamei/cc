<template>
  <div class="receipt">
    <div v-if="ziti" class="tabs flex">
      <span class="tab" @click="setAddressType(0)" :class="{active: address.type === 0}">配送</span>
      <span class="tab" @click="setAddressType(1)" :class="{active: address.type === 1}">自提</span>
    </div>
    <div class="address-wrapper">
      <div v-show="address.type === 0" class="arrow" @click="$router.push({name: 'myaddress'})">
        <template v-if="address.address">
          <div class="line1">收货人：{{address.name}} <span class="tel">{{address.phone}}</span></div>
          <div class="line2">收货地址：{{address.address}}</div>
        </template>
        <template v-else>
          <div class="line1 empty">添加收货地址</div>
          <div class="line2 empty">填写您的收货地址和联系方式</div>
        </template>
      </div>
      <div v-show="address.type === 1">
        <div class="line1 arrow" v-if="address.address" @click="$router.push({name: 'myaddress'})">取货人：{{address.name}} <span class="tel">{{address.phone}}</span></div>
        <div class="line1 arrow empty" v-else @click="$router.push({name: 'myaddress'})">添加取货信息</div>
        <div class="line2 arrow" v-if="address.shopId" @click="$router.push({name: 'shoplist'})">门店地址：{{address.shopAddress}}</div>
        <div class="line2 arrow empty" v-else @click="$router.push({name: 'shoplist'})">选择自提门店地址</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  export default {
    props: {
      ziti: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState(['address'])
    },
    watch: {
      checked(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      ...mapMutations(['setAddress']),
      setAddressType(type) {
        this.setAddress({ type });
      }
    }
  };
</script>

<style lang="less" scoped>
  .receipt {
    background-color: #fff;
  }
  .tabs {
    height: 60px;
    background-color: #e6e6e6;
    border-radius: 10px 10px 0 0;
    .tab {
      flex: auto;
      text-align: center;
      font-size: 30px;
      color: #999;
      &.active {
        border-radius: 10px 10px 0 0;
        background-color: #fff;
        height: 100%;
        line-height: 60px;
      }
    }
  }

  .address-wrapper {
    padding: 40px 20px;
    padding-right: 20px;
    .line1 {
      font-size: 30px;
      font-weight: bold;
      .tel {
        padding-left: 60px;
      }
    }
    .line2 {
      font-size: 24px;
      color: #666;
      margin-top: 26px;
    }
    .empty {
      color: #999;
    }
  }
</style>


<template>
  <div class="pt">
    <v-header>品牌礼遇</v-header>
    <div class="content">
      <ul class="cards">
        <li class="card" v-for="(item, index) in cards" :key="index" @click="$router.push({name: 'coupondetail'})">
          <v-coupon :card="item" useText="已使用" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        cards: []
      };
    },
    methods: {
      ...mapActions(['ajax'])
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    background-color: #fff;
  }

  .cards {
    margin-top: 10px;
    padding: 20px;
    .card {
      padding-bottom: 20px;
      background-color: #fff;
    }
  }
</style>

<template>
  <div class="pt">
    <v-header>品牌礼遇</v-header>
    <div class="content">
      <ul class="cards">
        <li class="card" v-for="(item, index) in cards" :key="index" @click="nextCouponDetail(item.coupon_id)">
          <v-coupon :card="item" />
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
    created() {
      this.getBrandGift();
    },
    methods: {
      ...mapActions(['ajax']),
      getBrandGift() {
        this.ajax({
          name: 'getBrandGift'
        }).then(res => {
          this.cards = res.list;
        });
      },
      nextCouponDetail(id) {
        this.$router.push({ name: 'coupondetail', params: { id } });
      }
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

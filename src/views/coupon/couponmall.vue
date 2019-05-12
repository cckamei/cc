<template>
  <div class="pt">
    <v-header>待领优惠券</v-header>
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
  import { mapMutations, mapActions } from 'vuex';

  export default {
    data() {
      return {
        cards: []
      };
    },
    created() {
      this.getCoupons();
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      getCoupons() {
        this.ajax({
          name: 'coupons'
        }).then(res => {
          this.cards = res;
        });
      },
      nextCouponDetail(id) {
        this.setCommon({ couponId: id });
        this.$router.push({ name: 'coupondetail' });
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

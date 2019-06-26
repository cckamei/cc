<template>
  <div class="pt">
    <v-header class="header">我的优惠券</v-header>
    <div class="content">
      <v-message msg="领取优惠券" @click="$router.push({name: 'couponmall'})"></v-message>
      <ul class="cards" v-if="cards.length">
        <li class="card" v-for="(item, index) in cards" :key="index" @click="nextCouponDetail(item.coupon_id)">
          <v-coupon :card="item" />
        </li>
      </ul>
      <div v-else class="card-empty">
        <img src="@/assets/coupon/bg_coupon_empty.png" alt="">
        <span>暂无优惠券</span>
      </div>
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
      this.getMyCoupons();
    },
    methods: {
      ...mapActions(['ajax']),
      getMyCoupons() {
        this.ajax({
          name: 'getMyCoupons'
        }).then(res => {
          this.cards = res;
          this.cards.forEach(res => {
            res.already = true;
          });
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
    padding: 20px;
    .card {
      padding-bottom: 20px;
    }
  }

  .card-empty {
    width: 260px;
    padding-top: 100px;
    text-align: center;
    margin: 0 auto;
    span {
      color: #999;
      font-size: 30px;
      padding-top: 40px;
    }
  }
</style>

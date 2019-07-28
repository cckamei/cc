<template>
  <div class="pt">
    <v-header class="header">选择优惠券</v-header>
    <v-tabs :tabs="['可使用', '不可用']" @click="i => showIndex = i"></v-tabs>
    <div class="content">
      <template v-if="showIndex === 0">
        <ul class="cards" v-if="cardsNormal.length">
          <li class="card" v-for="(item, index) in cardsNormal" :key="index">
            <v-coupon :card="item" :isShare="false" useText="立即使用" @click="handleClick(item)" />
          </li>
        </ul>
        <div v-else class="card-empty">
          <img src="@/assets/coupon/bg_coupon_empty.png" alt="">
          <span>暂无可用优惠券</span>
        </div>
        <template v-if="giftUse.length">
          <v-split-title>品牌礼遇</v-split-title>
          <ul class="cards" v-if="cart.length === 1">
            <li class="card" v-for="(item, index) in giftUse" :key="index">
              <liquan :card="item" useText="立即使用" @click="handleClick(item)" />
            </li>
          </ul>
          <div v-else class="tips">
            订单中仅包含一件商品时可使用
          </div>
        </template>
      </template>
      <template v-else>
        <ul class="cards" v-if="cardsExpired.length">
          <li class="card" v-for="(item, index) in cardsExpired" :key="index">
            <v-coupon :card="item" :isShare="false" useText="条件不符" />
          </li>
        </ul>
        <div v-else class="card-empty">
          <img src="@/assets/coupon/bg_coupon_empty.png" alt="">
          <span>暂无可用优惠券</span>
        </div>
        <!-- <template v-if="giftUnuse.length">
          <v-split-title>品牌礼遇</v-split-title>
          <ul class="cards">
            <li class="card" v-for="(item, index) in giftUnuse" :key="index">
              <v-coupon :card="item" :isShare="false" useText="条件不符" />
            </li>
          </ul>
        </template> -->
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import liquan from './liquan.vue';

  export default {
    components: {
      liquan
    },
    data() {
      return {
        cards: [],
        gifts: [],
        showIndex: 0
      };
    },
    computed: {
      ...mapState(['cart']),
      cardsNormal() {
        return this.cards.filter(item => item.can_use === 1);
      },
      cardsExpired() {
        return this.cards.filter(item => item.can_use === 0);
      },
      giftUse() {
        return this.gifts.filter(item => item.used === '0');
      },
      // giftUnuse() {
      //   return this.gifts.filter(item => item.can_use === 0);
      // }
    },
    created() {
      this.getOrderCoupons();
      this.getBrandGift();
    },
    methods: {
      ...mapMutations(['setPayOrder']),
      ...mapActions(['ajax']),
      getOrderCoupons() {
        this.ajax({ name: 'getOrderCoupon', data: { "skus": this.cart.map(item => item.cart_id) } }).then(res => {
          res.forEach(item => {
            item.already = true;
          });
          this.cards = res;
        });
      },
      getBrandGift() {
        this.ajax({
          name: 'getBrandGift'
        }).then(res => {
          res.list.forEach(item => {
            item.type = 1;
          });
          this.gifts = res.list;
        });
      },
      handleClick(card) {
        this.setPayOrder({ coupon: card });
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    background-color: #fff;
    padding-top: 196px;
    .header {
      box-shadow: none;
    }
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
    padding-bottom: 100px;
    text-align: center;
    margin: 0 auto;
    span {
      color: #999;
      font-size: 30px;
      padding-top: 40px;
    }
  }

  .tips {
    text-align: center;
    padding: 40px;
    color: #999;
  }
</style>

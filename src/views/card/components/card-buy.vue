<template>
  <div class="purchase">
    <div class="price">￥<span>{{card.price}}</span></div>
    <button v-if="card.already" class="btn btn-txt bought">您已购买</button>
    <button v-else class="btn btn-txt" @click.stop="buy">立即购买</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      card: {
        type: Object
      }
    },
    methods: {
      ...mapMutations(['setCart', 'clearPayOrder', 'setPayOrder']),
      buy() {
        this.setCart([{
          cart_id: this.card.card_id,
          goods_title: this.card.name,
          count: 1,
          price: this.card.price
        }]);
        this.clearPayOrder();
        this.setPayOrder({
          cart_id: this.card.card_id,
          num: 1,
          isCard: true
        });
        this.$router.push({ name: 'confirmorder' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .purchase {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
  }
  .price {
    font-size: 30px;
    color: #666;
    span {
      font-size: 40px;
    }
  }
  .btn-txt {
    width: 156px;
    height: 48px;
    border-radius: 24px;
    background-color: rgba(255, 255, 255, 0.6);
    border: 1px solid #fa7878; /*no*/
    color: #fa7878;
  }

  .bought {
    background-color: #fff0f0;
    border: none;
  }
</style>

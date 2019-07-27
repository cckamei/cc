<template>
  <div class="purchase">
    <div class="price">￥<span>{{card.price}}</span></div>
    <button v-if="card.already" class="btn btn-txt bought" @click.stop>您已购买</button>
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
      ...mapMutations(['setCard', 'setAddress']),
      buy() {
        this.setCard(this.card);
        this.setAddress({ type: 0 });
        this.$router.push({ name: 'cardorder' });
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
  }

  .bought {
    background-color: #fff0f0;
    border: none;
  }
</style>

<template>
  <div class="pt">
    <v-header>购物卡商城</v-header>
    <div class="content">
      <ul class="cards">
        <li class="card" v-for="(item, index) in cards" :key="index" @click="nextCardDetail(item.card_id)">
          <card :card="item" />
          <card-buy :card="item"></card-buy>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import card from './components/card';
  import cardBuy from './components/card-buy';

  export default {
    components: {
      card,
      cardBuy
    },
    data() {
      return {
        cards: []
      };
    },
    created() {
      this.getCards();
    },
    methods: {
      ...mapActions(['ajax']),
      getCards() {
        this.ajax({ name: 'cards' }).then(res => {
          this.cards = res;
        });
      },
      nextCardDetail(id) {
        this.$router.push({ name: 'carddetail', params: { id } });
      }
    }
  };
</script>

<style lang="less" scoped>
  .cards {
    margin-top: 10px;
    .card {
      padding: 20px;
      padding-bottom: 0;
      margin-bottom: 20px;
      background-color: #fff;
    }
  }
</style>

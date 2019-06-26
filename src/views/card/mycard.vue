<template>
  <div class="pt">
    <v-header class="header">我的购物卡</v-header>
    <div class="content">
      <v-tabs :tabs="['可使用', '已过期']" @click="i => showIndex = i"></v-tabs>
      <v-message msg="购物卡优惠" @click="$router.push({name: 'cardmall'})"></v-message>
      <ul class="cards" v-if="cardsNormal.length" v-show="showIndex === 0">
        <li class="card" v-for="(item, index) in cardsNormal" :key="index" @click="nextCardDetail(item.card_id)">
          <card :card="item" />
        </li>
      </ul>
      <div v-else class="card-empty" v-show="showIndex === 0">
        <img src="@/assets/card/bg_card_empty.png" alt="">
        <span>暂无购物卡</span>
      </div>
      <ul class="cards" v-if="cardsExpired.length" v-show="showIndex === 1">
        <li class="card" v-for="(item, index) in cardsExpired" :key="index" @click="nextCardDetail(item.card_id)">
          <card :card="item" />
        </li>
      </ul>
      <div v-else class="card-empty" v-show="showIndex === 1">
        <img src="@/assets/card/bg_card_empty.png" alt="">
        <span>暂无购物卡</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import card from './components/card';

  export default {
    components: {
      card
    },
    data() {
      return {
        cards: [],
        showIndex: 0
      };
    },
    computed: {
      cardsNormal() {
        return this.cards.filter(item => item.status === 0);
      },
      cardsExpired() {
        return this.cards.filter(item => item.status === 1);
      }
    },
    created() {
      this.getMyCard();
    },
    methods: {
      ...mapActions(['ajax']),
      getMyCard() {
        this.ajax({
          name: 'getMyCards'
        }).then(res => {
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
  .pt {
    background-color: #fff;
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
    text-align: center;
    margin: 0 auto;
    span {
      color: #999;
      font-size: 30px;
      padding-top: 40px;
    }
  }
</style>

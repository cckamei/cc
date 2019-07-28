<template>
  <div class="pt">
    <v-header>品牌礼遇</v-header>
    <div class="content">
      <ul class="cards">
        <li v-for="(item, index) in cards" :key="index">
          <liquan :card="item"></liquan>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import liquan from './liquan.vue';

  export default {
    components: {
      liquan
    },
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
          // this.cards.push(res.list[0]);
        });
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
    li {
      padding-bottom: 20px;
    }
  }
</style>

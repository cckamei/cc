<template>
  <div class="pt">
    <v-header>购买购物卡</v-header>
    <div class="content">
      <div class="card-section">
        <card :card="card" />
        <card-buy :card="card"></card-buy>
        <div class="card-comment">
          <div class="card-comment-title">购物卡注意事项</div>
          <div class="card-comment-text" v-html="card.comment"></div>
        </div>
      </div>
      <v-recommend class="section" title="为您推荐" :list="recommend"></v-recommend>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import card from './components/card';
  import cardBuy from './components/card-buy';

  export default {
    components: {
      card,
      cardBuy
    },
    data() {
      return {
        card: {},
        recommend: [] //推荐商品
      };
    },
    computed: {
      ...mapGetters(['getCommon'])
    },
    created() {
      this.getCardDetail();
      this.getRecommend();
    },
    methods: {
      ...mapActions(['ajax']),
      getCardDetail() {
        this.ajax({
          name: 'cardDetail',
          id: this.$route.params.id
        }).then(res => {
          this.card = res;
        });
      },
      getRecommend() {
        this.ajax({
          name: 'getRecommend',
          data: {
            position: 'vipcard'
          }
        }).then(res => {
          this.recommend = res;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .card-section {
    padding: 40px 20px 0 20px;
    background-color: #fff;
    .card-comment {
      padding: 20px 10px;
      &-title {
        color: #666;
        padding-bottom: 14px;
      }
      &-text {
        color: #999;
        text-indent: 44px;
      }
    }
  }
</style>

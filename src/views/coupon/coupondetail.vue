<template>
  <div class="pt">
    <v-header>分享优惠券</v-header>
    <div class="content">
      <div class="card-section">
        <v-coupon :card="card" />
        <div class="card-comment">
          <div class="card-comment-title">领取注意事项</div>
          <div class="card-comment-text" v-html="card.comment"></div>
        </div>
      </div>
      <v-recommend class="section" title="为您推荐" :list="recommend"></v-recommend>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
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
      this.getCoupon();
      this.getRecommend();
    },
    methods: {
      ...mapActions(['ajax']),
      getCoupon() {
        this.ajax({
          name: 'getCoupon',
          id: this.getCommon.couponId
        }).then(res => {
          this.card = res;
        });
      },
      getRecommend() {
        this.ajax({
          name: 'getRecommend',
          data: {
            position: 'coupon'
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

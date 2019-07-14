<template>
  <div class="pt">
    <v-header>品牌礼遇</v-header>
    <div class="content">
      <ul class="cards">
        <li class="card" v-for="(item, index) in cards" :key="index">
          <div class="col1 flex-auto" @click="$emit('click')">
            <div class="price"><span>￥</span>{{item.discount_money | currency}}</div>
            <div class="limit">购物满{{item.all_money}}元使用</div>
            <div class="card-scope">使用要求：{{item.comment}}</div>
          </div>
        </li>
      </ul>
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
      this.getBrandGift();
    },
    methods: {
      ...mapActions(['ajax']),
      getBrandGift() {
        this.ajax({
          name: 'getBrandGift'
        }).then(res => {
          this.cards = res.list;
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
    .card {
      background-color: #fff1f1;
      padding: 30px;
      background-size: 100% 100%;
      color: #fa7878;
      border-radius: 10px;
      .col1 {
        position: relative;
        .price {
          font-size: 60px;
          span {
            font-size: 36px;
          }
        }
        .limit,
        .expired {
          font-size: 20px;
        }
      }
      .col2 {
        width: 80px;
        flex-shrink: 0;
        text-align: center;
        div {
          width: 0;
          left: 50%;
          margin-left: 40%;
        }
      }
      .card-scope {
        font-size: 20px;
        padding-bottom: 10px;
      }
    }
  }
</style>

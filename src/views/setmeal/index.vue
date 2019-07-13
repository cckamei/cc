<template>
  <div class="set-meal pt">
    <v-header>搭配套餐</v-header>
    <div class="content">
      <ul class="set-meal-list">
        <li class="set-meal-item" v-for="(item, index) in setmeals" :key="index">
          <div class="title">{{item.title}}</div>
          <ul class="imgs flex">
            <li v-for="img in item.goods"><img :src="img" alt=""></li>
          </ul>
          <div class="set-meal-b flex">
            <div>
              <div class="line1">套餐价：<span class="price"><span>￥</span>{{item.price | currency}}</span></div>
              <div class="line2">共 {{item.goods.length}} 件商品</div>
            </div>
            <button class="btn-txt">立即购买</button>
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
        setmeals: [{
          title: '套餐1',
          price: 20000,
          goods: ['http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132']
        },
        {
          title: '套餐2',
          price: 20000,
          goods: ['http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132']
        },
        {
          title: '套餐3',
          price: 20000,
          goods: ['http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132']
        }]
      };
    },
    created() {
      // this.fetchCart();
    },
    methods: {
      ...mapActions(['ajax']),
      // fetchCart() {
      //   this.ajax({
      //     name: 'cart'
      //   }).then(res => {
      //     res.forEach(item => {
      //       item.checked = false;
      //       item.deleteVisible = false;
      //       item.limit = item.stock;
      //       if(item.is_diamond) {
      //         item.skuLabel = `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.guige};${item.guige}`;
      //       } else {
      //         item.skuLabel = `${item.zhushimingcheng};${item.zhushipingji};${item.guige};${item.guige}`;
      //       }
      //     });
      //     this.cart = res;
      //   });
      // },
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .set-meal {
    .set-meal-item {
      background-color: #fff;
      margin-bottom: 16px;
      padding: 10px 30px;
      align-items: stretch;
      .title {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        color: #999;
      }
      .imgs {
        overflow-x: auto;
        li {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
          img {
            width: 200px;
            height: 200px;
          }
        }
      }
      .set-meal-b {
        justify-content: space-between;
        padding: 15px 0 25px 0;
        .line1 {
          justify-content: space-between;
          font-size: 24px;
          color: #666;
          .price {
            font-size: 30px;
            color: @color4;
            span {
              font-size: 20px;
            }
          }
        }
        .line2 {
          color: #999;
          padding-top: 10px;
        }
      }
    }
  }
</style>


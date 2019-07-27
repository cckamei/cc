<template>
  <div class="package pt">
    <v-header>搭配套餐</v-header>
    <div class="content">
      <ul class="package-list">
        <li class="package-item" v-for="(item, index) in package" :key="index">
          <div class="title">{{item.name}}</div>
          <ul class="imgs flex">
            <li v-for="goods in item.goods_list"><img :src="goods.good.cover_img" alt=""></li>
          </ul>
          <div class="package-b flex">
            <div>
              <div class="line1">套餐价：<span class="price"><span>￥</span>{{item.price | currency}}</span></div>
              <div class="line2">共 {{item.goods_list.length}} 件商品</div>
            </div>
            <button class="btn-txt" @click="buy(item)">立即购买</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';

  export default {
    data() {
      return {
        package: []
      };
    },
    created() {
      this.getPackageList();
    },
    computed: {
      ...mapState(['common'])
    },
    methods: {
      ...mapMutations(['setPackage', 'setAddress', 'setInvoice']),
      ...mapActions(['ajax']),
      getPackageList() {
        this.ajax({
          name: 'getPackageList',
          id: this.common.goodsId
        }).then(res => {
          this.package = res;
        });
      },
      buy(val) {
        this.setAddress({ type: 0 });
        this.setInvoice({ use: '' });
        this.setPackage(val);
        this.$router.push({ name: 'packageorder' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .package {
    .package-item {
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
      .package-b {
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


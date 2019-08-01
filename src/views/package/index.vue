<template>
  <div class="package pt">
    <v-header>搭配套餐</v-header>
    <div class="content">
      <ul class="package-list">
        <li class="package-item" v-for="(item, index) in package" :key="index">
          <div class="title">{{item.name}}</div>
          <ul class="imgs flex">
            <li v-for="(goods, goodsIndex) in item.goods_list" @click="showSku(index, goodsIndex)"><img :src="goods.good.cover_img" alt=""></li>
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

    <v-slide-up title="商品规格" v-model="visible">
      <ul class="sku" v-if="visible">
        <li class="sku-icon flex">
          <img class="icon" :src="goods.good.cover_img" alt="">
          <div>
            <div class="price"><span>￥</span>{{goods.price | currency}}</div>
            <span class="code">商品编号：{{goods.sku.merchant_code}} &nbsp;&nbsp;&nbsp; 库存：{{goods.sku.count}}</span>
          </div>
        </li>
        <template v-if="goods.good.good_kind === '0' && skuList.length">
          <li>
            <div class="title">主钻分数</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[0]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">钻石净度</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[1]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">颜色</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[2]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">规格</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[3]" :cancel="true"></v-button-radio>
          </li>
        </template>
        <template v-else-if="goods.good.good_kind === '1' && skuList.length">
          <li>
            <div class="title">主石名称</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[0]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">主石评级</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[1]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">颜色</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[2]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">规格</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[3]" :cancel="true"></v-button-radio>
          </li>
        </template>
        <template v-else-if="goods.good.good_kind === '2' && skuList.length">
          <li>
            <div class="title">金类型</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[0]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">金重</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[1]" :cancel="true"></v-button-radio>
          </li>
          <li>
            <div class="title">规格</div>
            <v-button-radio :disabled="true" v-model="value" :list="skuList[2]" :cancel="true"></v-button-radio>
          </li>
        </template>
      </ul>
    </v-slide-up>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';

  export default {
    data() {
      return {
        package: [],
        goods: {},
        skuList: [],
        visible: false,
        value: 0
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
      },
      showSku(packageIndex, goodsIndex) {
        const goods = this.package[packageIndex].goods_list[goodsIndex];
        const goodsKind = +goods.good.good_kind;
        const skuKeys = [['zhuzuanfenshu', 'zuanshijingdu', 'color', 'guige'], ['zhushimingcheng', 'zhushipingji', 'color', 'guige'], ['s_jinleixing', 's_jinzhong', 'guige']];
        const skuList = [];
        skuKeys[goodsKind].forEach(item => {
          skuList.push([{ label: goods.sku[item] }]);
        });
        this.goods = goods;
        this.skuList = skuList;
        this.visible = true;
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

  .sku {
    li {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      &.sku-icon {
        align-items: flex-end;
        border: none;
        .icon {
          width: 200px;
          height: 200px;
          margin-right: 30px;
        }
        .price {
          color: @color4;
          font-size: 42px;
        }
        .code {
          color: #999;
          font-size: 20px;
        }
      }
      &.count {
        color: #666;
        font-size: 24px;
        justify-content: space-between;
        .btn {
          width: 40px;
          height: 40px;
          &.plus {
            background: url("~@/assets/goods/button_plus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~@/assets/goods/button_plus_d.png") no-repeat;
              background-size: 100%;
            }
          }
          &.minus {
            background: url("~@/assets/goods/button_minus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~@/assets/goods/button_minus_d.png") no-repeat;
              background-size: 100%;
            }
          }
        }
        input {
          width: 0;
          min-width: 120px;
          color: #666;
          text-align: center;
          padding: 0 10px;
        }
      }
      .title {
        color: #666;
        font-size: 24px;
      }
    }
  }
</style>


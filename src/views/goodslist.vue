<template>
  <div class="pt">
    <v-header-menus home>
      <input type="text" @click="$router.push({name: 'goodssearch'})" placeholder="请选择您要搜索的作品类型" readonly>
      <div slot="menus" class="menus">
        <div class="menu" @click="$router.push({name: 'goodssearch'})"><img src="~assets/goods/icon_search.png" alt=""></div>
      </div>
    </v-header-menus>
    <div class="condition">
      <ul class="flex">
        <li class="flex" @click="openFilter">
          <span>筛选</span>
          <div class="arrow-down" :class="{active: filterVisible}"></div>
        </li>
        <li class="flex" @click="openSort">
          <span>排序</span>
          <div class="arrow-down" :class="{active: sortVisible}"></div>
        </li>
      </ul>
    </div>
    <div class="content">
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
        <li v-for="(item, index) in goodsList" :key="index" class="flex" @click="goDetail(item)">
          <div class="img"><img :src="item.img" alt=""></div>
          <div class="detail flex-auto flex">
            <span class="name">{{item.goods_title}}</span>
            <span class="desc">{{item.sub_title}}</span>
            <div class="line3 flex">
              <div class="price"><span>￥</span>{{item.price | currency}}</div>
              <div class="cart" @click.stop="addToCart(item)"></div>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="pageInfo.currentPage < pageInfo.totalPage" v-show="loading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <v-popup-confirm title="筛选" v-model="filterVisible" @confirm="handleFilterConfirm" :isConfirm="filterIndex !== -1">
      <v-input-radio v-model="filterIndex" :list="filters.map(res => res.name)"></v-input-radio>
    </v-popup-confirm>
    <v-popup-confirm title="排序" v-model="sortVisible" @confirm="handleSortConfirm" :isConfirm="sortIndex !== -1">
      <v-input-radio v-model="sortIndex" :list="sorts"></v-input-radio>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        filterVisible: false,
        sortVisible: false,
        filterIndex: -1,
        sortIndex: -1,
        filterSelectedIndex: -1,
        sortSelectedIndex: -1,
        filters: [],
        sorts: ['价格从高到低', '价格从低到高'],
        goodsList: [],
        pageInfo: {},
        loading: false,
        category: {}
      };
    },
    created() {
      this.category = this.$route.params;
      this.fetchSeries();
    },
    computed: {
      ...mapGetters(['getCommon'])
    },
    methods: {
      ...mapMutations(['setCommon']),
      ...mapActions(['ajax']),
      openFilter() {
        this.filterVisible = true;
        this.filterIndex = this.filterSelectedIndex;
      },
      openSort() {
        this.sortVisible = true;
        this.sortIndex = this.sortSelectedIndex;
      },
      handleFilterConfirm() {
        this.pageInfo.currentPage = 0;
        this.filterSelectedIndex = this.filterIndex;
        this.setCommon({ goodsType: this.filters[this.filterIndex].series_id });
        this.fetchGoods();
      },
      handleSortConfirm() {
        this.pageInfo.currentPage = 0;
        this.sortSelectedIndex = this.sortIndex;
        this.fetchGoods();
      },
      fetchGoods() {
        let reqData = {
          series: this.getCommon.goodsType,
          page: (this.pageInfo.currentPage || 0) + 1
        };

        if(this.sortSelectedIndex !== -1) {
          Object.assign(reqData, { orderby: Math.abs(this.sortSelectedIndex - 1) });
        }

        Object.assign(reqData, this.category);

        this.ajax({
          name: 'goods',
          data: reqData
        }).then(res => {
          this.pageInfo = {
            currentPage: res.page,
            totalPage: res.pages
          };
          if(this.pageInfo.currentPage == 1) {
            this.goodsList = [];
          }
          this.goodsList = this.goodsList.concat(res.list);

          if(this.pageInfo.currentPage < this.pageInfo.totalPage) {
            this.loading = false;
          } else if(this.pageInfo.currentPage != 1) {
            this.toast('没有更多数据了');
          }
        });
      },
      fetchSeries() {
        this.ajax({
          name: 'series'
        }).then(res => {
          this.filters = res;
          this.filterIndex = res.findIndex(item => item.series_id === this.getCommon.goodsType);
          this.filterSelectedIndex = this.filterIndex;
          this.fetchGoods();
        });
      },
      //分页
      loadMore() {
        this.loading = true;
        this.fetchGoods();
      },
      goDetail(val) {
        this.setCommon({ goodsId: val.goods_id });
        this.$router.push({ name: 'goodsdetail' });
      },
      addToCart(val) {
        this.setCommon({ goodsId: val.goods_id });
        this.$router.push({ name: 'goodsdetail', params: { openSKU: true } });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    padding-top: 192px;
  }

  .title input {
    border-left: 1px solid #f0f0f0; /*no*/
    padding-left: 30px;
    padding-right: 30px;
    height: 60px;
    width: 100%;
  }

  .condition {
    height: 96px;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 96px;
    background-color: #fff;
    font-size: 30px;
    color: #999;
    padding: 0 24px;
    box-shadow: 0 10px 50px 10px rgba(170, 170, 170, 0.5);
    ul {
      height: 100%;
      border-top: 1px solid #f0f0f0; /*no*/
      li {
        width: 50%;
        justify-content: center;
        .arrow-down {
          width: 24px;
          height: 24px;
          background: url("~assets/goods/icon_arrow_d.png") no-repeat;
          background-size: 100%;
          transition: all 0.2s;
          margin-left: 16px;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .list {
    background-color: #fff;
    position: relative;
    li {
      padding: 30px 40px 30px 30px;
      align-items: stretch;
      .img {
        width: 200px;
        height: 200px;
        margin-right: 30px;
        flex-shrink: 0;
        background-color: #f5f5f5;
        img {
          height: 100%;
        }
      }
      .detail {
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        .name {
          font-size: 30px;
          color: #666;
          padding-top: 10px;
        }
        .desc {
          font-size: 20px;
          color: #999;
          padding-top: 24px;
        }
        .line3 {
          position: absolute;
          width: 100%;
          bottom: 10px;
          left: 0;
          align-items: center;
          justify-content: space-between;
          .price {
            font-size: 30px;
            color: @color4;
            span {
              font-size: 20px;
            }
          }
          .cart {
            width: 40px;
            height: 40px;
            background: url("~assets/goods/icon_cart.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>

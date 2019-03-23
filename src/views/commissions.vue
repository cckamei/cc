<template>
  <div class="commissions">
    <v-header>提成列表</v-header>
    <div class="list" :class="{'no-data':commissions.length==0}" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
      <div class="commission" v-for="(commission,i) in commissions" :key="i">
        <div class="time">{{formatDate(commission.created_at)}}</div>
        <div class="order">
          <div class="order-user">
            购买人：{{commission.buyer}}
          </div>
          <div class="order-num">
            订单编号：{{commission.orderid}}
          </div>
        </div>
        <div class="goods">
          <div class="goods-header">
            <div class="title">商品（售价）</div>
            <div class="price">提成额</div>
          </div>
          <div class="good" v-for="(good ,j) in commission.info" :key="j">
            <div class="title">{{good.goods_name}}（￥{{good.subtotal}}）</div>
            <div class="price">￥{{good.ticheng}}</div>
          </div>
        </div>
        <div class="commission-footer">
          提成总额：<span class="pick">￥{{commission.money}}</span>
        </div>
      </div>
    </div>
    <p v-if="pageInfo.currentPage < pageInfo.totalPage" v-show="loading" class="loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      <span>加载中...</span>
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { formatDate } from '@/utils';
  export default {
    data() {
      return {
        commissions: [],
        pageInfo: {
          totalPage: 10,
          currentPage: 0
        },
        loading: false
      };
    },
    created() {
      this.getCommissions();
    },
    methods: {
      ...mapActions(['ajax']),
      formatDate,
      getCommissions() {
        this.pageInfo = {
          currentPage: this.pageInfo.currentPage + 1,
          totalPage: 5
        };
        if(this.pageInfo.currentPage == 1) {
          this.goodsList = [];
        }
        let commissions = [];
        this.ajax({
          name: 'getTicheng',
          page: this.pageInfo.currentPage,
          size: 10
        }).then(res => {
          this.pageInfo.totalPage = res.pages;
          this.commissions = this.commissions.concat(res.list);
          console.log(this.commissions);
        });

        if(this.pageInfo.currentPage < this.pageInfo.totalPage) {
          this.loading = false;
        } else if(this.pageInfo.currentPage != 1) {
          this.toast('没有更多数据了');
        }
      },
      //分页
      loadMore() {
        this.loading = true;
        this.getCommissions();
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .list {
    position: absolute;
    top: 96px;
    left: 0;
    bottom: 50px;
    width: 100%;
    overflow: auto;
    &.no-data {
      background: ~"url('~assets/common/icon_none.png') no-repeat center 150px";
      background-size: 240px 240px;
    }
    .commission {
      margin: 20px;
      background-color: #fff;
      border-radius: 8px;
      .time {
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        text-indent: 60px;
        color: #999;
        background: ~"url('~assets/common/icon_date.png') no-repeat 20px center";
        background-size: 24px 24px;
        border-bottom: 1px solid #f0f0f0; /*no*/
      }
      .order {
        margin: 0 20px;
        border-bottom: 1px solid #f0f0f0; /*no*/
        &-user,
        &-num {
          height: 40px;
          line-height: 40px;
          color: #666666;
          font-size: 24px;
        }
        &-user {
          margin-top: 20px;
        }
        &-num {
          margin-bottom: 20px;
        }
      }
      .goods {
        margin: 0 20px;
        border-bottom: 1px solid #f0f0f0; /*no*/
        &-header {
          height: 60px;
          line-height: 60px;
          color: #666666;
          font-size: 24px;
          display: flex;
          justify-content: space-around;
          .title {
            flex: 1;
          }
          .price {
            padding: 0;
          }
        }
        .good {
          height: 24px;
          font-size: 24px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-around;
          color: #999;
          .title {
            flex: 1;
          }
          .price {
            padding: 0;
          }
        }
      }
      &-footer {
        height: 80px;
        padding: 0 20px;
        line-height: 80px;
        text-align: right;
        .pick {
          color: @color2;
          font-size: 28px;
        }
      }
    }
  }
</style>


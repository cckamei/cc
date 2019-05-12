<template>
  <div class="recommend">
    <div class="title flex"><span>{{title}}</span></div>
    <div class="recommend-content">
      <ul class="flex">
        <li v-for="(item, index) in list" :key="index">
          <div class="recommend-item" @click="goGoodsDetail(item.goods_id)">
            <img :src="item.img" alt="">
            <div class="name">{{item.goods_title}}</div>
            <div class="flex">
              <div class="price"><span>￥</span>{{item.price | currency}}</div>
              <div class="like" :class="{active: item.like}" @click.stop="collect(item)"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    props: {
      title: {
        default: '为你推荐',
        type: String
      },
      list: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    methods: {
      ...mapMutations(['setCommon']),
      ...mapActions(['ajax']),
      collect(item) {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: this.name } });
          return false;
        }

        this.ajax({
          name: 'addCollect',
          data: {
            'collect_id': item.default_sku
          }
        }).then(res => {
          this.toast('收藏成功！');
        });
      },
      goGoodsDetail(goodsId) {
        this.setCommon({ goodsId });
        this.$router.replace({ name: 'redirect' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .recommend-content {
    padding: 8px 15px;
    background-color: #f0f0f0;
    .flex {
      flex-wrap: wrap;
      li {
        width: 50%;
        padding: 8px 5px;
        .recommend-item {
          background-color: #fff;
          border-radius: 10px;
          padding: 20px 24px 24px 24px;
          .name {
            font-size: 24px;
            color: #666;
            padding-top: 16px;
          }
          .flex {
            justify-content: space-between;
            padding-top: 16px;
            .price {
              font-size: 30px;
              color: @color4;
              span {
                font-size: 24px;
              }
            }
            .like {
              width: 40px;
              height: 40px;
              background: url("~@/assets/goods/button_like.png") no-repeat;
              background-size: 100%;
              &.active {
                background: url("~@/assets/goods/button_like_l.png") no-repeat;
                background-size: 100%;
              }
            }
          }
        }
      }
    }
  }

  .title {
    position: relative;
    height: 84px;
    font-size: 24px;
    color: #ccc;
    width: 100%;
    justify-content: center;
    background-color: #fff;
    &:after {
      content: "";
      left: 30px;
      right: 30px;
      height: 1px; /*no*/
      background-color: #f0f0f0;
      display: block;
      top: 50%;
      position: absolute;
    }
    span {
      padding: 0 30px;
      background-color: #fff;
      z-index: 1;
    }
  }
</style>


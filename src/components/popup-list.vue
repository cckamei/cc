<template>
  <div class="popup" :style="{height: visible ? cententHeight + 'px' : 0}">
    <div class="popup-header flex" @click="$emit('all', goods.id)">
      <div class="shadow"></div>
      <img src="~assets/home/icon_all_arrow.png" alt=""><span>查看全部</span>
    </div>
    <div class="popup-content">
      <ul>
        <li v-for="(item, index) in goods.goods" :key="index" class="flex" @click="goGoodsDetail(item.goods_id)">
          <div class="img"><img :src="item.img" alt=""></div>
          <div class="detail flex-auto flex">
            <span class="name">{{item.goods_title}}</span>
            <span class="desc">{{item.sub_title}}</span>
            <span class="price"><span>￥</span>{{item.price | currency}}</span>
          </div>
        </li>
      </ul>
      <div class="popup-close" @click="close">
        <img src="~assets/home/icon_draw.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      },
      goods: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      cententHeight() {
        return (70 + 20 * 2 + 200 * this.goods.goods.length + 30 * (this.goods.goods.length - 1)) / window.htp.designWidth * window.screen.width;
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      }
    },
    methods: {
      ...mapMutations(['setCommon']),
      close() {
        this.visible = false;
        this.$emit('close');
      },
      goGoodsDetail(id) {
        this.setCommon({ goodsId: id });
        this.$router.push({ name: 'goodsdetail' });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .popup {
    overflow: hidden;
    transition: height 0.3s linear;
    padding-bottom: 4px;
    &-header {
      height: 70px;
      justify-content: center;
      text-align: center;
      color: @color4;
      border-bottom: 1px solid #f0f0f0; /*no*/
      position: relative;
      background-color: #fff;
      .shadow {
        box-shadow: 0 10px 50px 10px rgba(170, 170, 170, 0.5);
        // box-shadow: 0 10px 20px 10px rgba(100, 100, 100, 1);
        position: absolute;
        width: 100%;
        height: 10px;
        top: -10px;
      }
      img {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
    }
    &-content {
      padding: 20px 40px;
      background-color: #fff;
      position: relative;
      li {
        padding-bottom: 30px;
        align-items: stretch;
        .img {
          width: 240px;
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
          .price {
            position: absolute;
            width: 100%;
            bottom: 10px;
            left: 0;
            font-size: 30px;
            color: #333;
          }
        }
        &:last-child {
          padding-bottom: 0;
        }
      }
      .popup-close {
        height: 60px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        img {
          margin-top: 10px;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>


<template>
  <div>
    <v-split-title>旧品信息</v-split-title>
    <ul class="goods">
      <li v-for="(item, index) in tradein" :key="index">
        <div class="item-wrapper flex">
          <div class="img"><img :src="item.list_img" alt=""></div>
          <div class="detail flex-auto flex">
            <div class="detail-row flex">
              <div class="col">品牌：{{item.brand}}</div>
            </div>
            <div class="detail-row flex">
              <div class="col">预估价：{{item.price}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        tradein: [
          {
            brand: 'CC卡美',
            price: 4000
          },
          {
            brand: 'CC卡美',
            price: 4000
          }
        ]
      };
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .goods {
    background-color: #fff;
    li {
      padding-bottom: 8px;
      .item-wrapper {
        background-color: #f5f5f5;
        padding: 30px 40px;
        align-items: stretch;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        .img {
          width: 120px;
          height: 120px;
          margin-right: 40px;
          flex-shrink: 0;
          background-color: #f5f5f5;
          img {
            height: 100%;
          }
        }
        .detail {
          flex-direction: column;
          position: relative;
          align-items: flex-start;
          justify-content: center;
          .detail-row {
            font-size: 24px;
            color: #666;
            width: 100%;
            &:last-child {
              padding-top: 10px;
            }
            .col {
              width: 50%;
            }
          }
        }
      }
    }
  }
</style>



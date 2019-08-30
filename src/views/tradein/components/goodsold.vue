<template>
  <div>
    <v-split-title v-if="showTitle">旧品信息</v-split-title>
    <ul class="goods">
      <li v-for="(item, index) in goods" :key="index">
        <div class="item-wrapper flex">
          <div class="img"><img :src="item.goods_imgs[0]" alt=""></div>
          <div class="detail flex-auto flex">
            <div class="detail-row flex">
              <div class="col">品牌：{{item.pp_info.title}}</div>
            </div>
            <div class="detail-row flex">
              <div class="col">预估价：{{item.auto_cal_price === 'UNKNOW' ? '该类型商品仅支持人工估值' :  '￥' + item.auto_cal_price}}</div>
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
      },
      showTitle: {
        type: Boolean,
        default: false
      }
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



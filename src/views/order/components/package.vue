<template>
  <div>
    <div class="item-content" v-for="(item, index) in goods.goods_list" :key="index">
      <div class="contentleft">
        <img :src="item.good.cover_img" alt="">
      </div>
      <div class="contentright">
        <div class="contenttitle">
          <span>{{item.good.title}}</span>
          <span>￥{{item.price}}</span>
          <div v-if="!orderlist && item.good.has_kezi" class="lettering" @click="$router.push({name: 'orderlettering', params: {id: item.good.good_id}})"><img src="@/assets/lettering/icon_inscribe.png" alt=""></div>
        </div>
        <div class="contentmessage">
          <p>{{skuLabel(item)}}</p>
          <div class="messageright">
            <span>X1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: () => { }
      },
      orderlist: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      skuLabel() {
        return item => {
          if(item.good.good_kind === '0') {
            return `${item.sku.zhuzuanfenshu};${item.sku.zuanshijingdu};${item.sku.color};${item.sku.guige}`;
          } else if(item.good.good_kind === '1') {
            return `${item.sku.zhushimingcheng};${item.sku.zhushipingji};${item.sku.color};${item.sku.guige}`;
          } else {
            return `${item.sku.s_jinleixing};${item.sku.s_jinzhong};${item.sku.guige}`;
          }
        };
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .item-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    vertical-align: middle;
    align-items: center;
    padding: 0 30px;
    background: #f5f5f5;
    margin-bottom: 8px;
    .contentleft {
      width: 120px;
      height: 120px;
      margin: 20px 20px 20px 0;
      background: #ffffff;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .contentright {
      flex: 1;
      .contenttitle {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        color: #666666;
        font-size: 24px;
        span:nth-child-of(2) {
          text-align: right;
        }
        .lettering {
          width: 30px;
          height: 30px;
          float: right;
        }
      }
      .contentmessage {
        padding-top: 10px;
        flex: 1;
        font-size: 20px;
        color: #999999;
        .line2.flex {
          justify-content: space-between;
          .scope {
            padding-right: 20px;
          }
        }
        p {
          width: 360px;
        }
        .messageright {
          text-align: right;
        }
      }
    }
  }
</style>



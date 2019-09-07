<template>
  <div>
    <div class="item-content" v-for="(item, index) in goods" :key="index">
      <div class="contentleft">
        <img src="@/assets/card/img_card.png" alt="">
      </div>
      <div class="contentright">
        <div class="contenttitle">
          <span>{{item.name}}</span>
          <span>￥{{item.price}}</span>
        </div>
        <div class="contentmessage">
          <div class="line1"><span>{{item.discount * 10}}</span>&nbsp;&nbsp;&nbsp;折</div>
          <div class="line2 flex">
            <div class="scope">适用范围：{{item.scope}}</div>
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
        type: Array,
        default: () => []
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
      }
    }
  }
</style>



<template>
  <div>
    <div class="item-content" v-for="(item, index) in goods" :key="index">
      <div class="contentleft">
        <img src="@/assets/stone/pic_dia.png" alt="">
      </div>
      <div class="contentright">
        <div class="contenttitle">
          <span>钻石</span>
          <span>￥{{item.price}}</span>
        </div>
        <div class="contentmessage">
          <p>{{ item.zhusz >= 1 ? `${item.zhusz}克拉` : `${+item.zhusz * 100}分`}}; {{item.zhusjd}}; {{item.zhusys}}; {{item.zhusqg}}; {{item.zhuslx}}; {{item.zhusxz}}; {{item.qiege}}; {{item.zhengs}}</p>
          <div class="messageright">
            <span>X{{item.shl}}</span>
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
          if(item.good_kind === '0') {
            return `${item.zhuzuanfenshu};${item.zuanshijingdu};${item.color};${item.guige}`;
          } else if(item.good_kind === '1') {
            return `${item.zhushimingcheng};${item.zhushipingji};${item.color};${item.guige}`;
          } else {
            return `${item.s_jinleixing};${item.s_jinzhong};${item.guige}`;
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



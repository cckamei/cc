<template>
  <div class="logisticsTrack">
    <v-header>物流跟踪</v-header>
    <div class="content">
      <div class="logisticsTrackTop" v-if="!order.logistics.info.data.length">
        <ul>
          <li><span>暂无物流信息</span></li>
        </ul>
      </div>

      <div class="logisticsTrackTop" v-if="order.logistics.info.data.length">
        <ul>
          <li><span>运单号：</span>{{order.logistics.id}}</li>
          <li><span>承运公司：</span>{{order.logistics.name}}快递</li>
        </ul>
      </div>
      <div class="logisticsLine" v-if="order.logistics.info.data.length">
        <ul>
          <li v-for="(item,i) in order.logistics.info.data">
            <i class="point" :class="{colorpoint:i==0}"></i>
            <s></s>
            <div class="logictisLines">
              <h1>{{item.context}}</h1>
              <span>{{item.time}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        order: {
          address: {},
          logistics: {
            info: {
              data: []
            }
          }
        }
      };
    },
    created() {
      let orderId = this.getOrderId;
      console.log(orderId);
      this.ajax({
        name: 'getOrder',
        id: orderId
      }).then(res => {
        console.log(res);
        if(res.logistics.info) {
          this.order = res;
        }
      });
    },
    computed: {
      ...mapGetters(['getOrderId'])
    },
    methods: {
      ...mapActions(['ajax'])

    }
  };
</script>


<style lang="less" scoped>
  @import "~@/style/vars.less";
  .logisticsTrack {
    background: #ffffff;
    .logisticsTrackTop {
      background: #f8f7f7;
      padding-bottom: 20px;
      ul {
        width: 710px;
        background: #ffffff;
        border-radius: 10px;
        margin: 116px auto 0;
        padding: 40px;
        li {
          margin-bottom: 20px;
          font-size: 24px;
          color: #666666;
          i {
            font-style: normal;
            color: #6196f6;
            text-decoration: underline;
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
    .logisticsLine {
      height: auto;
      li {
        position: relative;
        height: 200px;
        i {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #dcdcdc;
          left: 20px;
          top: 25px;
          z-index: 1;
        }
        i.colorpoint {
          background: @color5;
        }
        s {
          position: absolute;
          width: 2px;
          height: 184px;
          border-radius: 50%;
          background: #dcdcdc;
          left: 30px;
          top: 40px;
        }
        .logictisLines {
          width: 690px;
          height: 100%;
          box-sizing: border-box;
          float: right;
          border-bottom: 2px solid #f0f0f0;
          h1 {
            font-size: 24px;
            color: #666666;
            margin-bottom: 20px;
            width: 640px;
            font-weight: normal;
          }
          span {
            color: #999999;
            font-size: 24px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="shopdetail pt pb">
    <v-header>门店详情</v-header>
    <div class="content">
      <section class="shop-info">
        <div class="name">{{shopInfo.name}}</div>
        <div class="time">营业时间：{{shopInfo.starttime}} - {{shopInfo.endtime}}</div>
        <div class="address">门店地址：{{shopInfo.address}}</div>
      </section>
      <div class="gap"></div>
      <v-split-title>门店实景</v-split-title>
      <ul class="imgs flex">
        <li v-for="img in goods"><img :src="img" alt=""></li>
      </ul>
      <div class="gap"></div>
      <v-split-title>门店地图</v-split-title>
      <div class="map-container">
        <iframe src="https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.96554,116.26719;title:成都;addr:北京市海淀区复兴路32号院&key=S36BZ-DUXCD-VMK4L-HQO4H-SFMAO-7DFFJ&referer=cc" frameborder="0"></iframe>
      </div>
      <div class="gap"></div>
      <v-split-title>门店资质</v-split-title>
      <ul class="imgs flex">
        <li v-for="img in goods"><img :src="img" alt=""></li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn active">选择</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  import { setTimeout } from 'timers';

  export default {
    data() {
      return {
        longitude: 0,//经度
        latitude: 0,//纬度
        city: '',
        shopInfo: {
          shopId: 2,
          name: '钟楼开元商城店',
          starttime: '08:00',
          endtime: '21:00',
          address: '西安市碑林区解放市场6号开元商城F1'
        },
        goods: ['http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132']
      };
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .shopdetail {
    .shop-info {
      position: relative;
      background-color: #fff;
      padding: 40px 30px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      .name {
        font-size: 30px;
        color: #666;
      }
      .time,
      .address {
        color: #999;
        font-size: 24px;
        padding-top: 20px;
      }
    }
    .imgs {
      overflow-x: auto;
      background-color: #fff;
      padding: 30px;
      li {
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        img {
          width: 210px;
          height: 210px;
          display: block;
        }
      }
    }

    .map-container {
      padding: 30px;
      height: 600px;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }
</style>


<style>
  .downloadBtn {
    display: none;
  }
</style>


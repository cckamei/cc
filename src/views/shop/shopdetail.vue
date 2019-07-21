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
      <div id="container" style="height:500px;"></div>
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
          address: '西安市碑林区解放市场6号开元商城F1',
        },
        goods: ['http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132', 'http://thirdwx.qlogo.cn/mmopen/vi_32/36FdUeKvJ8swzzucXukduqibhLI5huXtKs0icvqj3QEl12lPbQ9FCg8iatwPjJDx7NnBI1uibiaW4VlSOvXFN9IZUeg/132']
      };
    },
    mounted() {
      this.getMyLocation();
    },
    methods: {
      getMyLocation() {
        var geolocation = new qq.maps.Geolocation("yourkey", "yourkey名称");
        console.log(geolocation);
        geolocation.getIpLocation(this.showPosition, this.showErr);
      },
      showPosition(position) {
        console.log(position);
        this.latitude = position.lat;
        this.longitude = position.lng;
        this.city = position.city;
        this.setMap();
      },
      showErr() {
        console.log("定位失败");
        this.getMyLocation();//定位失败再请求定位，测试使用
      },
      //第二部分
      //位置信息在地图上展示
      setMap() {
        //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
        //设置地图中心点
        var myLatlng = new qq.maps.LatLng(this.latitude, this.longitude);
        //定义工厂模式函数
        var myOptions = {
          zoom: 13,               //设置地图缩放级别
          center: myLatlng,    //设置中心点样式
          mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
        }
        // //获取dom元素添加地图信息
        var map = new qq.maps.Map(document.getElementById("container"), myOptions);
        //第三部分
        //给定位的位置添加图片标注
        var marker = new qq.maps.Marker({
          position: myLatlng,
          map: map
        });
        //给定位的位置添加文本标注
        var marker = new qq.maps.Label({
          position: myLatlng,
          map: map,
          content: '这是我当前的位置，偏差有点大，哈哈'
        });
      }
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
  }
  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }
</style>


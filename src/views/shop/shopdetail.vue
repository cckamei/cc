<template>
  <div class="shopdetail pt pb">
    <v-header>门店详情</v-header>
    <div class="content">
      <section class="shop-info">
        <div class="name">{{shop.name}}</div>
        <div class="time">营业时间：{{shop.business_hours}}</div>
        <div class="address">门店地址：{{shop.address}}</div>
      </section>
      <div class="gap"></div>
      <v-split-title>门店实景</v-split-title>
      <ul class="imgs flex">
        <li v-for="(img, index) in shop.store_imgs" :key="index"><img :src="img.url.url" alt=""></li>
      </ul>
      <div class="gap"></div>
      <v-split-title>门店地图</v-split-title>
      <div class="map-container">
        <iframe :src="mapurl" frameborder="0"></iframe>
      </div>
      <div class="gap"></div>
      <v-split-title>门店资质</v-split-title>
      <ul class="imgs flex">
        <li v-for="(img, index) in shop.store_zizhi_imgs" :key="index"><img :src="img.url.url" alt=""></li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn active" @click="handleConfirm">选择</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  import { setTimeout } from 'timers';

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapState(['shopList']),
      shop() {
        return this.shopList.find(item => item.id === this.$route.params.id);
      },
      mapurl() {
        return `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${this.shop.longitude_latitude.join(',')};title:${this.shop.name};addr:${this.shop.address}&key=S36BZ-DUXCD-VMK4L-HQO4H-SFMAO-7DFFJ&referer=cc`;
      }
    },
    methods: {
      ...mapMutations(['setAddress']),
      handleConfirm() {
        this.setAddress({ shopId: this.shop.id, shopAddress: this.shop.address });
        this.$router.go(-2);
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


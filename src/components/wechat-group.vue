<template>
  <div class="wechat-group">
    <v-split-title>会员微群</v-split-title>
    <swiper :options="swiperOption" class="wechat-group-swiper">
      <swiper-slide v-for="(item, index) in wechatGroup" :key="index">
        <div class="wechat-item flex" @click="$router.push({name: 'wechatgroup'})">
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <div class="detail flex-auto flex">
            <span class="name">{{item.title}}</span>
            <span class="desc">{{item.desc}}</span>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        wechatGroup: [{
          src: '',
          title: '会员售前咨询1群',
          desc: '加群享受CC小美一对一贴心服务~'
        }, {
          src: '',
          title: '会员售前咨询2群',
          desc: '加群享受CC小美一对一贴心服务~'
        }, {
          src: '',
          title: '会员售前咨询3群',
          desc: '加群享受CC小美一对一贴心服务~'
        }]
      };
    }
  };
</script>

<style lang="less" scoped>
  .wechat-group {
    background-color: #fff;
    .wechat-group-swiper {
      .wechat-item {
        margin: 0 60px;
        padding: 30px 0;
        .img {
          width: 200px;
          height: 200px;
          margin-right: 30px;
          flex-shrink: 0;
          img {
            height: 100%;
          }
        }
        .detail {
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          .name {
            font-size: 24px;
            color: #666;
            padding-top: 10px;
          }
          .desc {
            font-size: 20px;
            color: #999;
            padding-top: 20px;
          }
        }
      }
    }
  }
  .swiper-button-prev {
    background-image: url("~@/assets/common/icon_right_arrow.png");
    transform: rotate(180deg);
  }
  .swiper-button-next {
    background-image: url("~@/assets/common/icon_right_arrow.png");
  }
  .swiper-button-disabled {
    display: none;
  }
</style>

<template>
  <div>
    <div class="content">
      <mt-swipe :auto="4000" class="banner">
        <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
          <a :href="item.url" v-if="item.type == 1">
            <img :src="item.img" />
          </a>
          <img v-else :src="item.img" alt="" @click="goGoodsDetail(item.id)">
        </mt-swipe-item>
      </mt-swipe>
      <div class="activity" v-for="(item,index) in activity" :key="index">
        <a :href="item.url" v-if="item.type == 1">
          <img :src="item.img" alt="">
        </a>
        <img v-else :src="item.img" alt="" @click="goGoodsDetail(item.id)">
      </div>
      <ul>
        <li class="row1" v-for="(item, index) in imgList" :key="index">
          <img @click="switchImg(item, index)" :src="item.img" alt="">
          <v-popup-list v-model="item.visible" :goods="item" @all="goGoodsList" @close="item.visible = false"></v-popup-list>
        </li>
      </ul>
    </div>
    <div class="buttons flex">
      <div class="btn"><img src="@/assets/home/button_home.png" alt=""></div>
      <button class="btn-txt btn-txt1" @click="goGoodsList()">全部作品</button>
      <button class="btn-txt btn-txt2" @click="$router.push({name:'freebuy'})">无忧购</button>
      <div class="btn" @click="goMypage()"><img :src="getUserInfo.avatar" alt=""></div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { mapMutations, mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        activeIndex: -1,
        bannerList: [],
        activity: [],
        imgList: []
      };
    },
    created() {
      this.fetchData();
    },
    computed: {
      ...mapGetters(['token', 'getUserInfo'])
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      fetchData() {
        this.ajax({
          name: 'index'
        }).then(res => {
          this.bannerList = res.banners.list;
          this.imgList = res.series;
          this.activity = res.banners.single;
          this.imgList.forEach(item => {
            this.$set(item, 'visible', false);
          });
        });
      },
      switchImg(item, index) {
        let temp = item.visible;
        this.imgList.forEach(img => {
          img.visible = false;
        });
        item.visible = !temp;
        setTimeout(() => {
          let top = $('.content').scrollTop();
          let rect = $('.popup').get(index).getBoundingClientRect();
          let resultTop = top + rect.top - $(window).height() / 2 + rect.height / 2;
          $('.content').stop(true, true).animate({
            scrollTop: resultTop + 'px'
          }, 200);
        }, 300);
      },
      goGoodsList(goodsType = '') {
        this.setCommon({ goodsType });
        this.$router.push({ name: 'goodslist' });
      },
      goMypage() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: 'index' } });
          return false;
        }
        this.$router.push({ name: 'mypage' });
      },
      goGoodsDetail(goodsId) {
        this.setCommon({ goodsId });
        this.$router.push({ name: 'goodsdetail' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .banner {
    height: 450px;
  }

  .activity {
    height: 120px;
    border-bottom: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    img {
      height: 100%;
    }
  }

  li {
    img {
      height: 220px;
    }
  }

  .buttons {
    position: absolute;
    width: 100%;
    bottom: 0;
    justify-content: center;
    padding: 24px 0;
    .btn {
      width: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
    .btn-txt {
      width: 160px;
      height: 60px;
      border-radius: 30px;
      background-color: rgba(255, 255, 255, 0.6);
      border: 0;
      &1 {
        margin: 0 24px 0 91px;
      }
      &2 {
        margin: 0 91px 0 24px;
      }
    }
  }
</style>

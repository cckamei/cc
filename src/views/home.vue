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
    <v-footer></v-footer>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { mapMutations, mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        bannerList: [],
        activity: [],
        imgList: []
      };
    },
    created() {
      this.fetchData();
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
      goGoodsDetail(goodsId) {
        this.setCommon({ goodsId });
        this.$router.push({ name: 'goodsdetail', params: { id: goodsId } });
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
</style>

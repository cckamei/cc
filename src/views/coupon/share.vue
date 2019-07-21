<template>
  <div class="share">
    <img :src="src" alt="">
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        src: ''
      };
    },
    created() {
      this.cardShareURL();
    },
    computed: {
      ...mapState(['shareCard'])
    },
    methods: {
      ...mapActions(['ajax']),
      cardShareURL() {
        this.ajax({
          name: 'cardShareURL',
          data: this.shareCard
        }).then(res => {
          // this.src = '.' + res.share_img_url;
          this.src = window.htp.apihost + res.share_img_url;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .share {
    background-color: #fff;
    overflow: auto;
  }

  @media screen and (orientation: portrait) {
    img {
      position: absolute;
      bottom: 0;
    }
  }
</style>

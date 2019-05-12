<template>
  <div class="card-wrap" :class="{expired: card.status === 1}">
    <div class="card-name">{{card.name}}</div>
    <div class="card-discount"><span>{{card.discount}}</span>&nbsp;&nbsp;&nbsp;折</div>
    <div class="card-scope">适用范围：{{scope}}</div>
    <div class="card-period">有效期 {{formatDate(card.starttime, 'yyyy-MM-dd')}} 至 {{formatDate(card.endtime, 'yyyy-MM-dd')}}</div>
    <div class="share" v-if="card.status !== 1" @click.stop="copy(card.starttime)">分享</div>
  </div>
</template>

<script>
  import { formatDate } from '@/utils';
  import { mapActions } from 'vuex';

  export default {
    props: {
      card: {
        type: Object
      }
    },
    computed: {
      scope() {
        if(this.card.use_type_range) {
          let text = this.card.use_type_range.join('、');

          switch(this.card.use_type) {
            case 0: text = '全部商品'; break;
            case 1: text += '套系'; break;
            case 2: text += '款式'; break;
            case 3: text += '镶嵌方式'; break;
            default: text = '';
          }
          return text;
        } else {
          return '';
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      formatDate,
      copy(txt) {
        this.ajax({
          name: 'cardShareURL',
          data: {
            url: '',
            type: 1
          }
        }).then(res => {
          this.$copyText(res.share_img_url).then(() => {
            this.toast('已经复制到剪贴板');
          }).catch(() => {
            this.toast('复制失败');
          });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .card-wrap {
    position: relative;
    padding: 0 30px;
    height: 264px;
    background: ~"url('~@/assets/card/bg_card.png') no-repeat 100% 100% / 100% 100%";
    color: #fff;
    &.expired {
      background: ~"url('~@/assets/card/bg_card_g.png') no-repeat 100% 100% / 100% 100%";
    }
    .card-name {
      height: 60px;
      line-height: 60px;
    }
    .card-discount {
      padding-top: 10px;
      padding-bottom: 20px;
      span {
        font-size: 60px;
      }
    }
    .card-scope {
      font-size: 20px;
      padding-bottom: 10px;
    }
    .card-period {
      font-size: 20px;
      padding-bottom: 30px;
    }
    .share {
      position: absolute;
      top: 100px;
      right: 42px;
      width: 80px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      font-size: 20px;
      color: #fa7878;
      background-color: #fff;
      text-align: center;
    }
  }
</style>

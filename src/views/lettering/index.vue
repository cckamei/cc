<template>
  <div class="pt pb">
    <v-header>刻字定制</v-header>
    <div class="content">
      <div class="preview">
        <img src="@/assets/lettering/pic_ring_i.png" alt="">
        <span class="notes">※图片效果仅供参考，请以实物为准</span>
      </div>
      <div class="gap"></div>
      <ul class="section">
        <li v-for="(item, index) in letteringValues" :key="index">
          <div class="row">
            <v-form-input v-if="item.type === 2" v-model="value1" :arrow="true" :label="'刻字元素' + ['（左）','（中）','（右）'][index]" placeholder="添加刻字元素（可选）" @input-click="$router.push({name: 'letteringedit', params: {index}})"></v-form-input>
            <v-form-input v-else v-model="value1" :arrow="true" :label="'刻字元素' + ['（左）','（中）','（右）'][index]" placeholder="修改" @input-click="$router.push({name: 'letteringedit', params: {index}})"></v-form-input>
          </div>
          <div class="item-wrapper flex" v-if="item.type !== 2">
            <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
            <div class="detail flex-auto flex">
              <div class="detail-row flex">
                <div class="col">类型：{{letteringLabels.type[item.type]}}</div>
                <div class="col" v-if="item.type === 0">字体：{{letteringLabels.font[item.font]}}</div>
                <div class="col" v-else>主题：{{letteringLabels.subject[item.subject]}}</div>
              </div>
              <div class="detail-row flex">
                <div class="col" v-if="item.type === 0">内容：{{item.content}}</div>
                <div class="col" v-else-if="item.subject === 0">内容：{{letteringLabels.constellation[item.constellation]}}</div>
                <div class="col" v-else>内容：{{letteringLabels.zodiac[item.zodiac]}}</div>
              </div>
            </div>
          </div>
          <div class="gap"></div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(['confirmorder', 'packageorder'].includes(from.name)) {
          const { type, index } = vm.$route.params;
          let goods = {};
          if(type === 'package') {
            goods = vm.package.goods_list[index];
          } else {
            goods = vm.cart[index];
          }
          if(goods.lettering) {
            vm.setLetteringValues(goods.lettering);
          } else {
            vm.setLetteringValues([{ type: 2 }, { type: 2 }, { type: 2 }]);
          }
        }
      });
    },
    data() {
      return {
        value1: ''
      };
    },
    computed: {
      ...mapState(['cart', 'package', 'letteringValues', 'letteringLabels']),
      isActive() {
        return this.letteringValues.some(item => item.type !== 2);
      }
    },
    methods: {
      ...mapMutations(['setLetteringValues', 'setCart', 'setPackage']),
      ...mapActions(['ajax']),
      handleConfirm() {
        const { type, index } = this.$route.params;
        let goods = {};
        if(type === 'package') {
          goods = this.package;
          goods.goods_list[index].lettering = this.letteringValues;
          this.setPackage(goods);
        } else {
          goods = this.cart;
          goods[index].lettering = this.letteringValues;
          this.setCart(goods);
        }
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .preview {
    position: relative;
    height: 400px;
    text-align: center;
    .notes {
      position: absolute;
      bottom: 30px;
      font-size: 20px;
      color: #999;
      width: 100%;
      left: 0;
      text-align: center;
    }
  }

  .section {
    background-color: #fff;
    .row {
      height: 96px;
      padding: 0 20px;
    }

    .item-wrapper {
      background-color: #fff;
      padding: 30px 40px;
      align-items: stretch;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      .img {
        width: 120px;
        height: 120px;
        margin-right: 40px;
        flex-shrink: 0;
        background-color: #f5f5f5;
        img {
          height: 100%;
        }
      }
      .detail {
        flex-direction: column;
        position: relative;
        align-items: flex-start;
        justify-content: center;
        .detail-row {
          font-size: 24px;
          color: #333;
          width: 100%;
          &:last-child {
            padding-top: 10px;
          }
          .col {
            width: 50%;
          }
        }
      }
    }
  }

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

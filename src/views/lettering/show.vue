<template>
  <div class="pt pb">
    <v-header>刻字定制</v-header>
    <div class="content">
      <div class="preview">
        <img :src="item.show_img" v-for="(item, index) in letteringList" :key="index" v-if="item.show_img" alt="">
        <span class="notes">※图片效果仅供参考，请以实物为准</span>
      </div>
      <div class="gap"></div>
      <ul class="section">
        <li v-for="(item, index) in letteringList" :key="index">
          <div class="row">
            <v-form-input v-if="item.name_type" :readonly="true" v-model="value1" :label="'刻字元素' + ['（左）','（中）','（右）'][index]" placeholder=""></v-form-input>
            <v-form-input v-else v-model="value1" :readonly="true" :label="'刻字元素' + ['（左）','（中）','（右）'][index]" placeholder=""></v-form-input>
          </div>
          <div class="item-wrapper flex" v-if="item.name_type">
            <div class="img"><img :src="item.list_img" alt=""></div>
            <div class="detail flex-auto flex">
              <div class="detail-row flex">
                <div class="col">类型：{{item.name_type}}</div>
                <div class="col" v-if="item.name_type === '文字'">字体：{{item.classify}}</div>
                <div class="col" v-else>主题：{{item.classify}}</div>
              </div>
              <div class="detail-row flex">
                <div class="col">内容：{{item.name_type === '文字' ? item.content : item.classify_content}}</div>
              </div>
            </div>
          </div>
          <div class="gap"></div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn active" @click="handleConfirm()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        value1: '',
        letteringList: [{}, {}, {}]
      };
    },
    computed: {
      ...mapGetters(['getOrderId'])
    },
    created() {
      this.showLettering();
    },
    methods: {
      ...mapActions(['ajax']),
      showLettering() {
        this.ajax({
          name: 'showLettering',
          data: {
            order_id: this.getOrderId,
            goods_id: this.$route.params.id,
            sku_id: this.$route.params.sku_id || ''
          }
        }).then(res => {
          res.aepict_order.sort((item1, item2) => {
            return item1.nums - item2.nums;
          }).forEach(item => {
            this.letteringList.splice(item.nums - 1, 1, item);
          });
        });
      },
      handleConfirm() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .preview {
    background-color: #fff;
    position: relative;
    height: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      padding: 0 10px;
      width: 160px;
    }
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

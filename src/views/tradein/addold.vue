<template>
  <div class="pt pb add-old">
    <v-header class="header">添加旧品</v-header>
    <div class="content">
      <ul class="filter-content">
        <li>
          <div class="title">品牌</div>
          <v-button-radio v-if="brands.length" className="fixwidth" v-model="brandIndex" :cancel="true" :list="brands" keyName="title"></v-button-radio>
        </li>
        <li>
          <div class="title">金信息</div>
          <v-button-radio v-if="golds.length" className="fixwidth" v-model="goldIndex" :cancel="true" :list="golds" keyName="title"></v-button-radio>
        </li>
        <li>
          <div class="title">石信息</div>
          <v-button-radio v-if="stones.length" :smallFS="4" className="fixwidth" v-model="stoneIndex" :cancel="true" :list="stones" keyName="title"></v-button-radio>
        </li>
        <li>
          <div class="title">佩戴分类</div>
          <v-button-radio v-if="wears.length" className="fixwidth" v-model="wearIndex" :cancel="true" :list="wears" keyName="title"></v-button-radio>
        </li>
        <li>
          <div class="title">商品照片</div>
          <a-upload ref="goods-pic" class="picture" accept="image/*" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" :fileList="goodsPicList" @change="handleGoodsPicChange">
            <div v-if="goodsPicList.length <= 9">
              <div class="pic_add"></div>
            </div>
          </a-upload>
        </li>
        <li>
          <div class="title">鉴定证书</div>
          <a-upload ref="certify-pic" class="picture" accept="image/*" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" :fileList="certifyPicList" @change="handleCertifyPicChange">
            <div v-if="certifyPicList.length <= 9">
              <div class="pic_add"></div>
            </div>
          </a-upload>
        </li>
        <li>
          <div class="title">其他票据<span class="txt-lightgray">（保证单/发票/标签）</span></div>
          <a-upload ref="other-pic" class="picture" accept="image/*" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" :fileList="otherPicList" @change="handleOtherPicChange">
            <div v-if="otherPicList.length <= 9">
              <div class="pic_add"></div>
            </div>
          </a-upload>
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
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  import $ from 'jquery';

  export default {
    data() {
      return {
        brandIndex: 0,
        brands: [],
        goldIndex: 0,
        golds: [],
        stoneIndex: 0,
        stones: [],
        wearIndex: 0,
        wears: [],
        goodsPicList: [],
        certifyPicList: [],
        otherPicList: []
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      ...mapGetters(['getTradeinOld']),
      isActive() {
        return this.brandIndex !== -1 && this.goldIndex !== -1 && this.stoneIndex !== -1 && this.wearIndex !== -1;
        // && this.goodsPicList.length >= 3 && this.certifyPicList.length >= 3 && this.otherPicList.length >= 3
      }
    },

    created() {
      this.getTradeinOptions();
    },
    mounted() {
      this.$nextTick(() => {
        const $goodsPic = $(this.$refs['goods-pic'].$el);
        const $certifyPic = $(this.$refs['certify-pic'].$el);
        const $otherPic = $(this.$refs['other-pic'].$el);
        $goodsPic.find('.ant-upload-select').appendTo($goodsPic.find('.ant-upload-list-picture-card'));
        $certifyPic.find('.ant-upload-select').appendTo($certifyPic.find('.ant-upload-list-picture-card'));
        $otherPic.find('.ant-upload-select').appendTo($otherPic.find('.ant-upload-list-picture-card'));
      });
    },
    methods: {
      ...mapMutations(['setStoneMade', 'setTradeinOld']),
      ...mapActions(['ajax']),
      getTradeinOptions() {
        return this.ajax({
          name: 'getTradeinOptions'
        }).then(res => {
          this.brands = res.brands;
          this.wears = res.pdlx;
          this.golds = res.jlx;
          this.stones = res.stones;
        });
      },
      handleConfirm() {
        if(this.$route.params.index >= 0) {

        } else {
          const tradeinOld = this.getTradeinOld;
          tradeinOld.push({
            brandIndex: this.brandIndex,
            goldIndex: this.goldIndex,
            stoneIndex: this.stoneIndex,
            wearIndex: this.wearIndex,
            goodsPicList: this.goodsPicList,
            certifyPicList: this.certifyPicList,
            otherPicList: this.otherPicList
          });
          this.setTradeinOld(tradeinOld);
        }
        this.$router.go(-1);
      },
      handleGoodsPicChange({ fileList }) {
        this.goodsPicList = fileList;
      },
      handleCertifyPicChange({ fileList }) {
        this.certifyPicList = fileList;
      },
      handleOtherPicChange({ fileList }) {
        this.otherPicList = fileList;
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    background-color: #fff;
  }

  .filter-content {
    padding: 0 24px;
    overflow: auto;
    height: 100%;
    li {
      padding: 40px 16px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      &:last-child {
        border-bottom: 0;
      }
      .title {
        font-size: 24px;
        color: #666;
      }
      .thumb {
        background-color: #ccc;
      }
      .range-value {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        button {
          border-radius: 40px;
          background-color: #eee;
          font-size: 24px;
          color: #666;
          border: 1px solid #eee; /*no*/
          padding: 0 30px;
          height: 40px;
          width: 240px;
          text-align: left;
          &.txt-right {
            text-align: right;
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
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }
</style>

<style lang="less">
  .add-old {
    .fixwidth {
      min-width: 200px;
    }
    .ant-upload-list-picture-card {
      float: none;
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
      svg {
        font-size: 24px !important;
      }
      .ant-upload-select-picture-card {
        background: url("~@/assets/tradein/pic_add.png") no-repeat;
        background-size: 100% 100%;
        order: 10;
        &:hover {
          border: none;
        }
      }
      .ant-upload-list-item,
      .ant-upload-select {
        width: 200px;
        height: 200px;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 30px;
        font-size: 24px;
        .ant-upload-text,
        .anticon-plus,
        .anticon-delete {
          font-size: 24px;
        }
        .anticon-delete {
          margin-left: 24px;
        }
      }
    }
  }
</style>


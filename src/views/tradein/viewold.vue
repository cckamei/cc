<template>
  <div class="pt add-old">
    <v-header class="header">旧品信息</v-header>
    <div class="content">
      <ul class="filter-content">
        <li>
          <span class="title">品牌：</span><span>{{tradeinViewOld.pp_info.title}}</span>
        </li>
        <li>
          <div class="item">
            <span class="title">金信息：</span><span>{{tradeinViewOld.jlx_info.title}}</span>
          </div>
          <div class="item">
            <span class="title">石信息：</span><span>{{tradeinViewOld.stone_info.title}}</span>
          </div>
          <div class="item">
            <span class="title">佩戴分类：</span><span>{{tradeinViewOld.pdlx_info.title}}</span>
          </div>
        </li>
        <li>
          <div class="title">商品照片</div>
          <a-upload ref="goods-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" @change="handleGoodsPicChange" :showUploadList="{showPreviewIcon: false, showRemoveIcon: false}" :fileList="goodsPicList">
          </a-upload>
        </li>
        <li>
          <div class="title">鉴定证书</div>
          <a-upload ref="certify-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" :fileList="certifyPicList" :showUploadList="{showPreviewIcon: false, showRemoveIcon: false}" @change="handleCertifyPicChange">
          </a-upload>
        </li>
        <li>
          <div class="title">其他票据</div>
          <a-upload ref="other-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" :fileList="otherPicList" :showUploadList="{showPreviewIcon: false, showRemoveIcon: false}" @change="handleOtherPicChange">
          </a-upload>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  import { serialize } from '@/utils';
  import $ from 'jquery';

  export default {
    data() {
      return {
        brandIndex: 0,
        brands: [], //品牌
        goldIndex: 0,
        golds: [], //金信息
        stoneIndex: 0,
        stones: [], //石信息
        wearIndex: 0,
        wears: [], //佩戴分类
        goodsPicList: [], //商品照片
        certifyPicList: [], //鉴定证书
        otherPicList: [] //其他票据
      };
    },
    computed: {
      ...mapState(['stoneMade', 'tradeinViewOld']),
      ...mapGetters(['getTradeinOld'])
    },
    watch: {
      tradeinViewOld: {
        handler(val) {
          this.goodsPicList = val.goods_imgs.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
          this.certifyPicList = val.cert_imgs.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
          this.otherPicList = val.other_imgs_info.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
        },
        immediate: true
      }
    },
    created() {
      this.reqTradeinOptions();
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
      ...mapMutations(['setStoneMade', 'setTradeinOld', 'setTradeinOptions']),
      ...mapActions(['ajax']),
      reqTradeinOptions() {
        return this.ajax({
          name: 'tradeinOptions'
        }).then(res => {
          this.brands = res.brands;
          this.wears = res.pdlx;
          this.golds = res.jlx;
          this.stones = res.stones;
          this.setTradeinOptions({ brands: this.brands, wears: this.wears, golds: this.golds, stones: this.stones });
        });
      },
      handleGoodsPicChange({ fileList }) {
        this.goodsPicList = fileList;
      },
      handleCertifyPicChange({ fileList }) {
        this.certifyPicList = fileList;
      },
      handleOtherPicChange({ file, fileList }) {
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
    overflow: auto;
    height: 100%;
    color: #666;
    li {
      padding: 30px 30px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      .item {
        padding-top: 15px;
        &:first-child {
          padding-top: 0;
        }
      }
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


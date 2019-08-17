<template>
  <div class="pt pb add-old">
    <v-header class="header">添加旧品</v-header>
    <div class="content">
      <ul class="filter-content">
        <li>
          <div class="title">品牌</div>
          <v-button-radio className="fixwidth" v-model="brandIndex" :cancel="true" :list="brands"></v-button-radio>
        </li>
        <li>
          <div class="title">金信息</div>
          <v-button-radio className="fixwidth" v-model="goldIndex" :cancel="true" :list="golds"></v-button-radio>
        </li>
        <li>
          <div class="title">石信息</div>
          <v-button-radio :smallFS="4" className="fixwidth" v-model="stoneIndex" :cancel="true" :list="stones"></v-button-radio>
        </li>
        <li>
          <div class="title">佩戴分类</div>
          <v-button-radio className="fixwidth" v-model="wearIndex" :cancel="true" :list="wears"></v-button-radio>
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
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirmFilter()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  import $ from 'jquery';

  export default {
    data() {
      return {
        brandIndex: 0,
        brands: ['CC卡美', '其它'],
        goldIndex: 0,
        golds: ['黄金', 'K金', '铂金'],
        stoneIndex: 0,
        stones: ['钻石总重<0.5ct', '钻石总重0.5ct-1ct', '钻石总重1ct-0.99ct', '珍珠'],
        wearIndex: 0,
        wears: ['戒指', '耳饰'],
        goodsPicList: [],
        certifyPicList: [],
        otherPicList: []
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      isActive() {
        return this.brandIndex !== -1 && this.goldIndex !== -1 && this.stoneIndex !== -1 && this.wearIndex !== -1;
      }
    },

    created() {
      // this.getStoneOptions();
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
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      // getStoneOptions() {
      //   return this.ajax({
      //     name: 'getStoneOptions',
      //     data: {
      //       gsmh: this.stoneMade.gsmh
      //     }
      //   }).then(res => {
      //     this.weightMin = res.min_weight;
      //     this.weightMax = res.max_weight;
      //     this.weight = this.weightMin;
      //     this.cleaness = res.zhus_jd;
      //     this.colors = res.zhus_color;
      //     this.cuts = res.zhus_qg;
      //     this.certificates = res.zslx;
      //   });
      // },
      handleConfirmFilter() {
        // this.setStoneMade({
        //   S: {
        //     zhusjd: this.cleaness[this.cleanessIndex],
        //     zhusys: this.colors[this.colorIndex],
        //     zhusz: this.weight,
        //     zhusqg: this.cuts[this.cutIndex],
        //     zslx: this.certificates[this.certificateIndex]
        //   }
        // });
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


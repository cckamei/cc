<template>
  <div class="pt pb add-old">
    <v-header class="header">添加旧品
      <div slot="headright" v-if="this.$route.params.index >= 0" @click="deleteConfirmVisible = true">删除</div>
    </v-header>
    <div class="content">
      <ul class="filter-content">
        <li>
          <div class="title">旧品品牌</div>
          <v-button-radio v-if="brands.length" className="fixwidth" v-model="brandIndex" :cancel="true" :list="brands" keyName="title"></v-button-radio>
          <div v-if="brands.length && brands[brandIndex].key === '0002'" class="input-wrapper flex">
            <input v-model="brandName" placeholder="填写品牌名称" />
          </div>
        </li>
        <li>
          <div class="title">旧品金品类</div>
          <v-button-radio v-if="golds.length" className="fixwidth" v-model="goldIndex" :cancel="true" :list="golds" keyName="title"></v-button-radio>
          <div class="input-wrapper flex">
            <input v-model="goldName" placeholder="填写金重量 （单位：克）" />
          </div>
        </li>
        <li>
          <div class="title">旧品宝石种类</div>
          <button :class="['stone-btn', 'fixwidth', {active: stoneType === 0}]" @click="stoneType = 0">钻石</button>
          <div v-if="stoneType === 0" class="input-wrapper flex">
            <input type="number" v-model="diamondMax" placeholder="填写最大一粒钻石重量 （单位：克拉）" />
          </div>
          <div v-if="stoneType === 0" class="input-wrapper flex">
            <input type="number" v-model="diamondOther" placeholder="填写其他钻石合计重量 （单位：克拉）" />
          </div>
          <br>
          <button :class="['stone-btn', 'fixwidth', {active: stoneType === 1}]" @click="stoneType = 1">宝石</button>
          <div v-if="stoneType === 1" class="input-wrapper flex">
            <input type="number" v-model="stoneRed" placeholder="填写红宝石重量 （单位：克拉）" />
          </div>
          <div v-if="stoneType === 1" class="input-wrapper flex">
            <input type="number" v-model="stoneBlue" placeholder="填写蓝宝石重量 （单位：克拉）" />
          </div>
          <div v-if="stoneType === 1" class="input-wrapper flex">
            <input type="number" v-model="stoneOther" placeholder="填写其他石重量 （单位：克拉）" />
          </div>
          <br>
          <button :class="['stone-btn', 'fixwidth', {active: stoneType === 2}]" @click="stoneType = 2">无宝石</button>
        </li>
        <li>
          <div class="title">旧品佩戴小类</div>
          <v-button-radio v-if="wears.length" className="fixwidth" v-model="wearIndex" :cancel="true" :list="wears" keyName="title"></v-button-radio>
          <div v-if="wears.length && wears[wearIndex].key === '2006'" class="input-wrapper flex">
            <input v-model="wearName" placeholder="填写佩戴小类" />
          </div>
        </li>
        <li>
          <div class="title">旧品照片</div>
          <a-upload ref="goods-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" :fileList="goodsPicList" @change="handleGoodsPicChange">
            <div v-if="goodsPicList.length <= 9">
              <div class="pic_add"></div>
            </div>
          </a-upload>
        </li>
        <li>
          <div class="title">旧品鉴定证书照片</div>
          <a-upload ref="certify-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" :fileList="certifyPicList" @change="handleCertifyPicChange">
            <div v-if="certifyPicList.length <= 9">
              <div class="pic_add"></div>
            </div>
          </a-upload>
        </li>
        <li>
          <div class="title">旧品票据照片<span class="txt-lightgray">（保证单/发票/标签）</span></div>
          <a-upload ref="other-pic" class="picture" accept="image/*" action="/api/v1/img_upload_v2" listType="picture-card" :fileList="otherPicList" @change="handleOtherPicChange">
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
    <v-popup-confirm title="" v-model="deleteConfirmVisible" @confirm="handleDelete">
      <div class="txt-center">
        确定删除此商品？
      </div>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
  import { serialize } from '@/utils';
  import $ from 'jquery';

  export default {
    data() {
      return {
        brands: [], //品牌
        brandIndex: 0,
        brandName: '', //品牌名称
        golds: [], //金信息
        goldIndex: 0,
        goldName: '',
        stoneType: 0, //宝石种类
        diamondMax: '',
        diamondOther: '',
        stoneRed: '',
        stoneBlue: '',
        stoneOther: '',
        wears: [], //佩戴分类
        wearIndex: 0,
        wearName: '',
        goodsPicList: [], //商品照片
        certifyPicList: [], //鉴定证书
        otherPicList: [], //其他票据
        deleteConfirmVisible: false
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      ...mapGetters(['getTradeinOld']),
      isActive() {
        return true;
      }
    },
    created() {
      this.reqTradeinOptions();
    },
    mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          const $goodsPic = $(this.$refs['goods-pic'].$el);
          const $certifyPic = $(this.$refs['certify-pic'].$el);
          const $otherPic = $(this.$refs['other-pic'].$el);
          $goodsPic.find('.ant-upload-select').appendTo($goodsPic.find('.ant-upload-list-picture-card'));
          $certifyPic.find('.ant-upload-select').appendTo($certifyPic.find('.ant-upload-list-picture-card'));
          $otherPic.find('.ant-upload-select').appendTo($otherPic.find('.ant-upload-list-picture-card'));
        });
      }, 100);
    },
    methods: {
      ...mapMutations(['setStoneMade', 'setTradeinOld', 'setTradeinOptions']),
      ...mapActions(['ajax']),
      reqTradeinOptions() {
        return this.ajax({
          name: 'tradeinOptions'
        }).then(res => {
          this.brands = res.brands;
          this.golds = res.jlx;
          this.wears = res.pdlx;
          this.setTradeinOptions({ brands: this.brands, wears: this.wears, golds: this.golds });
          const index = this.$route.params.index;
          if(index >= 0) {
            const currentGoods = this.getTradeinOld[index];

            this.brandIndex = currentGoods.brandIndex;
            this.brandName = currentGoods.brandName;

            this.goldIndex = currentGoods.goldIndex;
            this.goldName = currentGoods.goldName;

            this.stoneType = currentGoods.stoneType;
            this.diamondMax = currentGoods.diamondMax;
            this.diamondOther = currentGoods.stoneRed;
            this.stoneRed = currentGoods.diamondOther;
            this.stoneBlue = currentGoods.stoneBlue;
            this.stoneOther = currentGoods.stoneOther;

            this.wearIndex = currentGoods.wearIndex;
            this.wearName = currentGoods.wearName;

            this.goodsPicList = currentGoods.goodsPicList.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
            this.certifyPicList = currentGoods.certifyPicList.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
            this.otherPicList = currentGoods.otherPicList.map((item, index) => ({ name: '1', status: 'done', uid: index, url: item }));
          }
        });
      },
      handleConfirm() {
        const index = this.$route.params.index;

        if(this.brands[this.brandIndex].key === '0002' && !this.brandName.length) {
          this.toast('请填写品牌名称');
          return false;
        }

        if(this.stoneType === 0 && !this.diamondMax.length) {
          this.toast('请填写最大一粒钻石重量');
          return false;
        }

        if(this.wears[this.wearIndex].key === '2006' && !this.wearName.length) {
          this.toast('请填写佩戴小类');
          return false;
        }

        if(!this.goodsPicList.length) {
          this.toast('请选择旧品照片');
          return false;
        }
        if(!this.certifyPicList.length) {
          this.toast('请选择旧品鉴定证书照片');
          return false;
        }
        if(!this.otherPicList.length) {
          this.toast('请选择旧品票据照片');
          return false;
        }

        if(index >= 0) {
          // 编辑
          const tradeinOld = this.getTradeinOld;
          tradeinOld.splice(index, 1, {
            brandIndex: this.brandIndex,
            brandName: this.brandName,
            goldIndex: this.goldIndex,
            goldName: this.goldName,
            stoneType: this.stoneType,
            diamondMax: this.diamondMax,
            diamondOther: this.diamondOther,
            stoneRed: this.stoneRed,
            stoneBlue: this.stoneBlue,
            stoneOther: this.stoneOther,
            wearIndex: this.wearIndex,
            wearName: this.wearName,
            goodsPicList: this.goodsPicList.map(item => item.url || item.response.url),
            certifyPicList: this.certifyPicList.map(item => item.url || item.response.url),
            otherPicList: this.otherPicList.map(item => item.url || item.response.url)
          });
        } else {
          // 新增
          const tradeinOld = this.getTradeinOld;
          tradeinOld.push({
            brandIndex: this.brandIndex,
            brandName: this.brandName,
            goldIndex: this.goldIndex,
            goldName: this.goldName,
            stoneType: this.stoneType,
            diamondMax: this.diamondMax,
            diamondOther: this.diamondOther,
            stoneRed: this.stoneRed,
            stoneBlue: this.stoneBlue,
            stoneOther: this.stoneOther,
            wearIndex: this.wearIndex,
            wearName: this.wearName,
            goodsPicList: this.goodsPicList.filter(item => item.response).map(item => item.response.url),
            certifyPicList: this.certifyPicList.filter(item => item.response).map(item => item.response.url),
            otherPicList: this.otherPicList.filter(item => item.response).map(item => item.response.url)
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
      handleOtherPicChange({ file, fileList }) {
        this.otherPicList = fileList;
      },
      handleDelete() {
        const index = this.$route.params.index;
        const tradeinOld = this.getTradeinOld;
        tradeinOld.splice(index, 1);
        this.setTradeinOld(tradeinOld);
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    background-color: #fff;
  }

  .filter-content {
    padding: 0 24px;
    overflow: auto;
    height: 100%;
    li {
      padding: 40px 16px;
      // border-bottom: 1px solid #f0f0f0; /*no*/
      padding-bottom: 0;
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
  .input-wrapper {
    border-bottom: 1px solid #f0f0f0; /*no*/
    height: 84px;
    input {
      color: #999;
      width: 100%;
    }
  }

  .stone-btn {
    border-radius: 40px;
    background-color: #eee;
    font-size: 24px;
    color: #666;
    border: 1px solid #eee; /*no*/
    padding: 0 10px;
    height: 40px;
    margin-top: 30px;
    &.active {
      background-color: @color3;
      color: @color2;
      border: 1px solid @color2; /*no*/
    }
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


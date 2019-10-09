<template>
  <div class="pt selectstone">
    <v-header class="header">钻石选择</v-header>
    <div class="condition">
      <ul class="flex">
        <li class="flex" @click="filterVisible = !filterVisible">
          <span>筛选</span>
          <div class="arrow-down" :class="{active: filterVisible}"></div>
        </li>
        <li class="flex" @click="$refs.sort.open()">
          <span>排序</span>
          <div class="arrow-down" :class="{active: sortVisible}"></div>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="list-title">推荐精品美钻</div>
      <ul v-if="stoneList.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
        <li v-for="(item, index) in stoneList" :key="index" @click="showStoneConfirm(item, index)" :class="{optimal: item.youx === 'Y'}">
          <div class="item-wrapper flex">
            <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
            <div class="detail flex-auto flex">
              <span class="name">{{ item.zhusz >= 1 ? `${item.zhusz}克拉` : `${+item.zhusz * 100}分`}}; {{item.zhusjd}}; {{item.zhusys}}; {{item.zhusqg}}; {{item.zhuslx}}; {{item.zhusxz}}; {{item.qiege}}; {{item.zhengs}}</span>
              <!-- <span class="desc">{{item.sub_title}}</span> -->
              <div class="line3 flex">
                <div class="price">￥{{item.shouj | currency}}</div>
                <button v-if="!type" class="label btn-txt btn-txt-s">定制{{item.delivery_time}}</button> <span class="count">{{item.count}}件</span>
              </div>
              <div class="cart"></div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="empty">
        <img src="@/assets/stone/icon_dia_n.png" alt=""><br/>
        <div class="label">没有找到符合您要求的钻石</div>
        <div v-if="!type" class="advanced">
          <button class="btn-txt" @click="advanceStone">立即前往</button>
          <div class="tips"><span>“高级定制”</span>全球美钻库,更多专属服务</div>
        </div>
      </div>
      <p v-if="pageInfo.currentPage < pageInfo.totalPage && pageInfo.currentPage === 1" v-show="loading" class="loading more-click" @click="getStoneList">
        <v-split-title>全球美钻库更多选择 点击</v-split-title>
      </p>
      <p v-if="pageInfo.currentPage < pageInfo.totalPage && pageInfo.currentPage > 1" v-show="loading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <v-popup-select ref="sort" title="排序" v-model="sortIndex" :list="sorts" :show.sync="sortVisible" @confirm="handleConfirmSort" />
    <v-popup-confirm2 ref="stone-confirm" @confirm="goBareStone">
      <div class="number flex" v-if="stoneIndex !== -1">
        <span>选择数量</span>
        <div class="flex">
          <div @click="count > 1 && count--" class="btn minus" :class="{active: count > 1}"></div>
          <input v-model="count" type="text" readonly>
          <div @click="count < stoneList[stoneIndex].count && count++" class="btn plus" :class="{active: count < stoneList[stoneIndex].count}"></div>
        </div>
      </div>
    </v-popup-confirm2>
    <div v-show="filterVisible" class="filter-wrapper">
      <ul class="filter-content">
        <template v-if="selectType === 0">
          <li>
            <div class="title">价格区间</div>
            <v-button-radio v-model="simPriceIndex" keyName="name" :list="simPrices" className="fixwidth3"></v-button-radio>
          </li>
          <li>
            <div class="title">石重区间</div>
            <v-button-radio v-model="simWeightIndex" keyName="name" :list="simWeights" className="fixwidth3"></v-button-radio>
          </li>
          <li>
            <div class="title">钻石优选</div>
            <v-button-radio v-model="simOptimalIndex" :list="simOptimals" className="fixwidth3"></v-button-radio>
          </li>
        </template>
        <template v-else>
          <li>
            <div class="title">价位</div>
            <a-slider range v-model="price" :defaultValue="[priceMin, priceMax]" :min="priceMin" :max="priceMax" :step="priceStep"></a-slider>
            <div class="range-value">
              <button>￥{{price[0]}}</button>
              <button class="txt-right">￥{{price[1]}}</button>
            </div>
          </li>
          <li>
            <div class="title">石重区间</div>
            <v-button-radio v-model="weightIndex" keyName="name" :list="weights" className="fixwidth3"></v-button-radio>
          </li>
          <li>
            <div class="title">净度</div>
            <v-button-radio v-model="cleanessIndex" :multiple="true" :list="cleaness" className="fixwidth4"></v-button-radio>
          </li>
          <li>
            <div class="title">颜色</div>
            <v-button-radio v-model="colorIndex" :multiple="true" :list="colors" className="fixwidth4"></v-button-radio>
          </li>
          <li>
            <div class="title">切工</div>
            <v-button-radio v-model="cutIndex" :multiple="true" :list="cuts" className="fixwidth4"></v-button-radio>
          </li>
          <li>
            <div class="title">类型</div>
            <v-button-radio v-model="typeIndex" :list="types" className="fixwidth4"></v-button-radio>
          </li>
          <li>
            <div class="title">形状</div>
            <v-button-radio v-model="shapeIndex" :list="shapes" className="fixwidth3"></v-button-radio>
          </li>
          <li>
            <div class="title">圆钻切割</div>
            <v-button-radio v-model="roundCutIndex" :list="roundCuts" className="fixwidth3"></v-button-radio>
          </li>
          <li>
            <div class="title">钻石证书</div>
            <v-button-radio v-model="certificateIndex" :cancel="true" :list="certificates" className="fixwidth3"></v-button-radio>
          </li>
        </template>
      </ul>
      <div class="filter-footer">
        <div class="btns">
          <button class="btn" :class="{active: isActive}" @click="selectType = Number(!selectType)">{{selectType ? '快捷筛选' : '更多条件'}}</button>
          <button class="btn" :class="{active: isActive}" @click="handleConfirmFilter">立即查找</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        stoneIndex: -1,
        filterVisible: false,
        sortVisible: false,
        sortIndex: -1,
        pageInfo: {},
        loading: false,
        stoneList: [],
        sorts: [
          { label: '价格从低到高', value: 'shouj asc' },
          { label: '价格从高到低', value: 'shouj desc' },
          { label: '钻石重量从低到高', value: 'zhusz asc' },
          { label: '钻石重量从高到低', value: 'zhusz desc' }
        ],
        count: 1,
        selectType: 0, //0快捷选项，1高级选项
        price: [0, 0],//价格
        priceMin: 0,
        priceMax: 0,
        priceStep: 100,
        weights: [],//重量
        weightIndex: -1,
        cleaness: [], //净度
        cleanessIndex: [], //（多选）
        colors: [], //颜色
        colorIndex: [], //（多选）
        cuts: [], //切工
        cutIndex: [], //（多选）
        types: [], //类型
        typeIndex: 0,
        shapes: [], //形状
        shapeIndex: 0,
        roundCuts: [], //圆钻切割
        roundCutIndex: 0,
        certificates: [], //证书
        certificateIndex: -1,
        simPrices: [], //快捷价格
        simPriceIndex: -1,
        simWeights: [], //快捷重量
        simWeightIndex: -1,
        simOptimals: [{ label: '全部', value: 'N' }, { label: '只看优选', value: 'Y' }], //快捷优选
        simOptimalIndex: 0,
        type: 1, //1购买裸石
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      isActive() {
        return true;
      }
    },
    async created() {
      this.type = this.$route.query.type;
      await this.getStoneOptions();
      await this.getStoneSimOptions();
      this.getStoneList();
    },
    methods: {
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      loadMore() {
        this.loading = true;
        if(this.pageInfo.currentPage > 1) {
          this.getStoneList();
        }
      },
      getStoneSimOptions() {
        return this.ajax({
          name: 'getStoneSimOptions',
          data: {
            gsmh: this.stoneMade.gsmh
          }
        }).then(res => {
          this.simPrices = res.prices;
          this.simWeights = res.weights;
          // this.simOptimals = res.youx;
        });
      },
      getStoneOptions() {
        return this.ajax({
          name: 'getStoneOptions',
          data: {
            gsmh: this.stoneMade.gsmh
          }
        }).then(res => {
          this.priceMin = parseInt(res.min_price);
          this.priceMax = parseInt(res.max_price);
          this.price = [this.priceMin, this.priceMax];
          this.weights = res.weights;
          this.cleaness = res.zhus_jd;
          this.colors = res.zhus_color;
          this.cuts = res.zhus_qg;
          this.types = res.zhuslx;
          this.shapes = res.zhusxz;
          this.roundCuts = res.qiege;
          this.certificates = res.zslx;
        });
      },
      getStoneList() {
        let params = {
          page: (this.pageInfo.currentPage || 0) + 1,
          gsmh: this.stoneMade.gsmh,
          jinys: this.stoneMade.jinys,//金类型
          shouc: this.stoneMade.shouc,//手寸
          orderBy: this.sortIndex === -1 ? '' : this.sorts[this.sortIndex].value//排序
        };
        if(!this.type) {
          params.gsmh = this.stoneMade.gsmh;
        }

        let minPrice, maxPrice, minZhusz, maxZhusz;
        if(this.selectType === 0) {
          if(this.simPriceIndex !== -1) {
            const { min, max } = this.simPrices[this.simPriceIndex];
            [minPrice, maxPrice] = [min, max];
          }
          if(this.simWeightIndex !== -1) {
            const { min, max } = this.simWeights[this.simWeightIndex];
            [minZhusz, maxZhusz] = [min, max];
          }
          params.youx = this.simOptimals[this.simOptimalIndex].value;
        } else {
          [minPrice, maxPrice] = this.price;
          if(this.weightIndex !== -1) {
            const { min, max } = this.weights[this.weightIndex];
            [minZhusz, maxZhusz] = [min, max];
          }
          const cleaness = this.cleanessIndex.length ? this.cleaness.filter((item, i) => this.cleanessIndex.includes(i)).map(item => `'${item}'`).join(',') : '';
          const color = this.colorIndex.length ? this.colors.filter((item, i) => this.colorIndex.includes(i)).map(item => `'${item}'`).join(',') : '';
          const cut = this.cutIndex.length ? this.cuts.filter((item, i) => this.cutIndex.includes(i)).map(item => `'${item}'`).join(',') : '';
          const type = this.typeIndex === -1 ? '' : this.types[this.typeIndex];
          const shape = this.shapeIndex === -1 ? '' : this.shapes[this.shapeIndex];
          const roundCut = this.roundCutIndex === -1 ? '' : this.roundCuts[this.roundCutIndex];
          const certificate = this.certificateIndex === -1 ? '' : this.certificates[this.certificateIndex];

          params.zhusjd = cleaness;//主石净度
          params.shusys = color;//主石颜色
          params.zhusqg = cut;//主石切工
          params.zhuslx = type;//主石类型
          params.zhusxz = shape;//主石形状
          params.qiege = roundCut;//圆钻切割
          params.zhengs = certificate;//证书类型
        }

        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
        params.minZhusz = minZhusz;
        params.maxZhusz = maxZhusz;

        this.ajax({
          name: this.type ? 'getBareStoneList' : 'getStoneList',
          data: {
            ...params
            // page: (this.pageInfo.currentPage || 0) + 1,
            // gsmh: this.stoneMade.gsmh,
            // jinys: this.stoneMade.jinys,//金类型
            // shouc: this.stoneMade.shouc,//手寸
            // minPrice, //最小价格
            // maxPrice, //最大价格
            // minZhusz,//最小主石重
            // maxZhusz,//最大主石重
            // zhusjd: cleaness,//主石净度
            // shusys: color,//主石颜色
            // zhusqg: cut,//主石切工
            // zhuslx: type,//主石类型
            // zhusxz: shape,//主石形状
            // qiege: roundCut,//圆钻切割
            // zslx: certificate,//证书类型
            // youx: simOptimal,//优选
            // orderBy: this.sortIndex === -1 ? '' : this.sorts[this.sortIndex].value//排序
          }
        }).then(res => {
          this.pageInfo = {
            currentPage: res.page,
            totalPage: res.pages
          };
          if(this.pageInfo.currentPage == 1) {
            this.stoneList = [];
          }
          setTimeout(() => {
            res.infos.forEach(item => {
              item.shouj = item.price;
            });
            this.stoneList = this.stoneList.concat(res.infos);

            if(this.pageInfo.currentPage < this.pageInfo.totalPage) {
              this.loading = false;
            } else if(this.pageInfo.currentPage != 1) {
              this.toast('没有更多数据了');
            }
          }, 0);
        });
      },
      handleConfirmFilter() {
        this.filterVisible = false;
        this.pageInfo.currentPage = 0;
        this.getStoneList();
      },
      handleConfirmSort(index) {
        this.pageInfo.currentPage = 0;
        this.getStoneList();

      },
      showStoneConfirm(item, index) {
        if(this.type) {
          this.stoneIndex = index;
          this.$refs['stone-confirm'].open();
        } else {
          this.handleSelectStone(item);
        }
      },
      handleSelectStone(item) {
        item.zslx = item.zhengs; //接口字段有变化
        this.setStoneMade({ N: item });
        this.$router.go(-1);
      },
      goBareStone() {
        const item = this.stoneList[this.stoneIndex];
        item.zslx = item.zhengs; //接口字段有变化
        item.count = this.count;
        this.setStoneMade({ B: item });
        this.$router.push({ name: 'bareorder' });
      },
      advanceStone() {
        this.setStoneMade({ S: null });
        this.$router.push({ name: 'advanced' });
      }
    }
  };
</script>

<style lang="less" scoped>
  .pt {
    padding-top: 192px;
    background-color: #fff;
  }

  .selectstone .header {
    box-shadow: none;
  }

  .list-title {
    color: @color2;
    height: 84px;
    line-height: 84px;
    font-size: 30px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0; /*no*/
  }

  .condition {
    top: 96px;
    height: 96px;
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    font-size: 30px;
    color: #999;
    padding: 0 24px;
    box-shadow: 0 10px 50px 10px rgba(170, 170, 170, 0.5);
    z-index: 1;
    ul {
      height: 100%;
      border-top: 1px solid #f0f0f0; /*no*/
      li {
        width: 50%;
        justify-content: center;
        .arrow-down {
          width: 24px;
          height: 24px;
          background: url("~@/assets/goods/icon_arrow_d.png") no-repeat;
          background-size: 100%;
          transition: all 0.2s;
          margin-left: 16px;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .list {
    background-color: #fff;
    position: relative;
    li {
      padding: 0 24px;
      &.optimal {
        background: url("~@/assets/stone/chosen.png") no-repeat right top/80px
          80px;
      }
      .item-wrapper {
        padding: 30px 16px;
        align-items: stretch;
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
          align-items: flex-start;
          position: relative;
          .name {
            font-size: 24px;
            color: #666;
            padding-top: 10px;
          }
          .desc {
            font-size: 20px;
            color: #999;
            padding-top: 24px;
          }
          .line3 {
            position: absolute;
            width: 100%;
            bottom: 10px;
            left: 0;
            align-items: center;
            .price {
              font-size: 24px;
              color: @color4;
              span {
                font-size: 20px;
              }
            }
            .count {
              color: #999;
              padding-left: 20px;
            }
          }
          .cart {
            position: absolute;
            top: 68px;
            right: 0;
            width: 40px;
            height: 40px;
            background: url("~@/assets/goods/icon_cart.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .btn-txt {
      margin-left: 24px;
      &-s {
        width: auto;
      }
    }
  }

  .text {
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 28px;
  }

  .empty {
    text-align: center;
    img {
      width: 240px;
      margin-top: 100px;
      margin-bottom: 40px;
    }
    .label {
      font-size: 24px;
      color: #999;
    }
    .advanced {
      padding-top: 106px;
      width: 100%;
      bottom: 90px;
      text-align: center;
      .btn-txt {
        width: 400px;
        background-color: @color2;
        color: #fff;
        height: 68px;
        font-size: 30px;
        margin-bottom: 40px;
      }
      .tips {
        font-size: 30px;
        color: #999;
        span {
          color: @color2;
        }
      }
    }
  }

  .filter-wrapper {
    position: absolute;
    bottom: 0;
    top: 192px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 96px;
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
    .filter-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 96px;
      .btns {
        padding: 14px 20px;
        display: flex;
        .btn {
          &:first-child {
            background: url("~@/assets/goods/button_gold_l_sku.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 0;
          }
          &:last-child {
            background: url("~@/assets/goods/button_pink_l_sku.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 0;
          }
        }
      }
      box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
    }
  }
  .number {
    color: #666;
    font-size: 30px;
    justify-content: space-between;
    padding: 0 45px;
    height: 310px;
    .btn {
      width: 40px;
      height: 40px;
      &.plus {
        background: url("~@/assets/goods/button_plus_l.png") no-repeat;
        background-size: 100%;
        &.active {
          background: url("~@/assets/goods/button_plus_d.png") no-repeat;
          background-size: 100%;
        }
      }
      &.minus {
        background: url("~@/assets/goods/button_minus_l.png") no-repeat;
        background-size: 100%;
        &.active {
          background: url("~@/assets/goods/button_minus_d.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    input {
      width: 0;
      min-width: 120px;
      color: #666;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>

<style lang="less">
  .selectstone {
    .fixwidth3 {
      min-width: 198px;
    }
    .fixwidth4 {
      min-width: 144px;
    }
    .more-click {
      .title {
        border-top: 1px solid #f0f0f0; /*no*/
        &:after {
          background-color: @color2;
        }
        span {
          color: @color2;
        }
      }
    }
  }
  .ant-slider {
    height: 36px;
    &:hover .ant-slider-track {
      background-color: @color5;
    }
    .ant-slider-rail {
      height: 16px;
      top: 10px;
    }
    .ant-slider-track {
      top: 10px;
      height: 16px;
      background-color: @color5;
    }
    .ant-slider-handle {
      width: 36px;
      height: 36px;
      border: 1px solid #dcdcdc; /*no*/
      margin-left: -18px;
    }
  }
</style>


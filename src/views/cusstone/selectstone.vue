<template>
  <div class="pt selectstone">
    <v-header class="header">主石选择</v-header>
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
      <ul v-if="stoneList.length" class="list">
        <li v-for="(item, index) in stoneList" :key="index" class="flex" @click="showStoneConfirm(index)" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
          <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
          <div class="detail flex-auto flex">
            <span class="name">{{item.zhusz}}克拉; {{item.zhusjd}}; {{item.zhusys}}; {{item.zslx}}证书; {{item.zhusqg}}切工</span>
            <!-- <span class="desc">{{item.sub_title}}</span> -->
            <div class="line3 flex">
              <div class="price">￥{{item.shouj | currency}}</div>
              <button class="label btn-txt btn-txt-s">{{labels[item.fhlx]}}</button>
            </div>
            <div class="cart"></div>
          </div>
        </li>
      </ul>
      <div v-else class="empty">
        <img src="@/assets/stone/icon_dia_n.png" alt=""><br/>
        <div class="label">没有找到符合您要求的钻石</div>
        <div class="advanced">
          <button class="btn-txt" @click="$router.push({name: 'advanced'})">立即前往</button>
          <div class="tips">为您推荐<span>高级定制</span>功能，精心打造理想美钻</div>
        </div>
      </div>
      <p v-if="pageInfo.currentPage < pageInfo.totalPage" v-show="loading" class="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <span>加载中...</span>
      </p>
    </div>
    <v-popup-select ref="sort" title="排序" v-model="sortIndex" :list="sorts" :show.sync="sortVisible" @confirm="handleConfirmSort" />
    <v-popup-confirm2 ref="stone-confirm" @confirm="handleSelectStone">
      <div class="text">确定选择此枚主石？</div>
    </v-popup-confirm2>
    <div v-show="filterVisible" class="filter-wrapper">
      <ul class="filter-content">
        <li>
          <div class="title">价位</div>
          <a-slider range v-model="price" :defaultValue="[priceMin, priceMax]" :min="priceMin" :max="priceMax" :step="priceStep"></a-slider>
          <div class="range-value">
            <button>￥{{price[0]}}</button>
            <button class="txt-right">￥{{price[1]}}</button>
          </div>
        </li>
        <li>
          <div class="title">重量</div>
          <a-slider range v-model="weight" :defaultValue="[weightMin, weightMax]" :min="weightMin" :max="weightMax" :step="weightStep" />
          <div class="range-value">
            <button>{{weight[0]}}克拉</button>
            <button class="txt-right">{{weight[1]}}克拉</button>
          </div>
        </li>
        <li>
          <div class="title">净度</div>
          <v-button-radio v-model="cleanessIndex" :cancel="true" :list="cleaness"></v-button-radio>
        </li>
        <li>
          <div class="title">颜色</div>
          <v-button-radio v-model="colorIndex" :cancel="true" :list="colors"></v-button-radio>
        </li>
        <li>
          <div class="title">切工</div>
          <v-button-radio v-model="cutIndex" :cancel="true" :list="cuts"></v-button-radio>
        </li>
        <li>
          <div class="title">证书类型</div>
          <v-button-radio v-model="certificateIndex" :cancel="true" :list="certificates"></v-button-radio>
        </li>
      </ul>
      <div class="filter-footer">
        <div class="btns">
          <button class="btn" :class="{active: isActive}" @click="handleConfirmFilter">确定</button>
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
          { label: '主石重量从低到高', value: 'zhusz asc' },
          { label: '主石重量从高到低', value: 'zhusz desc' }
        ],
        priceStep: 100,
        priceMin: 0,
        priceMax: 0,
        price: [0, 0],
        weightStep: 0.01,
        weightMin: 0,
        weightMax: 0,
        weight: [0, 0],
        cleanessIndex: -1,
        cleaness: [],
        colorIndex: -1,
        colors: [],
        cutIndex: -1,
        cuts: [],
        certificateIndex: -1,
        certificates: [],
        labels: {
          'A': '现货',
          'B': '定制15天',
          'C': '定制45天'
        }
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      isActive() {
        return true;
      }
    },
    async created() {
      await this.getStoneOptions();
      this.getStoneList();
    },
    methods: {
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      loadMore() {
        this.loading = true;
        this.getStoneList();
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
          this.weightMin = res.min_weight;
          this.weightMax = res.max_weight;
          this.weight = [this.weightMin, this.weightMax];
          this.cleaness = res.zhus_jd;
          this.colors = res.zhus_color;
          this.cuts = res.zhus_qg;
          this.certificates = res.zslx;
        });
      },
      getStoneList() {
        const cleaness = this.cleanessIndex === -1 ? '' : this.cleaness[this.cleanessIndex];
        const color = this.colorIndex === -1 ? '' : this.colors[this.colorIndex];
        const cut = this.cutIndex === -1 ? '' : this.cuts[this.cutIndex];
        const certificate = this.certificateIndex === -1 ? '' : this.certificates[this.certificateIndex];

        this.ajax({
          name: 'getStoneList',
          data: {
            page: (this.pageInfo.currentPage || 0) + 1,
            gsmh: this.stoneMade.gsmh,
            jinys: this.stoneMade.jinys,//金类型
            shouc: this.stoneMade.shouc,//手寸
            minPrice: this.price[0],//最小价格
            maxPrice: this.price[1],//最大价格
            minZhusz: this.weight[0],//最小主石重
            maxZhusz: this.weight[1],//最大主石重
            zhusjd: cleaness,//主石净度
            shusys: color,//主石颜色
            zhusqg: cut,//主石切工
            zslx: certificate,//证书类型
            orderBy: this.sortIndex === -1 ? '' : this.sorts[this.sortIndex].value//排序
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
      showStoneConfirm(index) {
        this.stoneIndex = index;
        this.$refs['stone-confirm'].open();
      },
      handleSelectStone() {
        this.setStoneMade({ N: this.stoneList[this.stoneIndex] });
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    padding-top: 192px;
    background-color: #fff;
  }

  .selectstone .header {
    box-shadow: none;
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
    padding: 0 24px;
    li {
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
        }
        .cart {
          position: absolute;
          top: 68px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: url("~@/assets/goods/icon_cart.png") no-repeat;
          background-size: 100%;
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
      font-size: 30px;
      color: #999;
    }
    .advanced {
      position: absolute;
      width: 100%;
      bottom: 90px;
      text-align: center;
      .btn-txt {
        width: 220px;
        height: 68px;
        font-size: 30px;
        margin-bottom: 40px;
      }
      .tips {
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
      }
      box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
    }
  }
</style>

<style lang="less">
  .ant-slider {
    height: 36px;
    &:hover .ant-slider-track {
      background-color: #ffb4b4;
    }
    .ant-slider-rail {
      height: 16px;
      top: 10px;
    }
    .ant-slider-track {
      top: 10px;
      height: 16px;
      background-color: #ffb4b4;
    }
    .ant-slider-handle {
      width: 36px;
      height: 36px;
      border: 1px solid #dcdcdc; /*no*/
      margin-left: -18px;
    }
  }
</style>


<template>
  <div class="pt pb">
    <v-header>主石定制</v-header>
    <div class="content">
      <div class="gap"></div>
      <div class="stone-header flex">
        <div class="img"><img :src="goods.img" alt=""></div>
        <div class="detail flex-auto flex">
          <span class="name">{{goods.goods_title}}</span>
          <span class="desc">{{goods.sub_title}}</span>
          <div class="line3">
            合计：&nbsp;<span class="price" v-if="goods.price"><span>￥</span>{{goods.price | currency}}</span>
            <span class="txt-lightgray" v-else>全部选定后显示</span>
          </div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row">
        <div class="flex arrow" @click="$refs.materials.open()">
          <div class="label">戒托材质</div>
          <div class="input ellipsis flex" :class="{active: !!material(materialsIndex)}">{{material(materialsIndex) || '请选择戒托材质'}}</div>
        </div>
      </div>
      <div class="row">
        <div class="flex arrow" @click="handleOpenSize">
          <div class="label">戒托手寸</div>
          <div class="input ellipsis flex" :class="{active: !!ringName}">{{ringName || '请选择戒托手寸'}}</div>
        </div>
      </div>
      <!-- <div class="row price">
        <div class="flex">
          <div class="label">戒托价格</div>
          <div class="input ellipsis flex">全部选定后显示</div>
        </div>
      </div> -->
      <div class="gap"></div>
      <div class="row">
        <div class="flex arrow" @click="selectStone">
          <div class="label">选择主石</div>
          <div class="input ellipsis flex"><span v-if="!stoneMade.stone">请选择主石</span></div>
        </div>
      </div>
      <div v-if="stoneMade.stone" class="stone flex">
        <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
        <div class="detail flex-auto flex">
          <div class="detail-row flex">
            <div class="col">重量：{{stoneMade.stone.zhusz}}克拉</div>
            <div class="col">净度：{{stoneMade.stone.jd}}</div>
          </div>
          <div class="detail-row flex">
            <div class="col">颜色：{{stoneMade.stone.ys}}</div>
            <div class="col">证书：{{stoneMade.stone.zslx}}证书</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="flex">
          <div class="label">主石价格</div>
          <div class="input ellipsis flex" :class="{active: false}">全部选定后显示</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="handlePurchase">立即购买</button>
      </div>
    </div>
    <v-popup-confirm2 ref="sizes" title="戒托手寸" class="sizes" :is-confirm="sizeIndex1 !== -1 || sizeIndex2 !== -1" @confirm="handleConfirmSize">
      <div class="section">
        <div class="title">女戒</div>
        <ul class="list flex">
          <li v-for="(item, index) in sizes.ring1" :key="index">
            <button :class="{active: sizeIndex1 === index}" @click="handleSelectRing1(index)">{{item}}</button>
          </li>
        </ul>
      </div>
      <div class="section">
        <div class="title">男戒</div>
        <ul class="list flex">
          <li v-for="(item, index) in sizes.ring2" :key="index">
            <button :class="{active: sizeIndex2 === index}" @click="handleSelectRing2(index)">{{item}}</button>
          </li>
        </ul>
      </div>
    </v-popup-confirm2>
    <v-popup-select ref="materials" title="戒托材质" v-model="materialsIndex" :list="materialList" />
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions, mapState } from 'vuex';

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.name === 'goodsdetail') {
          vm.setStoneMade({
            stone: null,
            materialsIndex: -1,
            selectedSizeIndex1: -1,
            selectedSizeIndex2: -1
          });
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      if(to.name === 'selectstone') {
        this.setStoneMade({
          materialsIndex: this.materialsIndex,
          selectedSizeIndex1: this.selectedSizeIndex1,
          selectedSizeIndex2: this.selectedSizeIndex2
        });
        next();
      }
    },
    data() {
      return {
        goods: {
          img: 'http://pd1957kyq.bkt.clouddn.com/645d3062-c907-11e8-9852-00163e0561b9',
          goods_title: '卡美婚嫁系列-戒指',
          notes: '当前方案需15天完成定制',
          price: 0
        },
        materialsIndex: -1,
        materials: [],
        sizeIndex1: -1,
        sizeIndex2: -1,
        selectedSizeIndex1: -1,
        selectedSizeIndex2: -1,
        colors: { W: '白色', Y: '黄色', R: '玫瑰金' }
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      ringName() {
        if(this.selectedSizeIndex1 !== -1) {
          return '女戒-' + this.sizes.ring1[this.selectedSizeIndex1];
        }
        if(this.selectedSizeIndex2 !== -1) {
          return '男戒-' + this.sizes.ring2[this.selectedSizeIndex2];
        }
        return '';
      },
      isActive() {
        return this.selectedSizeIndex1 !== -1 || this.selectedSizeIndex2 !== -1;
      },
      material() {
        return (index) => {
          if(index !== -1) {
            const thisMaterial = this.materials[index];
            return this.colors[thisMaterial.kt_caizhi_color] + thisMaterial.kt_caizhi + '金';
          } else {
            return '';
          }
        };
      },
      materialList() {
        return this.materials.map((item, index) => {
          return {
            name: this.material(index)
          };
        });
      },
      sizes() {
        if(this.materialsIndex !== -1) {
          const thisMaterial = this.materials[this.materialsIndex];
          return {
            ring1: thisMaterial.shouc_lady.map(val => val + '号'),
            ring2: thisMaterial.shouc_man.map(val => val + '号')
          };
        } else {
          return { ring1: [], ring2: [] };
        }
      }
    },
    created() {
      this.getEmptyRing();
    },
    methods: {
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      handleOpenSize() {
        if(this.materialsIndex === -1) {
          this.toast('请选择戒托材质');
          return false;
        }
        this.$refs.sizes.open();
        this.sizeIndex1 = this.selectedSizeIndex1;
        this.sizeIndex2 = this.selectedSizeIndex2;
      },
      handleConfirmSize() {
        this.selectedSizeIndex1 = this.sizeIndex1;
        this.selectedSizeIndex2 = this.sizeIndex2;
      },
      handleSelectRing1(val) {
        this.sizeIndex1 = val;
        this.sizeIndex2 = -1;
      },
      handleSelectRing2(val) {
        this.sizeIndex2 = val;
        this.sizeIndex1 = -1;
      },
      getEmptyRing() {
        this.ajax({
          name: 'getEmptyRing',
          data: {
            gsmh: this.stoneMade.gsmh
          }
        }).then(res => {
          this.materials = res;
          this.materialsIndex = this.stoneMade.materialsIndex;
          this.selectedSizeIndex1 = this.stoneMade.selectedSizeIndex1;
          this.selectedSizeIndex2 = this.stoneMade.selectedSizeIndex2;
        });
      },
      selectStone() {
        if(!this.ringName) {
          this.toast('请您先选择戒托要求');
          return false;
        }
        this.$router.push({ name: 'selectstone' });
      },
      handlePurchase() { }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .gap {
    height: 20px;
    background-color: #f3f3f3;
  }

  .stone-header {
    padding: 30px 40px 30px 30px;
    background-color: #fff;
    align-items: stretch;
    .img {
      width: 200px;
      height: 200px;
      margin-right: 30px;
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
        justify-content: space-between;
        .price {
          font-size: 30px;
          color: @color4;
          span {
            font-size: 20px;
          }
        }
        .cart {
          width: 40px;
          height: 40px;
          background: url("~@/assets/goods/icon_cart.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .row {
    height: 84px;
    padding: 0 30px;
    background-color: #fff;
    > div {
      width: 100%;
      height: 100%;
      font-size: 30px;
      .label {
        flex-shrink: 0;
        min-width: 30%;
        font-size: 24px;
        color: #666;
      }
      .input {
        color: #999;
        text-align: right;
        width: 100%;
        padding: 0 10px;
        font-size: 24px;
        justify-content: flex-end;
        &.active {
          color: #333;
        }
      }
    }
  }

  .sizes {
    .title {
      padding-top: 30px;
    }
    .section {
      padding-bottom: 40px;
      &:first-child {
        border-bottom: 1px solid #f0f0f0; /*no*/
      }
    }
    ul {
      flex-wrap: wrap;
      button {
        border-radius: 40px;
        background-color: #eee;
        font-size: 24px;
        color: #666;
        border: 1px solid #eee; /*no*/
        padding: 0 30px;
        height: 50px;
        width: 150px;
        margin: 0 16px;
        margin-top: 30px;
        &.active {
          background-color: @color3;
          color: @color2;
          border: 1px solid @color2; /*no*/
        }
      }
    }
  }

  .price {
    margin-top: 1px; /*no*/
  }

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }

  .stone {
    background-color: #fff;
    padding: 30px 16px;
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
</style>

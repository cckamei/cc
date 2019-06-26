<script>
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        materialIndex: -1,
        materialList: [],
        // sizeIndex1: -1,
        // sizeIndex2: -1,
        // selectedSizeIndex1: -1,
        // selectedSizeIndex2: -1,
        sizeIndex: -1,
        selectedSizeIndex: -1,
        colors: { W: '白色', Y: '黄色', R: '玫瑰金' },
        labels: ['现货', '15天', '45天']
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      ringName() {
        // if(this.selectedSizeIndex1 !== -1) {
        //   return '女戒-' + this.sizes.ring1[this.selectedSizeIndex1];
        // }
        // if(this.selectedSizeIndex2 !== -1) {
        //   return '男戒-' + this.sizes.ring2[this.selectedSizeIndex2];
        // }
        if(this.selectedSizeIndex !== -1) {
          return this.sizes.ring[this.selectedSizeIndex];
        }
        return '';
      },
      material() {
        return (index) => {
          if(this.materialList.length && index !== -1) {
            const thisMaterial = this.materialList[index];
            return this.colors[thisMaterial.kt_caizhi_color] + thisMaterial.kt_caizhi + '金';
          } else {
            return '';
          }
        };
      },
      materialItem() {
        return this.materialList.map((item, index) => this.material(index));
      },
      sizes() {
        if(this.materialIndex !== -1) {
          const thisMaterial = this.materialList[this.materialIndex];
          return {
            // ring1: thisMaterial.shouc_lady.map(val => val + '号'),
            // ring2: thisMaterial.shouc_man.map(val => val + '号')
            ring: thisMaterial.shouc.map(val => val + '号'),
          };
        } else {
          // return { ring1: [], ring2: [] };
          return { ring: [] }
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setStoneMade']),
      handleOpenSize() {
        if(!this.checkJieTuo(true)) {
          return false;
        }
        this.$refs.sizes.open();
        // this.sizeIndex1 = this.selectedSizeIndex1;
        // this.sizeIndex2 = this.selectedSizeIndex2;
        this.sizeIndex = this.selectedSizeIndex;
      },
      handleConfirmSize() {
        // this.selectedSizeIndex1 = this.sizeIndex1;
        // this.selectedSizeIndex2 = this.sizeIndex2;
        this.selectedSizeIndex = this.sizeIndex;
      },
      // handleSelectRing1(val) {
      //   this.sizeIndex1 = val;
      //   this.sizeIndex2 = -1;
      // },
      // handleSelectRing2(val) {
      //   this.sizeIndex2 = val;
      //   this.sizeIndex1 = -1;
      // },
      handleSelectRing(val) {
        this.sizeIndex = val;
      },
      getEmptyRing(readback = false) {
        this.ajax({
          name: 'getEmptyRing',
          data: {
            gsmh: this.stoneMade.gsmh
          }
        }).then(res => {
          this.materialList = res;
          if(readback) {
            this.materialIndex = this.stoneMade.materialIndex;
            // this.selectedSizeIndex1 = this.stoneMade.selectedSizeIndex1;
            // this.selectedSizeIndex2 = this.stoneMade.selectedSizeIndex2;
            this.selectedSizeIndex = this.stoneMade.selectedSizeIndex;
          }
        });
      },
      selectStone() {
        if(this.checkJieTuo()) {
          this.setStoneMade({
            jinlx: this.materialItem[this.materialIndex],
            shouc: this.sizes.ring[this.selectedSizeIndex]
          });
          this.$router.push({ name: 'selectstone', params: {} });
        }
      },
      checkJieTuo(materialsOnly = false) {
        if(this.materialIndex === -1) {
          this.toast('请选择戒托材质');
          return false;
        }

        if(!materialsOnly && !this.ringName) {
          this.toast('请您先选择戒托要求');
          return false;
        }
        return true;
      }
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
        .tips {
          padding-bottom: 10px;
          color: @color2;
        }
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

  .bb {
    border-bottom: 1px solid #f0f0f0; /*no*/
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
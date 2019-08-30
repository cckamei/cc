<template>
  <div class="pt pb add-new">
    <v-header>以旧换新</v-header>
    <div class="content">
      <div class="content-wrapper">
        <section class="new-goods">
          <div class="row new-title">
            <v-form-input v-model="value1" :arrow="true" label="新品信息" placeholder="添加新品" @input-click="handleAddNew"></v-form-input>
          </div>
          <ul class="goods">
            <li class="flex" v-for="(item, index) in getTradeinNew" :key="index">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="detail flex-auto flex">
                <div class="line1 flex">
                  <span class="name">{{item.goods_title}}</span>
                  <img class="delete" @click="handleOpenDelete(index)" src="@/assets/tradein/button_delete.png" alt="">
                </div>
                <div class="line2">
                  <span class="desc">{{item.skuLabel}}</span>
                </div>
                <div class="line3 flex">
                  <span class="price">价格：<span>￥</span>{{item.price | currency}}</span>
                  <div class="number">x1</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section class="summary">
          <div class="row pre-price">
            <v-form-input class="pr-0" label="新品总额" :value="'￥' + newPrice" :readonly="true"></v-form-input>
          </div>
          <div class="row pre-price">
            <v-form-input class="freight pr-0" label="补差价额" :value="isGoodsEnough ? '￥' + diffPrice : '所选商品价值较低，请添加新品'" :readonly="true"></v-form-input>
          </div>
        </section>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isGoodsEnough}" @click="isGoodsEnough && handleConfirm()">确定</button>
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
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        value1: '',
        newPrice: 0,
        diffPrice: 0,
        deleteConfirmVisible: false,
        deleteIndex: -1,
        isGoodsEnough: false
      };
    },
    created() {
      this.fetchLogitics();
      this.reqTradeinCalNew();
    },
    computed: {
      ...mapState(['stoneMade']),
      ...mapGetters(['getAddress', 'getTradeinNew', 'getOrderId']),
      totalMoney() {
        let deliveryMoney = 0;
        if(this.delivery.length) {
          deliveryMoney = this.delivery[this.deliveryIndex].price;
        }

        return this.goodsMoney + deliveryMoney;
      }
    },
    methods: {
      ...mapMutations(['clearPayOrder', 'setPayOrder', 'setCommon', 'setTradeinNew']),
      ...mapActions(['ajax']),
      fetchLogitics() {
        this.ajax({ name: 'getLogitics' }).then(res => {
          this.delivery = res;
        });
      },
      handleOpenDelete(index) {
        this.deleteConfirmVisible = true;
        this.deleteIndex = index;
      },
      handleConfirm() {
        this.ajax({
          name: 'tradeinAddNew',
          data: {
            skus: this.getTradeinNew.map(item => item.skuId),
            order_id: this.getOrderId
          }
        }).then(res => {
          this.$router.go(-1);
        });
      },
      handleAddNew() {
        this.setCommon({ isTradein: true });
        this.$router.push({ name: 'goodslist' });
      },
      reqTradeinCalNew() {
        if(this.getTradeinNew.length) {
          this.ajax({
            name: 'tradeinCalNew',
            data: {
              skus: this.getTradeinNew.map(item => item.skuId),
              order_id: this.getOrderId
            }
          }).then(res => {
            // TODO
            this.newPrice = 1000;
            this.diffPrice = 2000;
            this.isGoodsEnough = true;
          });
        } else {
          this.newPrice = 0;
          this.diffPrice = 0;
          this.isGoodsEnough = false;
        }
      },
      handleDelete() {
        const tradeinNew = this.getTradeinNew;
        tradeinNew.splice(this.deleteIndex, 1);
        this.setTradeinNew(tradeinNew);
        this.reqTradeinCalNew();
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .content-wrapper {
    position: relative;
    margin: 20px;
    section {
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 10px;
      overflow: hidden;
      .row {
        height: 84px;
        padding: 0 20px;
      }
      .goods {
        position: relative;
        li {
          background-color: #fff;
          align-items: stretch;
          position: relative;
          border-top: 1px solid #f0f0f0;
          padding: 30px 40px 30px 20px;
          .img {
            width: 120px;
            height: 120px;
            margin-right: 30px;
            flex-shrink: 0;
            img {
              height: 100%;
            }
          }
          .detail {
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            .line1 {
              width: 100%;
              align-items: center;
              justify-content: space-between;
              .name {
                font-size: 24px;
                color: #666;
                padding-top: 10px;
              }
              .delete {
                width: 30px;
                height: 30px;
              }
            }
            .line2 {
              .desc {
                font-size: 20px;
                color: #999;
                padding-top: 24px;
              }
            }
            .line3 {
              position: absolute;
              width: 100%;
              bottom: 0;
              left: 0;
              align-items: center;
              justify-content: space-between;
              .price {
                font-size: 24px;
              }
              .number {
                font-size: 24px;
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    height: 96px;
    background-color: #fff;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

<style lang="less">
  @import "~@/style/vars.less";
  .add-new {
    .row {
      &.new-title .label {
        color: #666;
      }
      > .flex {
        padding-left: 0;
      }
    }
    .pr-0 {
      padding-right: 0;
    }
    .freight {
      input {
        color: @color2;
      }
    }
    .txt-center {
      text-align: center;
      font-size: 28px;
      padding: 40px 0;
    }
  }
</style>

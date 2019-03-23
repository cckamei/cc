<template>
  <div class="goods-detail pb" @click.stop="menusVisible = false">
    <v-header-goods back v-show="top <= 10">
      <div slot="menus" class="menus">
        <div @click="$router.push({name: 'cart'})" class="menu"><img src="~assets/goods/button_cart_r.png" alt=""></div>
          <div class="menu" @click.stop="menusVisible = !menusVisible"><img src="~assets/goods/button_option.png" alt=""></div>
          </div>
    </v-header-goods>
    <v-header-menus back shadow v-show="top > 10">
      <span class="sub-title" :class="{active: top < offsetTops[1]}" @click="setTop(0)">商品</span>
      <span class="sub-title" :class="{active: top >= offsetTops[1] && top < offsetTops[2]}" @click="setTop(1)">详情</span>
      <span class="sub-title" :class="{active: top >= offsetTops[2]}" @click="setTop(2)">推荐</span>
      <div slot="menus" class="menus">
        <div @click="goCart" class="menu"><img src="~assets/goods/button_cart_g.png" alt=""></div>
          <div class="menu" @click.stop="menusVisible = !menusVisible"><img src="~assets/goods/button_option_g.png" alt=""></div>
          </div>
    </v-header-menus>
    <div class="content" @scroll="scroll">
      <mt-swipe :auto="4000" class="banner">
        <mt-swipe-item v-for="(item, index) in res.bannerList" :key="index">
          <img :src="item" />
        </mt-swipe-item>
      </mt-swipe>
      <div class="info">
        <div class="price">
          <i>￥</i>{{(sku.price || res.price) | currency}}
          <img v-if="0" @click="clickShare" class="right" src="~assets/goods/button_share.png" alt="">
        </div>
          <div class="flex tag" v-if="res.tag">
            <button class="tag-btn" v-for="item in res.tag.split(',')">{{item}}</button>
          </div>
          <div class="name">{{res.goods_title}}</div>
          <div class="desc">{{res.sub_title}}</div>
          <ul class="mark flex">
            <li class="flex" v-if="res.is_new"><img src="~assets/goods/icon_hook_mini.png" alt=""><span>新款上架</span></li>
            <li class="flex" v-if="res.is_shop_same"><img src="~assets/goods/icon_hook_mini.png" alt=""><span>专柜同款</span></li>
          </ul>
          <div class="courier">
            <span>快递:{{res.logitics.price | currency}}元</span>
            <span class="right">{{res.cangku}}</span>
          </div>
        </div>
        <template v-if="benifit.length">
          <div class="gap"></div>
          <div class="row">
            <v-form-slide-up label="领取优惠" title="领取优惠">
              <template slot="value">
                <button v-for="card in benifit" v-if="card.use" class="benifit-btn">满{{card.all_money}}减{{card.discount_money}}</button>
              </template>
              <ul>
                <li v-for="(card, index) in benifit">
                  <v-card :card="card"></v-card>
                </li>
              </ul>
            </v-form-slide-up>
          </div>
        </template>
        <template v-if="activity.length">
          <div class="row">
            <v-form-slide-up label="促销活动" title="促销活动">
              <template slot="value">
                <button class="activity-btn">{{activity[0].title}}</button>{{activity[0].desc}}
              </template>
              <ul class="activity">
                <li class="flex" v-for="(item, index) in activity">
                  <button class="activity-btn">{{item.title}}</button>{{item.desc}}
                </li>
              </ul>
            </v-form-slide-up>
          </div>
          <div class="row activity" v-if="activity.length > 1">
            <div class="flex" v-for="(item, index) in activity" v-if="index > 0">
              <button class="activity-btn">{{item.title}}</button>{{item.desc}}
            </div>
          </div>
        </template>
        <div class="gap"></div>
        <div class="row">
          <v-form-slide-up :open.sync="autoOpenSKU" label="商品规格" v-model="sku.selectedSku" :placeholder="`选择 ${isZuan ? '主钻分数；钻石净度；' : '主石名称；主石评级；'}颜色；规格；数量`">
            <ul class="sku">
              <li class="sku-icon flex">
                <img class="icon" :src="res.img" alt="">
                <div>
                  <div class="price"><span>￥</span>{{sku.price || sku.defaultPrice | currency}}</div>
                  <span class="code">商品编号：{{sku.merchantCode || sku.defaultMerchantCode}} &nbsp;&nbsp;&nbsp; 库存：{{sku.stock}}</span>
                </div>
              </li>
              <li>
                <div class="title">{{isZuan ? '主钻分数' : '主石名称'}}</div>
                <v-button-radio v-model="skuIndex.scoreIndex" :list="sku.skuScore" :cancel="true"></v-button-radio>
              </li>
              <li>
                <div class="title">{{isZuan ? '钻石净度' : '主石评级'}}</div>
                <v-button-radio v-model="skuIndex.clarityIndex" :list="sku.skuClarity" :cancel="true"></v-button-radio>
              </li>
              <li>
                <div class="title">颜色</div>
                <v-button-radio v-model="skuIndex.colorIndex" :list="sku.skuColor" :cancel="true"></v-button-radio>
              </li>
              <li>
                <div class="title">规格</div>
                <v-button-radio v-model="skuIndex.specIndex" :list="sku.skuSpec" :cancel="true"></v-button-radio>
              </li>
              <li class="count flex">
                <span>数量</span>
                <div class="flex">
                  <div @click="sku.count > 1 && sku.count--" class="btn minus" :class="{active: sku.count > 1}"></div>
                  <input v-model="sku.count" type="text" readonly>
                  <div @click="sku.count < sku.limit && sku.count++" class="btn plus" :class="{active: sku.count < sku.limit}"></div>
                </div>
              </li>
            </ul>
          </v-form-slide-up>
        </div>
        <div class="row">
          <v-form-slide-up label="商品参数" title="商品参数" placeholder="套系；款式；钻石切工；主钻形状；副钻形状‘副钻分数；镶嵌材质；镶嵌方式">
            <ul class="goods-param">
              <li class="flex">
                <span class="label">商品货号</span>
                <span class="value">{{res.merchant_code}}</span>
              </li>
              <li class="flex">
                <span class="label">套系</span>
                <span class="value">{{res.series}}</span>
              </li>
              <li class="flex">
                <span class="label">款式</span>
                <span class="value">{{res.kuanshi}}</span>
              </li>
              <template v-if="isZuan">
                <li class="flex">
                  <span class="label">钻石切工</span>
                  <span class="value">{{res.zuanshiqiegong}}</span>
                </li>
                <li class="flex">
                  <span class="label">主钻形状</span>
                  <span class="value">{{res.zhuzuanxingzhuang}}</span>
                </li>
                <li class="flex">
                  <span class="label">副钻形状</span>
                  <span class="value">{{res.fuzuanxingzhuang || '无副钻'}}</span>
                </li>
                <li class="flex">
                  <span class="label">副钻分数</span>
                  <span class="value">{{res.fuzuanfenshu || '无副钻'}}</span>
                </li>
              </template>
              <li class="flex">
                <span class="label">镶嵌材质</span>
                <span class="value">{{res.xiangqiancaizhi}}</span>
              </li>
              <li class="flex">
                <span class="label">镶嵌方式</span>
                <span class="value">{{res.xiangqianfangshi}}</span>
              </li>
            </ul>
          </v-form-slide-up>
        </div>
        <div class="gap"></div>
        <div class="row" v-if="res.service.length">
          <v-form-slide-up label="基础服务" title="基础服务" :placeholder="res.service.map(i => i.name).join(';')">
            <ul class="service">
              <li v-for="item in res.service">
                <div class="flex"><img src="~assets/goods/icon_hook_mini.png" alt=""><span>{{item.name}}</span></div>
                <span class="note">{{item.desc}}</span>
              </li>
            </ul>
          </v-form-slide-up>
        </div>
        <div class="row" v-if="res.has_kezi">
          <v-form-slide-up label="刻字定制" title="刻字定制" placeholder="填写您的刻字信息" v-model="lettering.lettering">
            <ul class="lettering">
              <li class="lettering-enable">
                <div class="title">是否刻字</div>
                <v-button-radio v-model="lettering.disable" :list="['是', '否']"></v-button-radio>
              </li>
              <li>
                <div class="title">刻字內容</div>
                <input :disabled="!!lettering.disable" v-model="lettering.text" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的刻字内容（详细描述不超过50个字）">
            </li>
              <li>
                <div class="title">要求</div>
                <input :disabled="!!lettering.disable" v-model="lettering.remarks" class="lettering-text" type="text" maxlength="50" placeholder="请填写您的要求（不超过50个字）">
            </li>
            </ul>
          </v-form-slide-up>
        </div>
        <div class="gap"></div>
        <div ref="image-text" class="section image-text">
          <div class="title flex"><span>图文详情</span></div>
          <div class="image-text-content" v-html="res.detail"></div>
        </div>
        <div class="gap"></div>
        <v-recommend class="section" ref="recommend" title="为你推荐" :list="recommend"></v-recommend>
      </div>
      <div class="footer flex">
        <div class="fun-btns" @click="serviceVisible = true">
          <img src="~assets/goods/button_service.png" alt="">
          <span>客服</span>
        </div>
        <div class="fun-btns" @click="collect">
          <img src="~assets/goods/button_like.png" alt="">
          <span>收藏</span>
        </div>
        <div class="btn-group flex">
          <button class="btn cart" @click="addCart">加入购物车</button>
          <button class="btn purchase" @click="buyNow">立即购买</button>
        </div>
      </div>

      <v-menus v-model="menusVisible" :menus="['home', 'search', 'collect']" name="goodsdetail"></v-menus>
      <v-scroll-top ref="scroll-top" v-model="topVisible" @top="(t)=> top = t"></v-scroll-top>
      <v-popup-confirm title="分享类型" v-model="shareVisible" @confirm="wxShare" :isConfirm="shareIndex !== -1">
        <v-input-radio v-model="shareIndex" :list="['普通分享','员工分享']"></v-input-radio>
      </v-popup-confirm>
      <v-popup-confirm title="" v-model="serviceVisible" @confirm="goCustomService">
        <div class="txt-center">
          即将离开商城，接通您的专属客服。<br>您可以在公众号中回复“人工服务”与客服进行联系与沟通。
      </div>
      </v-popup-confirm>
    </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import $ from 'jquery';
  import { getParams, browser } from '../utils';

  export default {
    data() {
      return {
        menusVisible: false,
        topVisible: false,
        serviceVisible: false,
        top: 0,
        offsetTops: [],
        isZuan: true, //钻石/主石
        res: {
          logitics: {},
          bannerList: [],
          service: []
        },
        skuIndex: {
          scoreIndex: -1,
          clarityIndex: -1,
          colorIndex: -1,
          specIndex: -1
        },
        sku: {
          skuScore: [],
          skuClarity: [],
          skuColor: [],
          skuSpec: [],
          merchantCode: '',
          price: 0,
          defaultSKU: '',
          defaultMerchantCode: '',
          defaultPrice: 0,
          limit: 99,
          count: 1,
          skuId: '',
          selectedSku: '',
          stock: 0 //经销库存
        },
        lettering: { //刻字
          disable: 1,
          text: '',
          remarks: '',
          lettering: ''
        },
        recommend: [], //推荐商品
        benifit: [], //优惠券
        activity: [], //促销活动
        shareIndex: 0, //0普通分享 1员工分享
        shareVisible: false,
        autoOpenSKU: false,
        emp_id: getParams().emp_id || '',
        goodsId: getParams().goodsId || ''
      };
    },
    created() {
      if(this.$route.params.openSKU) {
        this.autoOpenSKU = true;
      }

      if(!this.goodsId) {
        this.goodsId = this.getCommon.goodsId;
      }

      if(!this.goodsId) {
        this.$router.push({ name: 'goodslist' });
      } else {
        this.setCommon({ goodsId: this.goodsId });
      }

      if(this.emp_id) {
        this.setCommon({ emp_id: this.emp_id });
      }

      this.fetchGoodsDetail();
      this.fetchGoodsRecommend();
      this.fetchBenifit();
    },
    mounted() {
      setTimeout(() => {
        let headerHeight = 96 / window.htp.designWidth * window.screen.width;
        this.offsetTops = [0, Math.trunc(this.$refs['image-text'].offsetTop - headerHeight), Math.trunc(this.$refs['recommend'].$el.offsetTop - headerHeight)];
      }, 1000);
    },
    computed: {
      ...mapGetters(['getCommon', 'token', 'userId', 'getUserInfo'])
    },
    watch: {
      skuIndex: {
        handler({ scoreIndex, clarityIndex, colorIndex, specIndex }) {
          let selectIndexes = [scoreIndex, clarityIndex, colorIndex, specIndex];
          [this.sku.skuScore, this.sku.skuClarity, this.sku.skuColor, this.sku.skuSpec].forEach((type, typeIndex) => {
            type.forEach((item, index) => {
              let arr = Object.assign([], selectIndexes);
              arr[typeIndex] = index;
              let reg = new RegExp(arr.join('_').replace(/-1/g, '[\\d]'), 'g');
              let result = this.res.skus.filter(sku => {
                return reg.test(sku.skuIds);
              });
              item.disabled = !result.length;
            });
          });
          if(!selectIndexes.includes(-1)) {
            let { count, price, sku_id, merchant_code } = this.res.skus.filter(sku => selectIndexes.join('_') === sku.skuIds)[0];
            this.sku.limit = count;
            this.sku.count = Math.min(this.sku.count, count);
            this.sku.skuId = sku_id;
            this.sku.price = price;
            this.sku.merchantCode = merchant_code;

            let selectedScore = this.sku.skuScore[scoreIndex].label;
            let selectedClarity = this.sku.skuClarity[clarityIndex].label;
            let selectedSpec = this.sku.skuSpec[specIndex].label;
            let selectedColor = this.sku.skuColor[colorIndex].label;
            this.sku.selectedSku = `${selectedScore};${selectedClarity};${selectedSpec};${selectedColor}`;

            this.getGoodsStock(sku_id, stock => {
              this.sku.stock = stock;
            });
          } else {
            this.sku.limit = 99;
            this.sku.skuId = '';
            // this.sku.merchantCode = '';
            this.sku.selectedSku = '';
            // this.sku.stock = '';
          }
        },
        deep: true
      },
      lettering: {
        handler(val) {
          if(!val.disable) {
            let disable = this.lettering.disable ? '否' : '是';
            this.lettering.lettering = this.lettering.disable ? '' : `刻字 ${this.lettering.text}；要求 ${this.lettering.remarks}`;
          } else {
            this.lettering.lettering = '';
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations(['setCart', 'clearPayOrder', 'setPayOrder', 'setCommon']),
      ...mapActions(['ajax']),
      fetchGoodsDetail() {
        this.ajax({
          name: 'goodsDetail',
          id: this.goodsId
        }).then(res => {
          this.res = res;
          let skuScore = [];
          let skuClarity = [];
          let skuColor = [];
          let skuSpec = [];

          this.isZuan = res.is_diamond;

          res.skus.forEach((item, index) => {
            if(!index) {
              this.sku.defaultSKU = item.sku_id; //默认第1条是默认sku
              this.sku.defaultPrice = item.price;
              this.sku.defaultMerchantCode = item.merchant_code;
              this.getGoodsStock(item.sku_id, stock => {
                this.sku.stock = stock;
              });
            }
            if(this.isZuan) {
              if(item.zhuzuanfenshu) {
                skuScore.push(item.zhuzuanfenshu);
              }
              if(item.zuanshijingdu) {
                skuClarity.push(item.zuanshijingdu);
              }
            } else {
              if(item.zhushimingcheng) {
                skuScore.push(item.zhushimingcheng);
              }
              if(item.zhushipingji) {
                skuClarity.push(item.zhushipingji);
              }
            }
            if(item.color) {
              skuColor.push(item.color);
            }
            if(item.guige) {
              skuSpec.push(item.guige);
            }
          });

          skuScore = [...new Set(skuScore)];
          skuClarity = [...new Set(skuClarity)];
          skuColor = [...new Set(skuColor)];
          skuSpec = [...new Set(skuSpec)];

          res.skus.forEach(item => {
            if(this.isZuan) {
              item.skuIds = [
                skuScore.indexOf(item.zhuzuanfenshu),
                skuClarity.indexOf(item.zuanshijingdu),
                skuColor.indexOf(item.color),
                skuSpec.indexOf(item.guige)
              ].join('_');
            } else {
              item.skuIds = [
                skuScore.indexOf(item.zhushimingcheng),
                skuClarity.indexOf(item.zhushipingji),
                skuColor.indexOf(item.color),
                skuSpec.indexOf(item.guige)
              ].join('_');
            }
          });

          this.sku.skuScore = skuScore.map(item => ({ label: item, disabled: false }));
          this.sku.skuClarity = skuClarity.map(item => ({ label: item, disabled: false }));
          this.sku.skuColor = skuColor.map(item => ({ label: item, disabled: false }));
          this.sku.skuSpec = skuSpec.map(item => ({ label: item, disabled: false }));

          this.res.bannerList = res.slide_img;

          this.wxShare();
        });
      },
      fetchGoodsRecommend() {
        this.ajax({
          name: 'goodsRecommend',
          data: {
            'goods_id': this.goodsId
          }
        }).then(res => {
          this.recommend = res;
        });
      },
      fetchBenifit() {
        this.ajax({
          name: 'coupons',
          data: {
            'goods_id': this.goodsId
          }
        }).then(res => {
          this.benifit = res;
          this.benifit.forEach(item => {
            this.$set(item, 'use', item.already);
          });
        });
      },
      scroll() {
        this.$refs['scroll-top'].scroll();
      },
      setTop(index) {
        $('.content').animate({
          scrollTop: this.offsetTops[index]
        }, 200);
      },
      buyNow() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: 'goodsdetail' } });
          return false;
        }

        if(!this.sku.skuId) {
          this.autoOpenSKU = true;
          return false;
        }

        this.getGoodsStock(this.sku.skuId || this.sku.defaultSKU, stock => {
          this.setCart([{
            cart_id: this.sku.skuId || this.sku.defaultSKU,
            count: this.sku.count,
            goods_id: this.res.goods_id,
            goods_title: this.res.goods_title,
            img: this.res.img,
            price: this.sku.price || this.res.price,
            sub_title: this.res.sub_title,
            limit: stock,
            skuLabel: this.sku.selectedSku,
            has_kezi: this.res.has_kezi,
            kezi: {
              kezi: this.lettering.text,
              yaoqiu: this.lettering.remarks
            }
          }]);
          this.clearPayOrder();
          this.setPayOrder({
            cart_id: this.sku.skuId || this.sku.defaultSKU,
            num: this.sku.count,
            kezi: this.lettering.text,
            kezi_yaoqiu: this.lettering.remarks,
            emp_id: this.getCommon.emp_id
          });
          this.$router.push({ name: 'confirmorder' });
        });
      },
      getGoodsStock(skuId, cb) {
        this.ajax({
          name: 'goodsStock',
          data: {
            sku: skuId
          }
        }).then(res => {
          cb(res.stock);
        });
      },
      collect() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: 'goodsdetail' } });
          return false;
        }

        this.ajax({
          name: 'addCollect',
          data: {
            'collect_id': this.sku.skuId || this.sku.defaultSKU
          }
        }).then(res => {
          this.toast('收藏成功！');
        });
      },
      goCart() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: 'goodsdetail' } });
          return false;
        }

        this.$router.push({ name: 'cart' });
      },
      addCart() {
        if(!this.token) {
          this.$router.push({ name: 'login', params: { name: 'goodsdetail' } });
          return false;
        }

        if(!this.sku.skuId) {
          this.autoOpenSKU = true;
          return false;
        }

        this.ajax({
          name: 'addCart',
          data: {
            'cart_id': this.sku.skuId || this.sku.defaultSKU,
            num: this.sku.count,
            kezi: this.lettering.text,
            yaoqiu: this.lettering.remarks,
            emp_id: this.getCommon.emp_id
          }
        }).then(res => {
          this.toast('已加入购物车');
        });
      },
      clickShare() {
        // if(!this.token) {
        //   this.$router.push({ name: 'login', params: { name: 'goodsdetail' } });
        //   return false;
        // }

        // this.shareVisible = true;
      },
      wxShare() {
        if(!browser().isWeixin) {
          return false;
        }

        let ext = '';
        if(this.getUserInfo.is_distributor && this.userId) {
          ext = `&emp_id=${this.userId}`;
        }
        //微信分享
        window.wx.showOptionMenu();
        // 分享给朋友
        window.wx.onMenuShareAppMessage({
          'imgUrl': this.res.img,
          'link': `${window.location.origin}/?from=wechat#/goodslist/goodssearch/goodsdetail?goodsId=${this.goodsId}${ext}`,
          'title': this.res.goods_title,
          'desc': this.res.sub_title
        });
        // 分享到朋友圈
        window.wx.onMenuShareTimeline({
          'imgUrl': this.res.img,
          'link': `${window.location.origin}/?from=wechat#/goodslist/goodssearch/goodsdetail?goodsId=${this.goodsId}${ext}`,
          'title': this.res.goods_title + ',' + this.res.sub_title
        });
      },
      goCustomService() {
        window.wx.closeWindow();
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .header {
    background-color: transparent !important;
    &.shadow {
      background-color: #fff !important;
    }
  }
  .goods-detail {
    background-color: #fff;
  }

  .content {
    padding-bottom: 120px;
    background-color: #f3f3f3;
  }

  .gap {
    height: 16px;
    background-color: #f3f3f3;
  }

  .sub-title {
    font-size: 30px;
    color: #999;
    padding: 0 20px;
    &.active {
      color: #666;
    }
  }

  .banner {
    height: 600px;
    img {
      height: 100%;
    }
  }

  .info {
    padding: 30px;
    background-color: #fff;
    .price {
      color: @color4;
      font-size: 42px;
      span {
        font-size: 30px;
      }
      img {
        width: 40px;
        height: 40px;
        padding: 20px;
        margin-top: -10px;
      }
    }
    .tag {
      flex-wrap: wrap;
      .tag-btn {
        color: #fff;
        background-color: @color2;
        border-radius: 20px;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        padding: 0 12px;
        margin-right: 20px;
        margin-top: 10px;
      }
    }
    .name {
      padding-top: 30px;
      font-size: 32px;
    }
    .desc {
      padding-top: 18px;
      font-size: 24px;
      color: #999;
    }
    .mark {
      padding-top: 30px;
      li {
        padding-right: 40px;
        font-size: 24px;
        color: @color4;
        img {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }
    .courier {
      padding-top: 30px;
      font-size: 24px;
      color: #666;
    }
  }

  .row {
    height: 84px;
    padding: 0 30px;
    background-color: #fff;
    .benifit-btn {
      border-radius: 18px;
      background-color: #fff;
      font-size: 24px;
      padding: 0 14px;
      height: 36px;
      color: @color2;
      border: 1px solid @color2; /*no*/
      margin-left: 24px;
    }

    &.activity {
      padding-top: 10px;
      height: auto;
      font-size: 24px;
      .flex {
        justify-content: flex-end;
        padding-right: 40px;
        padding-bottom: 30px;
      }
    }
  }

  .sku {
    li {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      &.sku-icon {
        align-items: flex-end;
        border: none;
        .icon {
          width: 200px;
          height: 200px;
          margin-right: 30px;
        }
        .price {
          color: @color4;
          font-size: 42px;
        }
        .code {
          color: #999;
          font-size: 20px;
        }
      }
      &.count {
        color: #666;
        font-size: 24px;
        justify-content: space-between;
        .btn {
          width: 40px;
          height: 40px;
          &.plus {
            background: url("~assets/goods/button_plus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~assets/goods/button_plus_d.png") no-repeat;
              background-size: 100%;
            }
          }
          &.minus {
            background: url("~assets/goods/button_minus_l.png") no-repeat;
            background-size: 100%;
            &.active {
              background: url("~assets/goods/button_minus_d.png") no-repeat;
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
      .title {
        color: #666;
        font-size: 24px;
      }
    }
  }

  .section {
    &.image-text {
      background-color: #fff;
      padding: 0 10px;
      img {
        padding-bottom: 10px;
      }
      p {
        color: #666;
        text-indent: 50px;
        padding: 0 20px 30px 20px;
      }
    }
    .title {
      position: relative;
      height: 84px;
      font-size: 24px;
      color: #ccc;
      width: 100%;
      justify-content: center;
      &:after {
        content: "";
        left: 30px;
        right: 30px;
        height: 1px; /*no*/
        background-color: #f0f0f0;
        display: block;
        top: 50%;
        position: absolute;
      }
      span {
        padding: 0 30px;
        background-color: #fff;
        z-index: 1;
      }
    }
  }

  .footer {
    padding: 0 20px 0 15px;
    height: 96px;
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
    .fun-btns {
      padding: 0 43px;
      font-size: 20px;
      color: #999;
      img {
        width: 40px;
        height: 40px;
        display: block;
      }
    }
    .btn-group {
      font-size: 30px;
      height: 68px;
      width: 440px;
      margin-left: auto;
      .btn {
        color: #fff;
        width: 50%;
        height: 100%;
        font-size: 30px;
        &.cart {
          background: url("~assets/goods/button_cart.png") no-repeat;
          background-size: 100% 100%;
        }
        &.purchase {
          background: url("~assets/goods/button_buynow.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  /*popup内部的里面元素的样式直接放到该页面的根部 否则样式在手机上无效*/
  .activity-btn {
    border-radius: 12px;
    background-color: #fff;
    font-size: 16px;
    padding: 0 12px;
    color: @color4;
    border: 1px solid @color4; /*no*/
    margin-right: 8px;
  }

  .goods-param {
    font-size: 24px;
    li {
      height: 84px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      justify-content: space-between;
      padding: 0 20px;
      &:last-child {
        border-bottom: 0;
      }
      .label {
        color: #999;
      }
      .value {
        color: #666;
      }
    }
  }

  .activity {
    li {
      height: 84px;
      font-size: 24px;
      color: #666;
      padding: 0 20px;
      border-bottom: 1px solid #f0f0f0; /*no*/
      &:last-child {
        border: none;
      }
    }
  }

  .service {
    li {
      padding: 20px;
      font-size: 24px;
      color: #666;
      .note {
        padding-left: 36px;
        font-size: 20px;
        color: #999;
      }
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
  }

  .lettering {
    li {
      padding: 20px;
      font-size: 24px;
      color: #666;
      .lettering-text {
        height: 84px;
        line-height: 84px;
        font-size: 24px;
        color: #999;
        border-bottom: 1px solid #f0f0f0; /*no*/
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
      }
    }
  }
</style>

<style lang="less">
  .txt-center {
    text-align: center;
    font-size: 28px;
    padding: 40px 0;
  }

  .goods-detail {
    .lettering-enable {
      button {
        width: 272px;
      }
    }
    .image-text {
      p {
        color: #666;
        text-indent: 50px;
        padding: 0 20px 30px 20px;
      }

      img {
        display: block;
        width: 100% !important;
        height: auto !important;
      }
    }
  }
</style>


<template>
  <div class="pt pb advanced">
    <v-header>高级定制</v-header>
    <div class="content">
      <div class="gap"></div>
      <div class="stone-header flex">
        <div class="img"><img :src="stoneMade.img" alt=""></div>
        <div class="detail flex-auto flex">
          <span class="name">{{stoneMade.goods_title}}</span>
          <span class="desc"></span>
          <div class="line3">
            <template v-if="stoneMade.stone && stoneMade.stone.shouj">
              <div class="tips" v-if="stoneMade.stone.fhlx == 1">{{labels[+stoneMade.stone.fhlx - 1]}}</div>
              <div class="tips" v-else>当前方案需{{labels[+stoneMade.stone.fhlx - 1]}}完成定制</div>
              合计：&nbsp;<span class="price"><span>￥</span>{{stoneMade.stone.shouj | currency}}</span>
            </template>
            <template v-else>
              合计：&nbsp;<span class="txt-lightgray">全部选定后显示</span>
            </template>
          </div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row">
        <div class="flex arrow" @click="$refs.material.open()">
          <div class="label">戒托材质</div>
          <div class="input ellipsis flex" :class="{active: !!material(materialIndex)}">{{material(materialIndex) || '请选择戒托材质'}}</div>
        </div>
      </div>
      <div class="row">
        <div class="flex arrow" @click="handleOpenSize">
          <div class="label">戒托手寸</div>
          <div class="input ellipsis flex" :class="{active: !!ringName}">{{ringName || '请选择戒托手寸'}}</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row bb form-input">
        <v-form-input label="主石重量" v-model="weight" placeholder="请填写主石重量"></v-form-input>
      </div>
      <div class="row bb">
        <div class="flex arrow" @click="checkJieTuo() && handleOpenCleaness()">
          <div class="label">主石净度</div>
          <div class="input ellipsis flex" :class="{active: !!cleanessList[selectedCleanessIndex]}">{{cleanessList[selectedCleanessIndex] || '请选择主石净度'}}</div>
        </div>
      </div>
      <div class="row bb">
        <div class="flex arrow" @click="checkJieTuo() && handleOpenColor()">
          <div class="label">主石颜色</div>
          <div class="input ellipsis flex" :class="{active: !!colorList[selectedColorIndex]}">{{colorList[selectedColorIndex] || '请选择主石颜色'}}</div>
        </div>
      </div>
      <div class="row">
        <div class="flex arrow" @click="checkJieTuo() && $refs.certificate.open()">
          <div class="label">证书类型</div>
          <div class="input ellipsis flex" :class="{active: !!certificateList[certificateIndex]}">{{certificateList[certificateIndex] || '请选择证书类型'}}</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row form-input">
        <v-form-input label="留言" v-model="comments" placeholder="（选填）请填写您的要求"></v-form-input>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handlePurchase()">提交订单</button>
      </div>
    </div>
    <v-popup-confirm2 ref="sizes" title="戒托手寸" class="sizes" :is-confirm="sizeIndex !== -1" @confirm="handleConfirmSize">
      <ul class="list flex">
        <li v-for="(item, index) in sizes.ring" :key="index">
          <button :class="{active: sizeIndex === index}" @click="handleSelectRing(index)">{{item}}</button>
        </li>
      </ul>
    </v-popup-confirm2>
    <v-popup-select ref="material" title="戒托材质" v-model="materialIndex" :list="materialItem" />
    <v-popup-confirm2 ref="cleaness" title="主石净度" class="sizes" :is-confirm="cleanessIndex !== -1" @confirm="selectedCleanessIndex = cleanessIndex">
      <ul class="list flex">
        <li v-for="(item, index) in cleanessList" :key="index">
          <button :class="{active: cleanessIndex === index}" @click="cleanessIndex = index">{{item}}</button>
        </li>
      </ul>
    </v-popup-confirm2>
    <v-popup-confirm2 ref="color" title="主石颜色" class="sizes" :is-confirm="colorIndex !== -1" @confirm="selectedColorIndex = colorIndex">
      <ul class="list flex">
        <li v-for="(item, index) in colorList" :key="index">
          <button :class="{active: colorIndex === index}" @click="colorIndex = index">{{item}}</button>
        </li>
      </ul>
    </v-popup-confirm2>
    <v-popup-select ref="certificate" title="证书类型" v-model="certificateIndex" :list="certificateList" />
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions, mapState } from 'vuex';
  import minix from './components/mixin';

  export default {
    mixins: [minix],
    data() {
      return {
        weight: '',
        comments: '',
        cleanessIndex: -1,
        selectedCleanessIndex: -1,
        cleanessList: [],
        colorIndex: -1,
        selectedColorIndex: -1,
        colorList: [],
        certificateIndex: -1,
        certificateList: []
      };
    },
    computed: {
      isActive() {
        return this.weight &&
          this.selectedSizeIndex !== -1 &&
          this.cleanessIndex !== -1 &&
          this.colorIndex !== -1 &&
          this.certificateIndex !== -1;
      }
    },
    created() {
      this.getEmptyRing();
      this.getStoneOptions();
    },
    methods: {
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      getStoneOptions() {
        return this.ajax({
          name: 'getStoneOptions',
          data: {
            gsmh: this.stoneMade.gsmh
          }
        }).then(res => {
          // this.priceMin = parseInt(res.min_price);
          // this.priceMax = parseInt(res.max_price);
          // this.price = [this.priceMin, this.priceMax];
          // this.weightMin = res.min_weight;
          // this.weightMax = res.max_weight;
          // this.weight = [this.weightMin, this.weightMax];
          this.cleanessList = res.zhus_jd;
          this.colorList = res.zhus_color;
          // this.cuts = res.zhus_qg;
          this.certificateList = [...res.zslx, '无要求'];
        });
      },
      handleOpenCleaness() {
        if(!this.checkJieTuo(true)) {
          return false;
        }
        this.$refs.cleaness.open();
        this.cleanessIndex = this.selectedCleanessIndex;
      },
      handleOpenColor() {
        if(!this.checkJieTuo(true)) {
          return false;
        }
        this.$refs.color.open();
        this.colorIndex = this.selectedColorIndex;
      },
      handlePurchase() {
        //TODO获取到高级定制的价格
        this.setStoneMade({
          stone: Object.assign(this.stoneMade.stone, { ddlx: 'S' })
        });
        this.$router.push({ name: 'cusstoneorder' });
      }
    }
  };
</script>

<style lang="less">
  .advanced .form-input > div {
    padding: 0;
  }
</style>


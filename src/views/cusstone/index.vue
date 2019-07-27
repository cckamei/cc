<template>
  <div class="pt pb">
    <v-header>{{ddlx === 'S' ? '高级' : '主石'}}定制</v-header>
    <div class="content">
      <div class="gap"></div>
      <div class="stone-header flex">
        <div class="img"><img :src="stoneMade.img" alt=""></div>
        <div class="detail flex-auto flex">
          <span class="name">{{stoneMade.goods_title}}</span>
          <span class="desc"></span>
          <div class="line3">
            <template v-if="stoneMade[this.ddlx] && stoneMade[this.ddlx].shouj">
              <div class="tips" v-if="stoneMade[this.ddlx].fhlx == 1">{{labels[stoneMade[this.ddlx].fhlx]}}</div>
              <div class="tips" v-else>当前方案需{{labels[stoneMade[this.ddlx].fhlx]}}完成定制</div>
              合计：&nbsp;<span class="price"><span>￥</span>{{stoneMade[this.ddlx].shouj | currency}}</span>
            </template>
            <template v-else-if="stoneMade[this.ddlx]">
              <span class="tips">小美暂时无法为您定制此方案，请重新选择~</span>
            </template>
            <template v-else>
              合计：&nbsp;<span class="txt-lightgray">全部选定后显示</span>
            </template>
          </div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row">
        <div class="flex" :class="{arrow: ddlx === 'N'}" @click="ddlx === 'N' && $refs.material.open()">
          <div class="label">戒托材质</div>
          <div class="input ellipsis flex" :class="{active: !!material(materialIndex)}">{{material(materialIndex) || '请选择戒托材质'}}</div>
        </div>
      </div>
      <div class="row">
        <div class="flex" :class="{arrow: ddlx === 'N'}" @click="ddlx === 'N' && handleOpenSize()">
          <div class="label">戒托手寸</div>
          <div class="input ellipsis flex" :class="{active: !!ringName}">{{ringName || '请选择戒托手寸'}}</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row bb">
        <div class="flex arrow" @click="selectStone">
          <div class="label">选择主石</div>
          <div class="input ellipsis flex"><span v-if="!stoneMade[this.ddlx]">请选择主石</span></div>
        </div>
      </div>
      <div v-if="stoneMade[this.ddlx]" class="stone flex">
        <div class="img"><img src="@/assets/stone/pic_dia.png" alt=""></div>
        <div class="detail flex-auto flex">
          <div class="detail-row flex">
            <div class="col">重量：{{stoneMade[this.ddlx].zhusz}}克拉</div>
            <div class="col">净度：{{stoneMade[this.ddlx].zhusjd}}</div>
          </div>
          <div class="detail-row flex">
            <div class="col">颜色：{{stoneMade[this.ddlx].zhusys}}</div>
            <div class="col">证书：{{stoneMade[this.ddlx].zslx}}证书</div>
          </div>
          <div class="detail-row flex">
            <div class="col">切工：{{stoneMade[this.ddlx].zhusqg}}</div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="flex">
          <div class="label">主石价格</div>
          <div class="input ellipsis flex active" v-if="stoneMade[ddlx] && stoneMade[ddlx].shouj">￥{{stoneMade[ddlx].shouj | currency}}</div>
          <div class="input ellipsis flex" v-else-if="stoneMade[ddlx]">当前钻石方案暂无商品</div>
          <div v-else class="input ellipsis flex">全部选定后显示</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="row">
        <v-form-input class="remark" label="留言" v-model="remark" placeholder="（选填）请填写您的要求"></v-form-input>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button v-if="ddlx === 'S'" class="btn" :class="{active: isActive}" @click="isActive && handlePurchase('S')">提交订单</button>
        <button v-else class="btn" :class="{active: isActive}" @click="isActive && handlePurchase('N')">立即购买</button>
      </div>
    </div>
    <!-- <v-popup-confirm2 ref="sizes" title="戒托手寸" class="sizes" :is-confirm="sizeIndex1 !== -1 || sizeIndex2 !== -1" @confirm="handleConfirmSize">
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
    </v-popup-confirm2> -->
    <v-popup-confirm2 ref="sizes" title="戒托手寸" class="sizes" :is-confirm="sizeIndex !== -1" @confirm="handleConfirmSize">
      <ul class="list flex">
        <li v-for="(item, index) in sizes.ring" :key="index">
          <button :class="{active: sizeIndex === index}" @click="handleSelectRing(index)">{{item}}</button>
        </li>
      </ul>
    </v-popup-confirm2>
    <v-popup-select ref="material" title="戒托材质" v-model="materialIndex" :list="materialItem" />
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions, mapState } from 'vuex';
  import minix from './components/mixin';

  export default {
    mixins: [minix],
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.name === 'goodsdetail') {
          vm.setStoneMade({
            N: null,
            S: null,
            materialIndex: -1,
            // selectedSizeIndex1: -1,
            // selectedSizeIndex2: -1
            selectedSizeIndex: -1
          });
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      if(to.name === 'selectstone') {
        this.setStoneMade({
          materialIndex: this.materialIndex,
          // selectedSizeIndex1: this.selectedSizeIndex1,
          // selectedSizeIndex2: this.selectedSizeIndex2
          selectedSizeIndex: this.selectedSizeIndex
        });
        next();
      } else {
        next();
      }
    },
    data() {
      return {
        remark: ''
      }
    },
    computed: {
      isActive() {
        // return (this.selectedSizeIndex1 !== -1 || this.selectedSizeIndex2 !== -1) && this.stoneMade.stone;
        return this.selectedSizeIndex !== -1 && this.stoneMade[this.ddlx] && this.stoneMade[this.ddlx].shouj;
      }
    },
    created() {
      this.ddlx = this.$route.name === 'advanced' ? 'S' : 'N';
      this.getEmptyRing(true);
      if(this.ddlx === 'S' && this.stoneMade.S) {
        this.getStonePrice();
      }
    },
    methods: {
      ...mapMutations(['setStoneMade', 'setAddress', 'setInvoice']),
      ...mapActions(['ajax']),
      getStonePrice() {
        this.ajax({
          name: 'getStonePrice',
          data: {
            gsmh: this.stoneMade.gsmh,
            shouc: this.stoneMade.shouc.replace('#', ''),
            ...this.stoneMade.S
          }
        }).then(res => {
          this.setStoneMade({
            S: {
              ...this.stoneMade.S,
              gsmh: this.stoneMade.gsmh, // 公司模号 必填
              shouc: this.stoneMade.shouc.replace('#', ''),
              shouj: res.price,
              jinys: '', // 金类型
              fhlx: 'C', // 发货类型 # 1：现货 2： 15天 3：45天
            }
          });
        });
      },
      handlePurchase(ddlx) {
        this.setStoneMade({
          remark: this.remark,
          ddlx,
          [this.ddlx]: Object.assign(this.stoneMade[this.ddlx], { ddlx })
        });
        this.setAddress({ type: 0 });
        this.setInvoice({ use: '' });
        this.$router.push({ name: 'cusstoneorder' });
      }
    }
  };
</script>

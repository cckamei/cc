<template>
  <div class="pt pb">
    <v-header>主石定制</v-header>
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
      <div class="row bb">
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
            <div class="col">净度：{{stoneMade.stone.zhusjd}}</div>
          </div>
          <div class="detail-row flex">
            <div class="col">颜色：{{stoneMade.stone.zhusys}}</div>
            <div class="col">证书：{{stoneMade.stone.zslx}}证书</div>
          </div>
          <div class="detail-row flex">
            <div class="col">切工：{{stoneMade.stone.zhusqg}}</div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="flex">
          <div class="label">主石价格</div>
          <div class="input ellipsis flex active" v-if="stoneMade.stone && stoneMade.stone.shouj">￥{{stoneMade.stone.shouj | currency}}</div>
          <div v-else class="input ellipsis flex">全部选定后显示</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handlePurchase()">立即购买</button>
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
            stone: null,
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
    computed: {
      isActive() {
        // return (this.selectedSizeIndex1 !== -1 || this.selectedSizeIndex2 !== -1) && this.stoneMade.stone;
        return this.selectedSizeIndex !== -1 && this.stoneMade.stone;
      }
    },
    created() {
      this.getEmptyRing(true);
    },
    methods: {
      ...mapMutations(['setStoneMade']),
      ...mapActions(['ajax']),
      handlePurchase() {
        this.setStoneMade({
          stone: Object.assign(this.stoneMade.stone, { ddlx: 'N' })
        });
        this.$router.push({ name: 'cusstoneorder' });
      }
    }
  };
</script>

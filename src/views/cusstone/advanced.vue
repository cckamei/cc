<template>
  <div class="pt pb advanced">
    <v-header class="header">主石选择</v-header>
    <div class="content">
      <ul class="filter-content">
        <li>
          <div class="title">重量</div>
          <a-slider v-model="weight" :defaultValue="weightMin" :min="weightMin" :max="weightMax" :step="weightStep" />
          <div class="range-value">
            <button>{{weight}}克拉</button>
          </div>
        </li>
        <li>
          <div class="title">净度</div>
          <v-button-radio className="fixwidth4" v-model="cleanessIndex" :cancel="true" :list="cleaness"></v-button-radio>
        </li>
        <li>
          <div class="title">颜色</div>
          <v-button-radio className="fixwidth4" v-model="colorIndex" :cancel="true" :list="colors"></v-button-radio>
        </li>
        <li>
          <div class="title">切工</div>
          <v-button-radio className="fixwidth4" v-model="cutIndex" :cancel="true" :list="cuts"></v-button-radio>
        </li>
        <li>
          <div class="title">证书类型</div>
          <v-button-radio className="fixwidth3" v-model="certificateIndex" :cancel="true" :list="certificates"></v-button-radio>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirmFilter()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        weightStep: 0.01,
        weightMin: 0,
        weightMax: 0,
        weight: 0,
        cleanessIndex: -1,
        cleaness: [],
        colorIndex: -1,
        colors: [],
        cutIndex: -1,
        cuts: [],
        certificateIndex: -1,
        certificates: []
      };
    },
    computed: {
      ...mapState(['stoneMade']),
      isActive() {
        return this.cleanessIndex !== -1 && this.colorIndex !== -1 && this.cutIndex !== -1 && this.certificateIndex !== -1;
      }
    },
    created() {
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
          this.weightMin = res.min_weight;
          this.weightMax = res.max_weight;
          this.weight = this.weightMin;
          this.cleaness = res.zhus_jd;
          this.colors = res.zhus_color;
          this.cuts = res.zhus_qg;
          this.certificates = res.zslx;
        });
      },
      handleConfirmFilter() {
        this.setStoneMade({
          S: {
            zhusjd: this.cleaness[this.cleanessIndex],
            zhusys: this.colors[this.colorIndex],
            zhusz: this.weight,
            zhusqg: this.cuts[this.cutIndex],
            zslx: this.certificates[this.certificateIndex]
          }
        });
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

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
    box-shadow: 0 -10px 50px 10px rgba(170, 170, 170, 0.5);
  }
</style>

<style lang="less">
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
      border: 1px solid @color5; /*no*/
      margin-left: -18px;
    }
  }

  .advanced {
    .fixwidth3 {
      min-width: 198px;
    }
    .fixwidth4 {
      min-width: 144px;
    }
  }
</style>


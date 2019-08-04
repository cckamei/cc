<template>
  <v-slide-up v-model="visible" title="选择区域" @confirm="handleConfirm">
    <ul class="addChoice">
      <li @click="addRessClick(1)">{{province}}
        <i v-if="chIndex==1"></i>
      </li>
      <li @click="addRessClick(2)">{{city}}
        <i v-if="chIndex==2"></i>
      </li>
      <li @click="addRessClick(3)">{{district}}
        <i v-if="chIndex==3"></i>
      </li>
    </ul>
    <ul class="addList">
      <li v-for="(item,index) in adList" :key="index" :class="{actived: selectedIndex==index}" @click="choice(item,index)">{{item.name}}</li>
    </ul>
  </v-slide-up>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        visible: false,
        code: '0',
        province: '北京市',//省
        city: '北京市',//市
        district: '朝阳区',//区
        chIndex: 1, //省市区选择下划线
        adList: [],//省市区列表
        selectedIndex: -1, //选中的省市区在列表中的index
        cityId: '', //选择的市id
        addId: 1 //1:省份选择; 2:市区； 3：地区
      };
    },
    methods: {
      ...mapActions(["ajax"]),
      open({ province = '北京市', city = '北京市', district = '朝阳区' } = {}) {
        this.visible = true;

        this.chIndex = 1;
        this.addId = 1;
        this.province = province;
        this.city = city;
        this.district = district;
        this.getProvince();
      },
      addRessClick(index) {
        this.chIndex = index;
        this.selectedIndex = -1;
        if(index == 1) {
          this.getProvince();
          this.addId = 1;
        } else if(index == 2 && this.addId == 2) {
          this.getCity();
        } else if(index == 3 && this.addId == 3) {
          this.getDistrict();
        }
      },
      getProvince() {
        this.ajax({
          name: 'getProvince'
        }).then(res => {
          this.adList = res;
        });
      },
      getCity() {
        this.ajax({
          name: 'getCity',
          data: { pre: this.provinceId }
        }).then(res => {
          this.adList = res;
        });
      },
      getDistrict() {
        this.ajax({
          name: 'getDistrict',
          data: { pre: this.cityId }
        }).then(res => {
          this.adList = res;
        });
      },
      choice(item, index) {
        this.selectedIndex = index;
        this.addressId = item.id;
        if(this.addId == 1) {
          this.province = item.name;
          this.addId = 2;
          this.chIndex = 2;
          this.provinceId = item.id;
          this.getCity();
          this.selectedIndex = -1;
        } else if(this.addId == 2) {
          this.city = item.name;
          this.addId = 3;
          this.chIndex = 3;
          this.cityId = item.id;
          this.getDistrict();
          this.selectedIndex = -1;
        } else {
          this.district = item.name;
        }
      },
      handleConfirm() {
        this.visible = false;
        this.$emit('confirm', {
          province: this.province,
          city: this.city,
          district: this.district
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .addChoice {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    border-bottom: 2px solid #f0f0f0;
    li {
      min-width: 92px;
      height: 84px;
      padding: 0 20px;
      color: #666;
      font-size: 24px;
      position: relative;
      i {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        background: @color2;
        min-width: 92px;
        width: 100%;
      }
    }
  }
  .addList {
    margin-top: 10px;
    font-size: 24px;
    overflow-y: auto;
    height: 588px;
    li {
      height: 64px;
      line-height: 64px;
      color: #666;
    }
    .actived {
      color: @color2;
    }
  }
</style>



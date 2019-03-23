<template>
  <v-slide-up v-model="ivisible" title="选择区域" @confirm="confirm()">
    <ul class="addChoice">
      <li @click="active = 1;cityId='';city='';districtId='';district=''">{{province}}
        <i v-if="active==1"></i>
      </li>
      <li @click="active = 2;districtId='';district='';">{{city}}
        <i v-if="active==2"></i>
      </li>
      <!-- <li @click="active = 3&&districts.length">{{district}}
        <i v-if="active==3&&districts.length"></i>
      </li> -->
    </ul>
    <ul class="addList" v-if="active==1&&provinces.length">
      <li v-for="(item,index) in provinces" :key="index" :class="{actived: provinceId==item}" @click="chooseProvice(item)">{{item}}</li>
    </ul>
    <ul class="addList" v-if="active==2 &&citys.length">
      <li v-for="(item,index) in citys" :key="index" :class="{actived: cityId==item}" @click="chooseCity(item)">{{item}}</li>
    </ul>
    <!-- <ul class="addList" v-if="active==3&&districts.length">
      <li v-for="(item,index) in districts" :key="index" :class="{actived: districtId==item}" @click="districtId=item;district=item">{{item}}</li>
    </ul> -->
  </v-slide-up>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: ['value', 'sprovinceId', 'scityId', 'sdistrictId'],
    data() {
      return {
        ivisible: false,
        provinces: [],
        citys: [],
        // districts: [],
        active: 1,
        provinceId: '',
        cityId: '',
        // districtId: '',
        province: '',
        city: '',
        // district: '',
        stores: []
      };
    },
    watch: {
      value(val) {
        this.ivisible = val;
      },
      ivisible(val) {
        this.$emit('input', val);
      }
    },
    created() {
      this.getStores();
    },
    methods: {
      ...mapActions(["ajax"]),
      getStores() {
        this.ajax({
          name: 'getStore'
        }).then(res => {
          this.stores = res;
          this.getProvince();
        });
      },
      getProvince() {
        let set = new Set();
        this.stores.forEach(element => {
          set.add(element.province);
        });
        this.provinces = Array.from(set);
      },
      getCity() {
        let set = new Set();
        this.stores.forEach(element => {
          if(element.province == this.province) {
            if(element.city) {
              set.add(element.city);
            }
          }
        });
        this.citys = Array.from(set);
      },
      // getDistrict() {
      //   let districtsset = new Set();
      //   this.stores.forEach(element => {
      //     if(element.province == this.province && element.city == this.city) {
      //       if(element.street) {
      //         districtsset.add(element.street);
      //       }
      //     }
      //   });
      //   this.districts = Array.from(districtsset);
      // },
      chooseProvice(item) {
        this.province = item;
        this.provinceId = item;
        this.active = 2;
        this.getCity();
      },
      chooseCity(item) {
        this.city = item;
        this.cityId = item;
        // this.active = 3;
        // this.getDistrict();
      },
      confirm() {
        let address = this.province + (this.city.length ? ('-' + this.city) : '');
        this.$emit('confirm', {
          address,
          provinceId: this.province,
          cityId: this.city
          // districtId: this.districtId
        });
      },
      getValue(keyname, arrs, keyvalue) {
        let val = {};
        arrs.forEach(element => {
          if(element[keyname] == keyvalue) {
            val = element;
          }
        });
        return val;
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

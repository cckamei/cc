<template>
  <div class="editaddress pt">
    <v-header>
      {{ isEdit ? "编辑地址" : "添加地址" }}
      <div slot="headright" v-if="isEdit">
        <span class="deleteAddresss" @click="delteAddress()">删除</span>
      </div>
    </v-header>
    <div class="content">
      <ul class="form">
        <li>
          <v-form-input label="姓名" v-model="reqData.name" maxlength="20" placeholder="请填写收货人姓名"></v-form-input>
        </li>
        <li>
          <v-form-input label="手机号" type="tel" v-model="reqData.phone" maxlength="11" placeholder="请填写收货人手机号"></v-form-input>
        </li>
        <li class="address">
          <label>所在地区</label>
          <input type="text" v-model="address" placeholder="请选择收货人所在地区" readonly @click="visible = true">
        </li>
        <li>
          <v-form-input label="详细地址" v-model="reqData.street" maxlength="50" placeholder="请填写街道、楼牌号等信息"></v-form-input>
        </li>
        <li class="address">
          <label>设为默认</label>
          <span><mt-switch v-model="reqData.lock"></mt-switch></span>
        </li>
      </ul>
      <div class="btns fix">
        <button class="btn" :class="{active: isActive}" @click="isActive && confirmSubmit()">保存</button>
      </div>
    </div>
    <v-slide-up v-model="visible" title="选择区域" @confirm="confirm()">
      <ul class="addChoice">
        <li @click="addRessClick(1)">{{reqData.province}}
          <i v-if="chIndex==1"></i>
        </li>
        <li @click="addRessClick(2)">{{reqData.city}}
          <i v-if="chIndex==2"></i>
        </li>
        <li @click="addRessClick(3)">{{reqData.district}}
          <i v-if="chIndex==3"></i>
        </li>
      </ul>
      <ul class="addList">
        <li v-for="(item,index) in adList" :key="index" :class="{actived: selectedIndex==index}" @click="choice(item,index)">{{item.name}}</li>
      </ul>

    </v-slide-up>

    <!-- <button @click="add()">添加地址</button> -->
  </div>

</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        chIndex: 1, //省市区选择下划线
        addId: 1, //1:省份选择; 2:市区； 3：地区
        provinceId: '', //选择的省份id
        cityId: '', //选择的市id
        isEdit: false,
        selectedIndex: -1, //选中的省市区在列表中的index
        visible: false,
        adList: [],
        address: '', //展示给用户的地址
        reqData: {
          phone: '',//手机号
          province: '北京市',//省
          name: '',//姓名
          city: '北京市',//市
          street: '',//街道
          code: '0',
          district: '朝阳区'//区
        },
        addressList: []
      };
    },
    created() {
      let item = this.$route.params.item;
      if(item) {
        this.reqData = item;
        this.isEdit = true;
        this.address = item.province + '-' + item.city + '-' + item.district;
      }
      this.getProvince();
    },
    computed: {
      isActive() {
        return this.reqData.phone && this.reqData.name && this.reqData.street;
      }
    },
    methods: {
      ...mapActions(["ajax"]),
      delteAddress() {
        this.ajax({
          name: 'delAdress',
          data: {
            address_id: this.reqData.id
          }
        }).then(res => {
          this.$router.go(-1);
        });
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
          this.reqData.province = item.name;
          this.addId = 2;
          this.chIndex = 2;
          this.provinceId = item.id;
          this.getCity();
          this.selectedIndex = -1;
        } else if(this.addId == 2) {
          this.reqData.city = item.name;
          this.addId = 3;
          this.chIndex = 3;
          this.cityId = item.id;
          this.getDistrict();
          this.selectedIndex = -1;
        } else {
          this.reqData.district = item.name;
        }

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
      confirm() {
        this.address = this.reqData.province + '-' + this.reqData.city + '-' + this.reqData.district;
      },
      confirmSubmit() {
        if(this.isEdit) {
          this.ajax({
            name: 'setAdress',
            data: Object.assign({}, this.reqData, { default: Number(this.reqData.default), address_id: this.reqData.id })
          }).then(res => {
            this.$router.back(-1);
          });
        } else {
          this.ajax({
            name: 'addAdress',
            data: Object.assign({}, this.reqData, { default: Number(this.reqData.default) })
          }).then(res => {
            this.$router.back(-1);
          });
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~@/style/vars.less";
  .deleteAddresss {
    float: right;
    font-size: 28px;
    color: #999999;
  }
  .editaddress {
    .form {
      background-color: #fff;
      li {
        border-bottom: 1px solid #f0f0f0; /*no*/
        margin: 0 24px;
        height: 96px;
        line-height: 94px;
        font-size: 30px;
        color: #999999;
        &.address {
          padding: 0 16px;
          font-size: 24px;
          color: #666;
          input {
            font-size: 24px;
          }
        }
        &:last-child {
          border-bottom: 0;
        }
        .input {
          height: 100%;
        }

        span {
          float: right;
          margin-top: 28px;
        }
        label {
          float: left;
        }
        input {
          float: right;
          height: 100%;
          text-align: right;
          color: #666;
          font-size: 32px;
        }
      }
    }
  }
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
  .fix {
    position: fixed;
    bottom: 20px;
    width: 710px;
    margin: 0 auto;
  }
</style>

<style lang="less">
  .editaddress {
    .mint-switch-core {
      width: 84px !important;
    }
  }
</style>

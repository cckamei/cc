<template>
  <div class="pt">
    <v-header>{{getAppointment.edit==0?'预约详情':(getAppointment.edit==1?'新增预约':'修改预约')}}
      <div slot="headright" v-if="getAppointment.edit==0" @click="cancelAppoinment">{{getAppointment.appointment.status===2?'':'取消预约'}}</div>
    </v-header>
    <div class="content">
      <div class="reqData-box">
        <ul>
          <li class="section">
            <ul class="form">
              <li>
                <v-form-input label="地区" :arrow="true" v-model="reqData.address" placeholder="请选择您要预约的地区" :readonly="!getAppointment.edit" @input-click="showSelectAddress"></v-form-input>
              </li>
              <li>
                <v-form-select label="门店" title="门店选择" v-model="reqData.shop" :list="shops" :keyName="'label'" placeholder="请选择您要预约的门店" :readonly="!getAppointment.edit" :arrow="true"></v-form-select>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="mt-15">
          <li class="section">
            <ul class="form">
              <li>
                <v-form-datepicker label="预约时间" title="预约时间" v-model="reqData.time" format="yyyy-MM-dd" placeholder="请选择" :startDate="new Date()" :endDate="new Date('2050/01/01')" :readonly="!getAppointment.edit" :arrow="true"></v-form-datepicker>
              </li>
              <li>
                <v-form-select label="预约类型" title="预约类型" v-model="reqData.type" :list="['线下体验', '以旧换新']" placeholder="请选择预约类型" :readonly="!getAppointment.edit" :arrow="true"></v-form-select>
              </li>
              <li class="middle">
                <div class="instructions">补充说明</div>
                <textarea class="textarea" placeholder="请填写预约的具体内容，以便工作人员配合，不超过500字（选填）" v-model="reqData.detail" name="" :readonly="!getAppointment.edit"></textarea>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="mt-15">
          <li class="section">
            <ul class="form">
              <li>
                <v-form-input label="姓名" v-model="reqData.name" placeholder="请填写您的真实姓名" :readonly="!getAppointment.edit"></v-form-input>
              </li>
              <li>
                <v-form-input label="手机" v-model="reqData.tel" type="tel" placeholder="请填写您的真实手机号码" :readonly="!getAppointment.edit"></v-form-input>
              </li>
              <li>
                <v-form-select label="性别" title="性别选择" v-model="reqData.gender" :list="['女','男']" placeholder="请选择您的性别" :readonly="!getAppointment.edit"></v-form-select>
              </li>
              <li>
                <v-form-datepicker label="生日" title="生日日期" v-model="reqData.birthday" format="yyyy-MM-dd" yearFormat="{value} 年" monthFormat="{value} 月" dateFormat="{value} 日" placeholder="请选择生日" :readonly="!getAppointment.edit"></v-form-datepicker>
              </li>
              <li>
                <v-form-select label="职业" title="职业选择" v-model="reqData.occupation" :list="occupations" placeholder="请选择您所从事的职业" :readonly="!getAppointment.edit"></v-form-select>
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="getAppointment.appointment.status!==2">
          <div class="btn-submit" v-if="getAppointment.edit==0" :class="{active: isActive}" @click="isActive && update()">修改预约</div>
          <div class="btn-submit" v-else :class="{active: isActive}" @click="isActive && submit()">确认提交</div>
        </div>
      </div>
      <select-address v-model="visible" :sprovinceId="reqData.provinceId" :scityId="reqData.cityId" :sdistrictId="reqData.districtId" @confirm="confirm"></select-address>
    </div>
    <v-popup-confirm v-model="cancelVisible" @confirm="handleConfirm">
      <div class="text">确定取消此预约？</div>
    </v-popup-confirm>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { formatDate, serialize } from '@/utils';
  import selectAddress from './components/select-address';
  export default {
    components: {
      selectAddress
    },
    data() {
      return {
        empty: '',
        occupations: ['教育工作', '医务工作', '财务工作', '媒体市场', '服务行业', '零售行业', '艺术工作', '技术工作', '公务员'],
        cancelVisible: false,
        reqData: {
          name: '',
          address: '',
          gender: 0,
          tel: '',
          birthday: '',
          type: 1,
          detail: '',
          occupation: 1,
          time: '',
          shop: -1,
          provinceId: '', //选择的省份id
          cityId: '' //选择的市id
        },
        isEdit: true,
        visible: false,
        shops: []
      };
    },
    computed: {
      ...mapGetters(['getAppointment', 'getUserInfo']),
      isActive() {
        if(this.reqData.address) {
          return this.reqData.address.length && this.reqData.name.length && this.reqData.tel.length;
        } else {
          return false;
        }
      }
    },
    mounted() {
      if(this.getAppointment.edit == 1) {
        this.reqData.name = this.getUserInfo.name;
        this.reqData.gender = this.getUserInfo.gender;
        this.reqData.birthday = this.getUserInfo.birthday;
        this.reqData.tel = this.getUserInfo.phone;
        this.reqData.occupation = this.occupations.indexOf(this.getUserInfo.career);
        if(this.getAppointment.type !== 1) {
          this.reqData.type = 0;
        } else {
          this.reqData.type = 1;
        }
        this.getStores();
      }

      if(this.getAppointment.edit == 2) {
        this.getAppointmentDetail();
      }
      if(this.getAppointment.edit == 0) {
        this.getAppointmentDetail();
      }
      console.log(this.getUserInfo);
    },
    methods: {
      ...mapMutations(['setAppointment']),
      ...mapActions(['ajax']),
      getStores() {
        this.ajax({
          name: 'getStore'
        }).then(res => {
          res.forEach(element => {
            this.shops.push({
              label: element.name,
              value: element.id
            });
          });
        });
      },
      getAppointmentDetail() {
        this.ajax({
          name: 'getStore'
        }).then(res => {
          res.forEach(element => {
            this.shops.push({
              label: element.name,
              value: element.id
            });
          });
          let shopIndex = 0;
          this.shops.forEach((ele, i) => {
            if(ele.label == this.getAppointment.appointment.store.name) {
              shopIndex = i;
            }
          });
          let occupation = 0;
          this.occupations.forEach((ele, i) => {
            if(ele == this.getAppointment.appointment.career) {
              occupation = i;
            }
          });
          this.reqData = {
            name: this.getAppointment.appointment.name,
            address: this.getAppointment.appointment.store.province + this.getAppointment.appointment.store.city,
            gender: this.getAppointment.appointment.sex,
            tel: this.getAppointment.appointment.phone,
            birthday: this.getAppointment.appointment.birthday,
            type: this.getAppointment.appointment.type,
            detail: this.getAppointment.appointment.ext,
            occupation: occupation,
            time: this.getAppointment.appointment.appoint_time,
            shop: shopIndex,
            // districtId: '210321', //1:省份选择; 2:市区； 3：地区
            provinceId: '', //选择的省份id
            cityId: '' //选择的市id
          };
        });

      },
      showSelectAddress() {
        this.visible = true;
      },
      confirm(address) {
        this.reqData.provinceId = address.provinceId;
        this.reqData.cityId = address.cityId;
        // this.reqData.districtId = address.districtId;
        this.reqData.address = address.address;
        this.ajax({
          name: 'getStore'
        }).then(res => {
          this.shops = [];
          let shops = res.filter(ele => {
            return ele.province == address.provinceId || ele.city == address.cityId;
          });
          shops.forEach(element => {
            this.shops.push({
              label: element.name,
              value: element.id
            });
          });
          this.reqData.shop = -1;
          console.log(this.reqData.shop);
        });
      },
      submit() {
        if(this.getAppointment.edit == 1) {
          this.addAppointment();
        }
        if(this.getAppointment.edit == 2) {
          this.updateAppointment();
        }

      },
      addAppointment() {
        console.log(this.reqData.type);
        this.ajax({
          name: 'addAppointment',
          data: {
            type: this.reqData.type,
            store: this.shops[this.reqData.shop].value.toString(),
            appoint_time: formatDate(this.reqData.time, 'yyyy-MM-dd'),
            name: this.reqData.name,
            sex: this.reqData.gender,
            career: this.occupations[this.reqData.occupation],
            phone: this.reqData.tel,
            birthday: formatDate(this.reqData.birthday, 'yyyy-MM-dd'),
            ext: this.reqData.detail,
            gender: this.reqData.gender
          }
        }).then(res => {
          this.$router.push({ name: 'bespeak' });
        });
      },
      updateAppointment() {
        this.ajax({
          name: 'updateAppointment',
          data: {
            appoint_id: this.getAppointment.appointment.appoint_id,
            type: this.reqData.type,
            store: this.shops[this.reqData.shop].value.toString(),
            appoint_time: formatDate(this.reqData.time, 'yyyy-MM-dd'),
            name: this.reqData.name,
            sex: this.reqData.gender,
            career: this.occupations[this.reqData.occupation],
            phone: this.reqData.tel,
            birthday: formatDate(this.reqData.birthday, 'yyyy-MM-dd'),
            ext: this.reqData.detail,
            gender: this.reqData.gender
          }
        }).then(res => {
          this.$router.push({ name: 'bespeak' });
        });
      },
      cancelAppoinment() {
        this.cancelVisible = true;

      },
      update() {
        let _reqData = serialize(this.getAppointment.reqData);
        this.setAppointment({
          reqData: _reqData,
          edit: 2
        });
      },
      handleConfirm() {
        this.ajax({
          name: 'cancelAppointment',
          data: {
            appoint_id: this.getAppointment.appointment.appoint_id,
            status: 3
          }
        }).then(res => {
          this.$router.push({ name: 'bespeak' });
        });
      }
    }
  };
</script>


<style lang="less" scoped>
  @import "~@/style/vars.less";
  .mt-15 {
    margin-top: 15px;
  }
  .text {
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 28px;
  }
  .reqData-box {
    padding: 30px 20px;
    .section {
      margin-top: 16px;
      padding: 0 20px;
      background-color: #fff;
      border-radius: 8px;
      &:first-child {
        margin-top: 0;
      }
    }

    .form {
      background-color: #fff;
      li {
        border-bottom: 1px solid #f0f0f0; /*no*/
        height: 96px;
        &:last-child {
          border-bottom: 0;
        }
        .input {
          height: 100%;
        }
        &.middle {
          height: auto;
          padding: 0 20px;
          .instructions {
            color: #666;
            font-size: 24px;
            height: 96px;
            line-height: 96px;
          }
          .textarea {
            background-color: #f5f5f5;
            border-radius: 5px;
            margin: 10px 0;
            height: 240px;
            padding: 15px;
            line-height: 60px;
            font-size: 24px;
          }
        }
      }
    }

    .btn-submit {
      height: 70px;
      line-height: 70px;
      text-align: center;
      margin: 30px 20px;
      background-color: #999;
      font-size: 28px;
      color: #fff;
      border-radius: 30px;
      &.active {
        background-color: @color5;
      }
    }
  }
</style>


<template>
  <div class="pt">
    <v-header back>个人资料</v-header>
    <div class="content">
      <ul>
        <li class="section">
          <ul class="form">
            <li>
              <v-form-input label="昵称*" v-model="reqData.nick_name" maxlength="6" placeholder="请填写您的账户昵称"></v-form-input>
            </li>
            <li>
              <v-form-input label="姓名*" v-model="reqData.name" maxlength="4" placeholder="请填写您的真实姓名"></v-form-input>
            </li>
            <li>
              <v-form-select :arrow="true" label="性别*" title="性别选择" v-model="reqData.gender" :list="['女', '男']" placeholder="请选择您的性别"></v-form-select>
            </li>
            <li>
              <v-form-datepicker :arrow="true" label="生日*" title="生日日期" v-model="reqData.birthday" format="yyyy-MM-dd" yearFormat="{value} 年" monthFormat="{value} 月" dateFormat="{value} 日" placeholder="请选择生日"></v-form-datepicker>
            </li>
            <li>
              <v-form-select label="职业*" :arrow="true" title="职业选择" v-model="career" :list="careerList" placeholder="请选择您所从事的职业"></v-form-select>
            </li>
          </ul>
          <div class="more" v-if="!loadmore" @click="loadmore = true">点击展开填写详细资料获取更多优惠（选填）</div>
        </li>
        <li class="section" v-if="loadmore">
          <ul class="form">
            <li>
              <v-form-input type="tel" label="身份证号" v-model="reqData.idcard" maxlength="20" placeholder="请填写您的身份证号码"></v-form-input>
            </li>
          </ul>
        </li>
        <li class="section" v-if="loadmore">
          <ul class="form">
            <li>
              <v-form-input type="tel" label="中指指圈号" v-model="reqData.zzqh" maxlength="20"></v-form-input>
            </li>
            <li>
              <v-form-input type="tel" label="无名指指圈号" v-model="reqData.wmzqh" maxlength="20"></v-form-input>
            </li>
            <li>
              <v-form-input type="tel" label="项链长度" v-model="reqData.xlcd" maxlength="20" unit="cm"></v-form-input>
            </li>
            <li>
              <v-form-input type="tel" label="手镯尺寸" v-model="reqData.szsc" maxlength="20" unit="mm"></v-form-input>
            </li>
          </ul>
        </li>
        <li class="section" v-if="loadmore">
          <ul class="form">
            <li>
              <v-form-datepicker :arrow="true" label="结婚纪念日" title="结婚纪念日" v-model="reqData.wedding_day" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :arrow="true" label="配偶生日" title="配偶生日" v-model="reqData.lover_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :arrow="true" label="儿子生日" title="儿子生日" v-model="reqData.son_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :arrow="true" label="女儿生日" title="女儿生日" v-model="reqData.daughter_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
          </ul>
        </li>
        <li class="section">
          <div class="more">以下内容由线下门店填写（选填）</div>
          <ul class="form">
            <li>
              <v-form-input label="门店代码" v-model="reqData.store_code" disabled="disabled" maxlength="20"></v-form-input>
            </li>
            <li>
              <v-form-input label="珠宝顾问姓名" disabled="disabled" v-model="reqData.advisor_name" maxlength="20"></v-form-input>
            </li>
          </ul>
        </li>
      </ul>
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && confirm()">确认提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        loadmore: false,
        career: -1, //职业
        careerList: ['教育工作', '医务工作', '财务工作', '媒体市场', '服务行业', '零售行业', '艺术工作', '技术工作', '公务员'],
        reqData: {
          gender: -1, //性别
          career: '', //职业
          nick_name: '', //昵称--
          name: '',//姓名--
          birthday: '', //生日--
          idcard: '', //身份证号--
          wmzqh: '', //无名指指圈号--
          szsc: '',  //手镯尺寸--
          zzqh: '', //中指指圈号
          xlcd: '', //项链长度
          wedding_day: '', //结婚纪念日
          lover_birth: '', //配偶生日--
          son_birth: '', //儿子生日--
          daughter_birth: '', //女儿生日--
          hobbit: '', //兴趣爱好--
          advisor_name: '', //珠宝顾问姓名--
          store_code: ''//门店代码--
        }
      };
    },
    created() {
      this.pageInit();
    },
    computed: {
      isActive() {
        return this.reqData.nick_name.length && this.reqData.name.length && this.reqData.gender !== -1 && this.reqData.birthday.length && this.reqData.career !== -1;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      pageInit() {
        this.ajax({
          name: 'getUserInfo'
        }).then(res => {
          let data = res;
          this.careerList.forEach((item, index) => {
            if(item == data.career) {
              this.career = index;
            }
          });
          this.reqData = data;
        });
      },
      confirm() {
        this.reqData.career = this.careerList[this.career];
        this.ajax({
          name: 'editUserInfo',
          data: this.reqData
        }).then(res => {
          this.$router.push({ name: 'registersuccess' });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .section {
    margin-top: 16px;
    padding: 0 20px;
    background-color: #fff;
    &:first-child {
      margin-top: 0;
    }
  }
  .form {
    background-color: #fff;
    li {
      border-bottom: 1px solid #f0f0f0; /*no*/
      padding: 0 20px;
      height: 96px;
      &:last-child {
        border-bottom: 0;
      }
      .input {
        height: 100%;
      }
    }
  }
  .more {
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: @color4;
    text-align: center;
  }
</style>
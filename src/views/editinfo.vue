<template>
  <div class="pt">
    <v-header back>个人资料</v-header>
    <div class="content">
      <ul>
        <li class="section">
          <ul class="form">
            <li>
              <v-form-input :readonly="!isEdit" label="昵称*" v-model="reqData.nick_name" maxlength="6" placeholder="请填写您的账户昵称"></v-form-input>
            </li>
            <li>
              <v-form-input :readonly="!isEdit" label="姓名*" v-model="reqData.name" maxlength="4" placeholder="请填写您的真实姓名"></v-form-input>
            </li>
            <li>
              <v-form-select :readonly="!isEdit" label="性别*" title="性别选择" v-model="reqData.gender" :list="['女', '男']" placeholder="请选择您的性别"></v-form-select>
            </li>
            <li>
              <v-form-datepicker :readonly="!isEdit" label="生日*" title="生日日期" v-model="reqData.birthday" format="yyyy-MM-dd" yearFormat="{value} 年" monthFormat="{value} 月" dateFormat="{value} 日" placeholder="请选择生日"></v-form-datepicker>
            </li>

            <li>
              <v-form-select :readonly="!isEdit" label="职业*" title="职业选择" v-model="reqData.occupation" :list="occupation" placeholder="请选择您所从事的职业"></v-form-select>
            </li>
          </ul>
          <div class="more" v-if="!loadmore" @click="loadmore = true">点击展开填写详细资料获取更多优惠（选填）</div>
        </li>
        <li class="section" v-if="loadmore">
          <ul class="form">
            <li>
              <v-form-input :type="'number'" :readonly="!isEdit" label="中指指圈号" v-model="reqData.zzqh" maxlength="20"></v-form-input>
            </li>
            <li>
              <v-form-input :type="'number'" :readonly="!isEdit" label="无名指指圈号" v-model="reqData.wmzqh" maxlength="20"></v-form-input>
            </li>
            <li>
              <v-form-input :type="'number'" :readonly="!isEdit" label="项链长度" v-model="reqData.xlcd" maxlength="20" unit="cm"></v-form-input>
            </li>
            <li>
              <v-form-input :type="'number'" label="手镯尺寸" :readonly="!isEdit" v-model="reqData.szsc" maxlength="20" unit="mm"></v-form-input>
            </li>
          </ul>
        </li>
        <li class="section" v-show="loadmore">
          <ul class="form">
            <li>
              <v-form-datepicker :readonly="!isEdit" label="结婚纪念日" title="结婚纪念日" v-model="reqData.wedding_day" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :readonly="!isEdit" label="配偶生日" title="配偶生日" v-model="reqData.lover_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :readonly="!isEdit" label="儿子生日" title="儿子生日" v-model="reqData.son_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-datepicker :readonly="!isEdit" label="女儿生日" title="女儿生日" v-model="reqData.daughter_birth" format="yyyy-MM-dd" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" placeholder="请选择"></v-form-datepicker>
            </li>
            <li>
              <v-form-input :readonly="!isEdit" :type="'number'" label="身份证号" v-model="reqData.idcard" maxlength="20" placeholder="请填写您的身份证号码"></v-form-input>
            </li>
          </ul>
        </li>
        <li class="section" v-if="reqData.store_code">
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
    </div>
    <div class="rightTopBtn" v-if="!isEdit" @click="edit()">编辑</div>
    <div v-if="isEdit" class="rightTopBtn submitBtn">
      <button class="btn" :class="{active: isActive}" @click="isActive && confirm()">提交</button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    data() {
      return {
        isEdit: false,
        loadmore: false,
        occupation: ['教育工作', '医务工作', '财务工作', '媒体市场', '服务行业', '零售行业', '艺术工作', '技术工作', '公务员'],
        reqData: {
          nick_name: '', //昵称
          name: '',//姓名
          gender: -1, //性别
          birthday: '', //生日
          idcard: '', //身份证号
          occupation: -1, //职业
          wmzqh: '', //无名指指圈号
          szsc: '',  //手镯尺寸
          zzqh: '', //中指指圈号
          xlcd: '', //项链长度
          wedding_day: '', //结婚纪念日
          lover_birth: '', //配偶生日
          son_birth: '', //儿子生日
          daughter_birth: '', //女儿生日
          hobbit: '', //兴趣爱好
          advisor_name: '', //珠宝顾问姓名
          store_code: ''//门店代码
        }
      };
    },
    computed: {
      isActive() {
        return this.reqData.nick_name.length && this.reqData.name.length && this.reqData.gender !== -1 && this.reqData.birthday.length && this.reqData.career !== -1;
      }
    },
    created() {
      this.pageInit();
    },
    methods: {
      ...mapActions(['ajax']),
      pageInit() {
        this.ajax({
          name: 'getUserInfo'
        }).then(res => {
          let data = res;
          this.occupation.forEach((item, index) => {
            if(item == data.career) {
              data.occupation = index;
            }
          });
          this.reqData = data;
        });
      },
      edit() {
        this.isEdit = !this.isEdit;
      },
      confirm() {
        let data = this.reqData;
        let index = data.occupation;
        data.career = this.occupation[index];
        this.ajax({
          name: 'editUserInfo',
          data: data
        }).then(res => {
          this.$router.push({ name: 'mypage' });
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
  .rightTopBtn {
    position: fixed;
    top: 0px;
    right: 40px;
    width: 60px;
    line-height: 96px;
    z-index: 3;
    color: #333333;
    font-size: 26px;
  }
  .submitBtn {
    .btn {
      background: #ffffff;
      color: @color5;
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

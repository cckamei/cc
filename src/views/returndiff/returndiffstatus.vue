<template>
  <div class="returndiffstatus pt">
    <v-header :back="type !== 1">{{type === 1 ? '提交成功' : '退差价详情'}}</v-header>
    <div class="content">
      <div class="success">
        <template v-if="type === 1">
          <img src="@/assets/returndiff/icon_ok_b.png" alt="">
          <div class="notes">您的申请已提交成功！</div>
          <div class="notes">请您耐心等候，如有问题请拨打客服热线</div>
        </template>
        <template v-else-if="type === 4">
          <img src="@/assets/returndiff/icon_progressing.png" alt="">
          <div class="notes">您的申请正在处理中！</div>
          <div class="notes">请您耐心等候，如有问题请拨打客服热线</div>
        </template>
        <template v-else-if="type === 3">
          <img src="@/assets/returndiff/icon_deny.png" alt="">
          <div class="notes">十分抱歉，您的申请已被拒绝！</div>
          <div class="notes">如有问题请拨打客服热线</div>
        </template>
        <template v-else-if="type === 2">
          <img src="@/assets/returndiff/icon_ok_b.png" alt="">
          <div class="notes">已为您办理退差价</div>
          <div class="notes">请及时查阅您提交的银行账户</div>
        </template>
        <div class="notes phone">客服热线：400-1691-118</div>
        <div class="notes txt-lightgray">（周一至周五09:00 - 18:00）</div>
        <button v-if="type === 1" class="btn-txt" @click="$router.go(-1)">回到订单详情</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        type: 1
      };
    },
    created() {
      this.type = this.$route.params.type;
    },
    methods: {
      ...mapActions(['ajax'])
    }
  };
</script>


<style lang="less" scoped>
  .returndiffstatus {
    background-color: #fff;
    .success {
      margin: 0 auto;
      padding-top: 100px;
      text-align: center;
      color: #666;
      img {
        width: 180px;
        height: 180px;
        margin-bottom: 60px;
      }
      .notes {
        padding-top: 20px;
        font-size: 30px;
      }
      .phone {
        padding-top: 48px;
      }
      .btn-txt {
        width: 540px;
        height: 68px;
        margin-top: 132px;
      }
    }
  }
</style>


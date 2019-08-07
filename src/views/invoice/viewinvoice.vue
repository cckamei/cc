<template>
  <div class="order pt">
    <v-header>查看发票</v-header>
    <div class="content">
      <ul>
        <li>
          <div class="row flex">
            <div class="label">发票抬头：</div>
            <div class="value">{{res.user_type === 0 ? '个人' : '单位'}}</div>
          </div>
        </li>
        <li>
          <div class="row flex">
            <div class="label">发票抬头：</div>
            <div class="value">{{res.name}}</div>
          </div>
          <div class="row flex">
            <div class="label">识别编号：</div>
            <div class="value">{{res.duty_paragraph}}</div>
          </div>
        </li>
        <li>
          <div class="row flex">
            <div class="label">收票人：</div>
            <div class="value">{{res.addr_name}}</div>
          </div>
          <div class="row flex">
            <div class="label">手机号码：</div>
            <div class="value">{{res.phone}}</div>
          </div>
        </li>
        <li>
          <div class="row flex">
            <div class="label">售票地址：</div>
            <div class="value">{{res.address}}</div>
          </div>
          <div class="row flex">
            <div class="label">收票邮编：</div>
            <div class="value">{{res.address_num}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        res: {}
      };
    },
    computed: {
      ...mapGetters(['getOrderId'])
    },
    created() {
      this.viewInvoice();
    },
    methods: {
      ...mapActions(['ajax']),
      viewInvoice(val) {
        this.ajax({
          name: 'viewInvoice',
          data: {
            order_id: this.getOrderId
          }
        }).then(res => {
          this.res = res;
        });
      }
    }
  };
</script>


<style lang="less" scoped>
  li {
    border-bottom: 1px solid #f0f0f0; /*no*/
    background-color: #fff;
    padding: 30px;
    color: #666;
    &:last-child {
      border-bottom: none;
    }
    .row {
      padding-bottom: 15px;
      &:last-child {
        padding-bottom: 0;
      }
      .label {
        width: 150px;
      }
    }
  }
</style>


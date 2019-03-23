<template>
  <div class="myaddress pt">
    <v-header>地址管理</v-header>
    <div class="content">
      <ul class="addresslist">
        <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)">
          <!-- <img v-if="item.default" class="default-address" src="~assets/goods/icon_selected.png" alt=""> -->
          <div class="listleft">
            <div class="receiver">
              收货人：{{item.name}}<span>{{item.phone}}</span>
              <i v-if="item.default==1">默认</i>
            </div>
            <div class="address">
              <span>收货地址：</span>
              <p>{{item.province}}{{item.city}}{{item.district}}{{item.street}}</p>
            </div>
          </div>
          <div class="listright" @click.stop="editAddress(item)">
            <img src="~assets/mypage/button_edit_a.png" alt="">
          </div>
        </li>
      </ul>
      <div class="btns fix">
        <button class="btn" :class="{active: isActive}" @click="isActive && confirm()">添加收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        addressList: []
      };
    },
    created() {
      this.pageInit();
    },
    computed: {
      isActive() {
        return true;
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setAddress']),
      pageInit() {
        this.ajax({
          name: 'getAddress'
        }).then(res => {
          let data = res;
          this.addressList = data;
        });
      },
      editAddress(item) {
        this.$router.push({ name: 'editaddress', params: { item } });
      },
      confirm() {
        this.$router.push({ name: 'editaddress' });
      },
      selectAddress(item) {
        this.setAddress({
          id: item.id,
          name: item.name,
          phone: item.phone,
          address: `${item.province}${item.city}${item.district}${item.street}`
        });
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .myaddress {
    overflow-y: auto;
    .addresslist {
      background: #ffffff;
      li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 40px 30px;
        border-bottom: 2px solid #f0f0f0;
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .listleft {
      width: 600px;
      padding-left: 20px;
      .receiver {
        color: #666666;
        font-size: 30px;
        font-weight: bold;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        span {
          margin-left: 60px;
        }
        i {
          width: 72px;
          height: 30px;
          line-height: 30px;
          background: @color6;
          font-size: 20px;
          color: #ffffff;
          border-radius: 15px;
          margin-left: 30px;
          text-align: center;
        }
      }
      .address {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-top: 20px;
        font-size: 24px;
        color: #666666;
        span {
          width: 120px;
        }
        p {
          width: 460px;
        }
      }
    }
    .listright {
      width: 40px;

      padding-top: 40px;
      img {
        display: block;
        width: 40px;
        height: 40px;
      }
    }
  }

  .default-address {
    margin-top: 30px;
    margin-right: 2px;
    width: 36px;
    height: 36px;
  }
  .fix {
    padding: 0.4rem;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>


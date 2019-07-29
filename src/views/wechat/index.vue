<template>
  <div class="wechat-group pt">
    <v-header>会员微群</v-header>
    <div class="content">
      <ul>
        <li v-for="(item, index) in wechatGroup">
          <div class="wechat-item flex">
            <div class="img">
              <img :src="item.marketing_group_image" alt="">
            </div>
            <div class="detail flex-auto flex">
              <span class="name">{{item.name}}</span>
              <span class="desc">{{item.description}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        wechatGroup: []
      };
    },
    created() {
      this.getWechatGroup();
    },
    methods: {
      ...mapActions(['ajax']),
      getWechatGroup() {
        this.ajax({
          name: 'getWechatGroup',
          data: {
            belong_to_page_name: '个人中心页面'
          }
        }).then(res => {
          this.wechatGroup = res.list;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .wechat-group {
    li {
      background-color: #fff;
      border-bottom: 1px solid #f0f0f0; /*no*/
    }
  }
  .wechat-item {
    padding: 30px;
    .img {
      width: 200px;
      height: 200px;
      margin-right: 30px;
      flex-shrink: 0;
      img {
        height: 100%;
      }
    }
    .detail {
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      .name {
        font-size: 24px;
        color: #666;
        padding-top: 10px;
      }
      .desc {
        font-size: 20px;
        color: #999;
        padding-top: 20px;
      }
    }
  }
</style>

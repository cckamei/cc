<template>
  <div class="wechat-group pt">
    <v-header>会员微群</v-header>
    <div class="content">
      <ul>
        <li v-for="(item, index) in wechatGroup">
          <div class="wechat-item flex">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="detail flex-auto flex">
              <span class="name">{{item.title}}</span>
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        wechatGroup: [{
          src: '',
          title: '会员售前咨询1群',
          desc: '加群享受CC小美一对一贴心服务~'
        }, {
          src: '',
          title: '会员售前咨询2群',
          desc: '加群享受CC小美一对一贴心服务~'
        }, {
          src: '',
          title: '会员售前咨询3群',
          desc: '加群享受CC小美一对一贴心服务~'
        }]
      };
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

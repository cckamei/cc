<template>
  <div class="">
    <div class="content">
      <div class="logo">
        <img src="~assets/home/logo.png" alt="">
      </div>
      <ul class="form">
        <li>
          <v-input-text placeholder="请输入手机号码" type="tel" v-model="phone" clear maxlength="16" class="input"></v-input-text>
        </li>
        <li>
          <v-input-pwd placeholder="请输入账户密码" v-model="password" eye maxlength="16" class="input"></v-input-pwd>
        </li>
      </ul>
      <div class="btns">
        <button class="btn login" :class="{active: isActive}" @click="isActive && login()">登录</button>
        <button class="btn wechat" :class="{active: isActive}" @click="wxLogin()">使用微信账户登录</button>
      </div>
      <div class="links clearfix">
        <span v-if="0">忘记密码</span>
        <router-link tag="span" :to="{name: 'register'}" class="right">注册账户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';
  import { checkPhone, browser } from '@/utils';
  export default {
    data() {
      return {
        phone: '',
        password: ''
      };
    },
    created() {
      if(this.$route.params.name) {
        this.setCommon({ lastPage: this.$route.params.name });
      }
      if(browser().isWeixin) {
        //2.没有userId，有code时进行授权登录
        if(window.location.href.match(/code=[\w]{32}/, 'g')) {
          this.ajax({
            name: 'wxLogin',
            data: {
              code: window.location.href.match(/code=([\w]{32})/, 'g')[1]
            }
          })
            .then(res => {
              res.userId = res.user_id;
              this.setUserInfo(res);
              window.localStorage.setItem('accpet', 'cckamei');
              //3.去掉code参数,防止直接复制链接出去带上旧的code
              window.location.href = window.location.href.replace(/[&?]code=[\w]{32}/, '');
              this.ajax({
                name: 'getAddress'
              }).then(res => {
                let data = res;
                if(res.length) {
                  let index = res.findIndex(item => item.default);
                  let address = res[index];
                  this.setAddress({
                    id: address.id,
                    name: address.name,
                    phone: address.phone,
                    address: `${address.province}${address.city}${address.district}${address.street}`
                  });
                }
                this.ajax({
                  name: 'getUserInfo'
                }).then(res2 => {
                  this.setUserInfo(res2);
                  if(res2.phone) {
                    if(res2.vip_code) {
                      this.$router.replace({ name: this.getCommon.lastPage });
                    } else {
                      this.$router.push({ name: 'perfectinfo' });
                    }
                  } else {
                    this.$router.push({ name: 'verifyphone' });
                  }
                });
              });
            });
        }
      }
    },
    computed: {
      ...mapGetters(['userId', 'getCommon']),
      isActive() {
        return this.phone.length && this.password.length && checkPhone(this.phone);
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setUserInfo', 'setCommon', 'setAddress']),
      login() {
        this.ajax({
          name: 'login',
          data: {
            phone: this.phone,
            password: this.password
          },
          error: true
        }).then(res => {
          this.setUserInfo({ token: res.token, userId: res.user_id });
          this.ajax({
            name: 'getAddress'
          }).then(res => {
            let data = res;
            if(res.length) {
              let index = res.findIndex(item => item.default);
              let address = res[index];
              this.setAddress({
                id: address.id,
                name: address.name,
                phone: address.phone,
                address: `${address.province}${address.city}${address.district}${address.street}`
              });
            }

            this.ajax({
              name: 'getUserInfo'
            }).then(res2 => {
              this.setUserInfo(res2);

              if(res2.phone) {
                if(res2.vip_code) {
                  this.$router.go(-1);
                } else {
                  this.$router.push({ name: 'perfectinfo' });
                }
              } else {
                this.$router.push({ name: 'verifyphone' });
              }
            });
          });
        }).catch(res => {
          this.toast('用户名或密码错误');
        });
      },
      wxLogin() {
        if(browser().isWeixin) {
          let sco = window.localStorage.getItem('accpet') ? 'snsapi_base' : 'snsapi_userinfo';

          //1.没有userId 没有code时进行授权
          if(window.htp.iswxproxy) {
            window.location.href = window.htp.wxproxy + '?appid=' + window.htp.appid + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&response_type=code&scope=' + sco + '&state=STATE#wechat_redirect';
          } else {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + window.htp.appid + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&response_type=code&scope=' + sco + '&state=STATE#wechat_redirect';
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .content {
    background-color: #fff;
  }

  .logo {
    padding: 100px 0 90px 0;
    img {
      width: 360px;
      height: 170px;
      display: block;
      margin: 0 auto;
    }
  }

  .form {
    padding: 0 30px;
    li {
      border-bottom: 1px solid #ccc; /*no*/
      height: 100px;
      padding: 0 10px;
      .input {
        height: 100%;
      }
    }
  }

  .btns {
    padding: 30px 40px;
    .btn {
      font-size: 36px;
      margin-top: 30px;
      &.login.active {
        background: ~"url('~assets/home/button_login.png') no-repeat center center/100%";
      }
      &.wechat {
        background: ~"url('~assets/home/button_login_w.png') no-repeat center center/100%";
      }
    }
  }

  .links {
    color: @color4;
    font-size: 28px;
    padding: 0 40px;
  }
</style>

<template>
  <div class="lettering-edit pt pb">
    <v-header class="header">刻字元素{{['（左）','（中）','（右）'][$route.params.index]}}</v-header>
    <div class="content">
      <ul class="lettering-content">
        <li>
          <div class="title">类型</div>
          <v-button-radio className="fixwidth" v-model="reqData.type" :list="getLetteringLabels.type"></v-button-radio>
        </li>
        <template v-if="reqData.type === 0">
          <li>
            <div class="title">字体</div>
            <div class="font flex">
              <div class="font-item" v-for="(item, index) in getLetteringLabels.font" :key="index">
                <img :src="item.list_img" alt="">
                <button class="btn-txt" :class="{active: reqData.font  === index}" @click="reqData.font = index">{{item.name}}</button>
              </div>
            </div>
          </li>
          <li>
            <div class="title">内容</div>
            <div class="input-wrapper flex">
              <input v-model="reqData.content" pattern="^[a-zA-Z0-9]+$" maxlength="3" placeholder="请填写刻字内容"/>
              <button class="btn-txt" @click="isActive && preview()">预览</button>
            </div>
          </li>
        </template>
        <template v-else-if="reqData.type === 1">
          <li>
            <div class="title">主题</div>
            <v-button-radio className="fixwidth" v-model="reqData.subject" :list="getLetteringLabels.subject"></v-button-radio>
          </li>
          <li>
            <div class="title">内容</div>
            <div class="font" v-if="reqData.subject === 0">
              <div class="font-item" v-for="(item, index) in getLetteringLabels.constellation" :key="index">
                <img :src="item.list_img" alt="">
                <button class="btn-txt" :class="{active: reqData.constellation === index }" @click="reqData.constellation = index">{{item.name}}</button>
              </div>
            </div>
            <div class="font" v-if="reqData.subject === 1">
              <div class="font-item" v-for="(item, index) in getLetteringLabels.zodiac" :key="index">
                <img :src="item.list_img" alt="">
                <button class="btn-txt" :class="{active: reqData.zodiac  === index}" @click="reqData.zodiac = index">{{item.name}}</button>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="footer">
      <div class="btns">
        <button class="btn" :class="{active: isActive}" @click="isActive && handleConfirm()">完成</button>
        <!-- <button class="btn" :class="{active: isActive}" @click="isActive && preview()">预览</button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        reqData: {
          type: 0,//类型
          font: 0,//字体
          content: '',//文本内容
          subject: 0,//主题
          constellation: 0,//星座
          zodiac: 0//生肖
        }
      };
    },
    computed: {
      ...mapGetters(['getLetteringValues', 'getLetteringLabels']),
      isActive() {
        if(this.reqData.type === 0 && !this.reqData.content.length) {
          return false;
        }
        return true;
      }
    },
    created() {
      this.getLettering();
    },
    methods: {
      ...mapMutations(['setLetteringValues', 'setLetteringLabels']),
      ...mapActions(['ajax']),
      async preview() {
        if(!this.reqData.content.length) {
          return false;
        }
        if(!/[a-zA-Z0-9]+/g.test(this.reqData.content)) {
          this.toast('只支持字母数字');
          return false;
        }
        const mixinsPics = await this.ajax({ name: 'getMixinsPic', data: { content: this.reqData.content, classify: this.getLetteringLabels.font[this.reqData.font].name } });
        const font = this.getLetteringLabels.font.map((item, index) => {
          return {
            ...item,
            list_img: mixinsPics[index].list_img
          }
        })
        this.setLetteringLabels({ font });
      },
      async handleConfirm() {
        let img = '', list_img = '';
        if(this.reqData.type === 0) {
          const mixinsPics = await this.ajax({ name: 'getMixinsPic', data: { content: this.reqData.content, classify: this.getLetteringLabels.font[this.reqData.font].name } });
          img = mixinsPics[this.reqData.font].show_img;
          list_img = mixinsPics[this.reqData.font].list_img;
        } else if(this.reqData.type === 1) {
          if(this.reqData.subject === 0) {
            img = this.getLetteringLabels.constellation[this.reqData.constellation].show_img;
            list_img = this.getLetteringLabels.constellation[this.reqData.constellation].list_img;
          } else {
            img = this.getLetteringLabels.zodiac[this.reqData.zodiac].show_img;
            list_img = this.getLetteringLabels.zodiac[this.reqData.zodiac].list_img;
          }
        }
        const index = this.$route.params.index;
        const letteringValues = this.getLetteringValues;
        letteringValues[index] = { ...letteringValues[index], ...this.reqData, img, list_img };
        this.setLetteringValues(letteringValues);
        this.$router.go(-1);
      },
      getLettering() {
        this.ajax({
          name: 'getLettering'
        }).then(res => {
          this.setLetteringLabels({
            type: ['文字', '图案', '无'],
            font: res.typeface,
            subject: ['星座', '生肖'],
            constellation: res.constellation,
            zodiac: res.chinese_zodiac
          });

          const index = this.$route.params.index;
          const letteringValue = this.getLetteringValues[index];

          if(letteringValue.type !== 2) {
            Object.assign(this.reqData, letteringValue);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  .pt {
    background-color: #fff;
  }

  .lettering-content {
    padding: 0 40px;
    overflow: auto;
    height: 100%;
    li {
      padding-top: 60px;
      .title {
        font-size: 24px;
        color: #666;
      }
      .font {
        display: flex;
        flex-wrap: wrap;
        .font-item {
          padding-top: 30px;
          margin-right: 30px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          img {
            width: 200px;
            height: 200px;
            display: block;
            background-color: #ccc;
          }
          .btn-txt {
            width: 100%;
            height: 40px;
            margin-top: 20px;
            margin-bottom: 10px;
            &.active {
              background-color: @color3;
              color: @color2;
              border: 1px solid @color2; /*no*/
            }
          }
        }
      }
      .input-wrapper {
        border-bottom: 1px solid #f0f0f0; /*no*/
        height: 84px;
        input {
          color: #999;
        }
      }
    }
  }

  .footer {
    height: 96px;
    .btns {
      padding: 14px 20px;
    }
  }
</style>

<style lang="less">
  .lettering-edit {
    .fixwidth {
      min-width: 200px;
    }
  }
</style>


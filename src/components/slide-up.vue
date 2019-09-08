<template>
  <mt-popup v-model="visible" position="bottom" class="slide" @touchmove.prevent>
    <div v-show="title" class="slide-title">{{title}}</div>
    <div class="slide-content">
      <slot></slot>
    </div>
    <div class="btns">
      <slot name="footer">
        <button class="btn" :class="{active: isConfirm}" @click="isConfirm && confirm()">{{confirmText}}</button>
      </slot>
    </div>
  </mt-popup>
</template>

<script type="text/babel">
  import $ from 'jquery';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      isConfirm: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
      },
      confirmText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        visible: false
      };
    },
    mounted() {
      $('.mint-popup.slide').appendTo('.container-wrapper .container');
    },
    watch: {
      value(val) {
        this.visible = val;
        if(this.visible) {
          this.closeTouch();
        } else {
          this.openTouch();
        }
      },
      visible(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      confirm() {
        this.visible = false;
        this.$emit('confirm');
      },
      handler(e) {
        e.preventDefault();
      },
      closeTouch: function() {
        if(document.getElementsByTagName('content')[0]) {
          document.getElementsByTagName('content')[0].addEventListener('touchmove', this.handler, { passive: false });//阻止默认事件
        }
      },
      openTouch: function() {
        if(document.getElementsByTagName('content')[0]) {
          document.getElementsByTagName('content')[0].removeEventListener('touchmove', this.handler, { passive: false });//打开默认事件
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .slide {
    border-radius: 20px 20px 0 0;
    width: 100%;
    &-title {
      color: #666;
      font-size: 30px;
      height: 120px;
      line-height: 140px;
      text-align: center;
    }
    &-content {
      margin: 20px;
      margin-bottom: 0;
      padding-bottom: 20px;
      max-height: 1000px;
      min-height: 600px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  .btns {
    padding: 14px 20px;
    display: flex;
    justify-content: center;
    .btn {
      height: 68px;
      font-size: 30px;
    }
  }
</style>


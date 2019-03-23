<template>
  <mt-popup v-if="visible" v-model="visible" class="popup-confirm">
    <div class="popup-confirm-title" v-if="title">{{title}}</div>
    <div class="popup-confirm-content">
      <slot></slot>
    </div>
    <div class="btn-group flex">
      <button class="btn cancel" @click="visible = false">取消</button>
      <button class="btn confirm" :class="{active: isConfirm}" @click="isConfirm && confirm()">确定</button>
    </div>
  </mt-popup>
</template>

<script type="text/babel">
  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      },
      isConfirm: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
        // required: true
      }
    },
    data() {
      return {
        visible: false
      };
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
  @import "~@/style/vars.less";
  .popup-confirm {
    border-radius: 20px;
    overflow: hidden;
    width: 600px;
    &-title {
      color: #999;
      font-size: 30px;
      padding: 40px 0 20px 0;
      text-align: center;
    }
    &-content {
      padding: 20px;
      max-height: 600px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  .btn-group {
    font-size: 30px;
    height: 80px;
    border-top: 1px solid #f0f0f0; /*no*/
    .btn {
      width: 50%;
      height: 100%;
      font-size: 30px;
      border: 0;
      &.cancel {
        color: #666;
        border-right: 1px solid #fff; /*no*/
      }
      &.confirm {
        color: #666;
        &.active {
          background-color: @color2;
          color: #fff;
        }
      }
    }
  }
</style>


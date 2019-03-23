<template>
  <ul class="flex">
    <li v-for="(item, index) in list" @click="!disabled && switchBtn(item, index)" :key="index">
      <button :class="{active: selectIndex === index, disabled: item.disabled}">{{typeof item === 'string' ? item : item[keyName]}}</button>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      keyName: {
        type: String,
        default: 'label'
      },
      cancel: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectIndex: 0
      };
    },
    watch: {
      value: {
        handler(val) {
          this.selectIndex = val;
        },
        immediate: true
      },
      selectIndex(val) {
        this.$emit('input', this.selectIndex);
      }
    },
    methods: {
      switchBtn(item, index) {
        if(!item.disabled) {
          if(this.cancel && this.selectIndex === index) {
            this.selectIndex = -1;
          } else {
            this.selectIndex = index;
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "~@/style/vars.less";
  ul {
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
    li {
      padding: 30px 15px 0 15px;
      button {
        border-radius: 40px;
        background-color: #eee;
        font-size: 24px;
        color: #666;
        border: 1px solid #eee; /*no*/
        padding: 0 30px;
        height: 50px;
        &.active {
          background-color: @color3;
          color: @color2;
          border: 1px solid @color2; /*no*/
        }
        &.disabled {
          color: #999 !important;
          border: 1px dashed #999; /*no*/
          background-color: #fff !important;
        }
      }
    }
  }
</style>



<template>
  <v-popup-confirm2 ref="popup-confirm" :title="title" :show.sync="visible" :is-confirm="selectIndex !== -1" @confirm="confirm">
    <v-input-radio v-model="selectIndex" :list="list.map(res => res.name)" />
  </v-popup-confirm2>
</template>

<script type="text/babel">
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        title: ''
      }
    },
    data() {
      return {
        selectIndex: -1,
        visible: false
      };
    },
    watch: {
      visible(val) {
        this.$emit('update:show', val);
      }
    },
    methods: {
      open() {
        this.selectIndex = this.value;
        this.$refs['popup-confirm'].open();
      },
      confirm() {
        this.$emit('input', this.selectIndex);
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


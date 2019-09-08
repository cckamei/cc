<template>
  <div class="flex arrow">
    <div class="label">{{label}}</div>
    <div class="input ellipsis flex" @click="visible = true">
      <slot name="value">
        <div class="input ellipsis">{{value || placeholder || '　'}}</div>
      </slot>
    </div>
    <v-slide-up v-model="visible" :title="title" @confirm="$emit('confirm')" :confirmText="confirmText">
      <slot></slot>
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
    </v-slide-up>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      value: {
        default: ''
      },
      placeholder: {
        type: String
      },
      label: {
        type: String
      },
      confirmText: '',
      title: '',
      open: {
        default: false
      }
    },
    data() {
      return {
        visible: false
      };
    },
    created() {
      setTimeout(() => {
        this.visible = this.open;
      }, 1000);
    },
    watch: {
      open(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('update:open', val);
      }
    },
    methods: {
      confirm() {
        this.visible = false;
        this.$emit('confirm');
      }
    }
  };
</script>

<style lang="less" scoped>
  .flex {
    width: 100%;
    height: 100%;
    font-size: 30px;
    .label {
      flex-shrink: 0;
      min-width: 30%;
      color: #999;
      font-size: 24px;
    }
    .input {
      text-align: right;
      width: 100%;
      font-size: 24px;
      color: #666;
      justify-content: flex-end;
    }
  }
</style>


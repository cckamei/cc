<template>
  <div class="flex " :class="{arrow:arrow}">
    <div class="label">{{label}}</div>
    <input v-if="arrow" :maxlength="maxlength" :type="type" v-model="text" readonly :placeholder="placeholder" @click="onClickHandler" />
    <input v-else :maxlength="maxlength" :type="type" v-model="text" :readonly="readonly" :placeholder="placeholder" />
    <span v-if="unit">{{unit}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      arrow: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        required: true
      },
      placeholder: {
        type: String
      },
      maxlength: {
        type: [Number, String],
        default: 100
      },
      label: {
        type: String
      },
      unit: {
        type: String
      },
      readonly: {
        type: [Boolean, Number],
        default: false
      }
    },
    data() {
      return {
        text: ''
      };
    },
    watch: {
      value: {
        handler(val) {
          this.text = val;
        },
        immediate: true
      },
      text(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      onClickHandler() {
        if(!this.readonly) {
          this.$emit('input-click');
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .flex {
    width: 100%;
    height: 100%;
    font-size: 30px;
    padding: 0 16px;
    .label {
      flex-shrink: 0;
      min-width: 30%;
      color: #666;
      font-size: 24px;
    }
    input {
      text-align: right;
      width: 100%;
      padding: 0 10px;
      font-size: 24px;
      color: #333;
    }
  }
</style>



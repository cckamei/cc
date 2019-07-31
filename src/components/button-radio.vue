<template>
  <ul class="flex">
    <li v-for="(item, index) in list2" @click="!disabled && switchBtn(item)" :key="index">
      <button :style="{'min-width': width ? width + 'px' : 'auto'}" :class="{active: item.selected, disabled: item.disabled}">{{typeof item === 'object' ? item[keyName] : item}}</button>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Number, Array],
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
      },
      multiple: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        list2: []
      };
    },
    watch: {
      list: {
        handler(val) {
          this.list2 = val.map((item, index) => {
            if(typeof item === 'string') {
              return { label: item, selected: this.multiple ? this.value.includes(index) : this.value === index };
            } else {
              return { ...item, selected: this.multiple ? this.value.includes(index) : this.value === index };
            }
          });
        },
        immediate: true
      }
    },
    methods: {
      switchBtn(item) {
        if(!item.disabled) {
          if(this.multiple || (this.cancel && item.selected)) {
            item.selected = !item.selected;
          } else {
            if(!item.selected) {
              this.list2.forEach(item => {
                item.selected = false;
              });
              item.selected = true;
            }
          }
          if(this.multiple) {
            this.$emit('input', this.list2.map((item, index) => item.selected ? index : -1).filter(item => item !== -1));
          } else {
            this.$emit('input', this.list2.findIndex(item => item.selected));
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
      margin: 30px 15px 0 15px;
      button {
        border-radius: 40px;
        background-color: #eee;
        font-size: 24px;
        color: #666;
        border: 1px solid #eee; /*no*/
        padding: 0 30px;
        height: 40px;
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



<template>
  <div class="flex" :class="{arrow:arrow}">
    <div class="label">{{label}}</div>
    <input type="text" :value="text" :placeholder="placeholder" @click="!readonly&&(visible = true)" readonly />
    <v-slide-up v-model="visible" :title="title" @confirm="confirm">
      <datetime-picker v-model="date" :yearFormat="yearFormat" :monthFormat="monthFormat" :dateFormat="dateFormat" type="date" :startDate="startDate" :endDate="endDate"></datetime-picker>
    </v-slide-up>
  </div>
</template>

<script>
  import { formatDate } from '../utils';
  import datetimePicker from './mint-ui/datetime-picker';

  export default {
    props: {
      readonly: {
        type: [Boolean, Number],
        default: false
      },
      arrow: {
        type: [Boolean, Number],
        default: false
      },
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      startDate: {
        type: Date,
        default: function() {
          return new Date('1900/01/01');
        }
      },
      endDate: {
        type: Date,
        default: function() {
          return new Date();
        }
      },
      label: {
        type: String,
        required: true
      },
      format: '',
      title: '',
      yearFormat: '',
      monthFormat: '',
      dateFormat: ''
    },
    data() {
      return {
        visible: false,
        text: '',
        date: new Date()
      };
    },
    components: {
      datetimePicker
    },
    watch: {
      value() {
        if(this.value) {
          this.date = new Date(this.value.replace(/-/g, '/'));
          this.text = this.value;
        }
      }
    },
    methods: {
      confirm() {
        this.text = formatDate(this.date, this.format);
        this.$emit('input', this.text);
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
      color: #999;
      font-size: 24px;
    }
    input {
      text-align: right;
      width: 100%;
      padding: 0 10px;
      font-size: 24px;
      color: #666;
    }
  }
</style>



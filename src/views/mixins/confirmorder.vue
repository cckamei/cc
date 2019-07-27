<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['invoice'])
    },
    methods: {
      applyInvock(id) {
        const name = invoice.invoiceType ? invoice.ticketCompanyName : invoice.ticketName;
        return this.ajax({
          name: 'addInvoice',
          data: {
            //   invoiceType: 0,
            // isSameAddress: 0,
            // ticketName: '',
            // invoiceName: '',
            // invoicePhone: '',
            // postalCode: '',
            // address: '',
            // ticketCompanyName: '',
            // ticketId: ''

            user_type: invoice.invoiceType, //# 1个人 2 单位
            name,  //# 姓名或者单位名称
            duty_paragraph: invoice.ticketId || '', //# 单位税号,只有单位有税号
            addr_name: invoice.invoiceName, //# 收票人姓名
            phone: invoice.invoicePhone, //# 收票人电话
            address: invoice.address, //# 收票人地址
            address_num: invoice.postalCode, //= StringField() # 收票人邮编
            addr_type: isSameAddress ? 2 : 1, //# 收票人地址是否和送货地址相同 1 相同 2 不同
            order_id: id,  //# 订单号码
            //   "invoice_haoma": "13123123",  //#发票号码
            //   "invoice_daima": "13123123123", //# 发票代码
            //   "invoice_type": 1, //# 1 纸质 2 电子
            erp_type: 1, //1 下单开发票 2 补开发票
          }
        });
      }
    }
  }
</script>

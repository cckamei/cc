<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['invoice', 'letteringLabels'])
    },
    methods: {
      applyInvock(id) {
        const invoice = this.invoice;
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

            user_type: invoice.invoiceType, //# 0个人 1 单位
            name,  //# 姓名或者单位名称
            duty_paragraph: invoice.ticketId || '', //# 单位税号,只有单位有税号
            addr_name: invoice.invoiceName, //# 收票人姓名
            phone: invoice.invoicePhone, //# 收票人电话
            address: invoice.address, //# 收票人地址
            address_num: invoice.postalCode, //= StringField() # 收票人邮编
            addr_type: invoice.isSameAddress ? 2 : 1, //# 收票人地址是否和送货地址相同 1 相同 2 不同
            order_id: id,  //# 订单号码
            //   "invoice_haoma": "13123123",  //#发票号码
            //   "invoice_daima": "13123123123", //# 发票代码
            //   "invoice_type": 1, //# 1 纸质 2 电子
            erp_type: 1 //1 下单开发票 2 补开发票
          }
        });
      },
      addLettering(res) {
        let result = [];
        const { type, font, subject, constellation, zodiac } = this.letteringLabels;
        const orderInfo = {
          order_id: res.order_id// # 订单id
        };

        this.cart.forEach((item, index) => {
          const goods = res.goods[index];
          const goodsInfo = {
            "goods_id": goods.goods_id,// # 商品id
            // "sku_id": goods.sku_id,//  # 套系id 
            "goods_name": goods.goods_name,// # 商品名称
            "goods_merchant_code": goods.goods_merchant_code,//; #"商品货号" # 商品货号
            "sku_merchant_code": goods.sku_merchant_code,//  #按商品编号搜索 # 商品货号
            "mode_code": goods.mode_code // # 公司模号
          };
          if(item.lettering) {
            item.lettering.forEach((l, index) => {
              if(l.type !== 2) {
                let letteringInfo = {};
                if(l.type === 0) {
                  letteringInfo.name_type = '文字';
                  letteringInfo.classify = '艺术字';
                  letteringInfo.classify_content = font[l.font].name;
                  letteringInfo.content = l.content;
                } else if(l.type === 1) {
                  letteringInfo.name_type = '图案';
                  if(l.subject === 0) {
                    letteringInfo.classify = '星座';
                    letteringInfo.classify_content = constellation[l.constellation].name;
                  } else {
                    letteringInfo.classify = '生肖';
                    letteringInfo.classify_content = zodiac[l.zodiac].name;
                  }
                  letteringInfo.content = l.show_img;
                }
                letteringInfo.nums = index + 1;
                letteringInfo.list_img = l.list_img;
                letteringInfo.show_img = l.show_img;
                result.push({ ...orderInfo, ...goodsInfo, ...letteringInfo });
              }
            });
          }
        });
        this.ajax({ name: 'addLettering', data: result });
      },
      addPackageLettering(res) {
        let result = [];
        const { type, font, subject, constellation, zodiac } = this.letteringLabels;
        const orderInfo = {
          order_id: res.order_id// # 订单id
        };

        this.package.goods_list.forEach((item, index) => {
          const goods = res.goods[0].goods_list[index];
          const goodsInfo = {
            // "goods_id": goods.id,// # 商品id 
            "sku_id": goods.sku.sku_id,//  # 套系id
            "goods_name": goods.good.title,// # 商品名称
            // "goods_merchant_code": goods.sku.goods_merchant_code,//; #"商品货号" # 商品货号 
            // "sku_merchant_code": goods.sku.sku_merchant_code,//  #按商品编号搜索 # 商品货号 
            // "mode_code": goods.sku.mode_code // # 公司模号 
          };
          if(item.lettering) {
            item.lettering.forEach((l, index) => {
              if(l.type !== 2) {
                let letteringInfo = {};
                if(l.type === 0) {
                  letteringInfo.name_type = '文字';
                  letteringInfo.classify = '艺术字';
                  letteringInfo.classify_content = font[l.font].name;
                  letteringInfo.content = l.content;
                } else if(l.type === 1) {
                  letteringInfo.name_type = '图案';
                  if(l.subject === 0) {
                    letteringInfo.classify = '星座';
                    letteringInfo.classify_content = constellation[l.constellation].name;
                  } else {
                    letteringInfo.classify = '生肖';
                    letteringInfo.classify_content = zodiac[l.zodiac].name;
                  }
                  letteringInfo.content = l.show_img;
                }
                letteringInfo.nums = index + 1;
                letteringInfo.list_img = l.list_img;
                letteringInfo.show_img = l.show_img;
                result.push({ ...orderInfo, ...goodsInfo, ...letteringInfo });
              }
            });
          }
        });
        this.ajax({ name: 'addLettering', data: result });
      }
    }
  };
</script>

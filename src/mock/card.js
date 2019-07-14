export default [
  {
    //库存
    path: '/api/v1/goods_stock',
    // active: true,
    data: { stock: 99 }
  },
  {
    // 个人中心卡券数量
    path: '/api/v1/my/coupons/count',
    // active: true,
    data: { vipcard_count: 1, coupon_count: 1, uncoupon_count: 2 }
  },
  {
    // 我的优惠券
    path: '/api/v1/my/coupons',
    // active: true,
    data: [
      {
        name: 'test1',
        status: 0, // 0：可使用  1：已过期  2：已作废
        discount_money: 150,
        endtime: '2018-10-10 00:00:00',
        all_money: 1000,
        starttime: '2018-09-10 00:00:00',
        coupon_id: '5baddef1467b621adb48d922',
        comment: 'xxxx'
      }
    ]
  },
  {
    // 待领优惠券
    path: '/api/v1/coupons',
    // active: true,
    data: [
      {
        coupon_id: '5baddef1467b621adb48d922', //优惠券id
        endtime: '2018-10-10 00:00:00', //截止时间
        name: 'test1', //优惠券名称
        discount_money: 150, //优惠金钱
        already: true, //是否领取过
        starttime: '2018-09-10 00:00:00', //开始时间
        all_money: 1000, //达到满减要求的金额
        comment: 'xxx' //购买注意事项
      },
      {
        coupon_id: '5baddffb38f7564a6a5ca31d',
        endtime: '2018-10-20 00:00:00',
        name: 'test3',
        discount_money: 500,
        starttime: '2018-09-11 00:00:00',
        already: false,
        all_money: 2000,
        comment: 'xxx'
      }
    ]
  },
  {
    // 优惠券详情
    path: /api\/v1\/coupons\/detail/,
    // active: true,
    data: {
      name: 'test1',
      status: 0, //0：可使用  1：已过期  2：已作废
      discount_money: 150,
      endtime: '2018-10-10 00:00:00',
      all_money: 1000,
      starttime: '2018-09-10 00:00:00',
      coupon_id: '5baddef1467b621adb48d922',
      comment: 'xxxxxx' //优惠券注意事项
    }
  },
  {
    //我的购物卡
    path: '/api/v1/my/vipcards',
    // active: true,
    data: [
      {
        name: 'test1',
        status: 0, //  0：可使用  1：已过期  2：已作废
        discount: 8,
        endtime: '2018-10-10 00:00:00',
        starttime: '2018-09-10 00:00:00',
        card_id: '5baddef1467b621adb48d922',
        use_type: 1, //适用范围类型 0:全部 1:按套系 2：按款式 3：按镶嵌方式
        use_type_range: ['猛狮', 'A套系', 'B套系'], //适用范围  数组类型  套系1，套系2 ... ； 注意：若use_type为全部(0)，use_type_range为空数组
        comment: 'xxxxxx' //购物卡注意事项
      }
    ]
  },
  {
    //购物卡商城
    path: '/api/v1/vipcards',
    // active: true,
    data: [
      {
        card_id: '5baddef1467b621adb48d922', //VIP卡id
        endtime: '2018-10-10 00:00:00', //截止时间
        name: 'test1', //卡名称
        discount: 7.5, //优惠折扣
        already: true, //是否领取过
        starttime: '2018-09-10 00:00:00', //开始时间
        price: 66, //价格
        use_type: 1, //适用范围类型  0:全部 1:按套系 2：按款式 3：按镶嵌方式
        use_type_range: ['猛狮', 'A套系', 'B套系'], //适用范围  数组类型  套系1，套系2 ...； 注意：若use_type为全部(0)，use_type_range为空数组
        comment: 'xxxxxx' //购物卡注意事项
      },
      {
        card_id: '5baddffb38f7564a6a5ca31d',
        endtime: '2018-10-20 00:00:00',
        name: 'test3',
        discount: 8,
        starttime: '2018-09-11 00:00:00',
        already: false,
        price: 66,
        use_type: '2',
        use_type_range: ['A款式', 'B款式'],
        comment: 'xxxxxx' //购物卡注意事项
      }
    ]
  },
  {
    // 购物卡详情
    path: /api\/v1\/vipcards\/detail/,
    // active: true,
    data: {
      name: 'test1',
      status: 0, // 0：可使用  1：已过期  2：已作废
      discount: 8,
      endtime: '2018-10-10 00:00:00',
      price: 66,
      starttime: '2018-09-10 00:00:00',
      card_id: '5baddef1467b621adb48d922',
      use_type: 0, // 0:全部 1:按套系 2：按款式 3：按镶嵌方式
      use_type_range: [],
      comment: 'xxxxxx' //购物卡注意事项
    }
  },
  {
    // 订单页面获取优惠活动列表
    path: '/api/v1/order/actives',
    type: 'kind',
    method: 'post',
    // active: true,
    data: {
      '0': {
        list: [
          {
            name: 'test1',
            status: 0, // 0：可使用  1：已过期  2：已作废
            discount: 8,
            endtime: '2018-10-10 00:00:00',
            price: 66,
            starttime: '2018-09-10 00:00:00',
            card_id: '5baddef1467b621adb48d922',
            comment: 'xxxxxx' //购物卡注意事项
          },
          {
            name: 'test2',
            status: 0, // 0：可使用  1：已过期  2：已作废
            discount: 8,
            endtime: '2018-10-10 00:00:00',
            price: 66,
            starttime: '2018-09-10 00:00:00',
            card_id: '5baddef1467b621adb48d922',
            comment: 'xxxxxx' //购物卡注意事项
          }
        ],
        save_money: '100' // 使用此活动，最多可节省的钱数}
      },
      '1': {
        list: [
          {
            start: '2019-07-01',
            end: '2019-07-31',
            id: '5d298372cba3493f1a2dd86b',
            save_money: 0,
            use_kind: '0',
            discount: 0.95,
            name: '限时折扣活动',
            active_type: '0'
          },
          {
            coupons: {},
            end: '2019-07-31',
            save_money: 5,
            use_kind: '0',
            name: '每满减活动-单档位-全店商品',
            start: '2019-07-01',
            zengquan: '0',
            id: '5d29809bcba3493f1a2dd859',
            discount_money: 5,
            coupons_count: 1,
            discount_type: '1',
            all: 10,
            active_type: '1'
          },
          {
            coupons: {},
            end: '2019-07-31',
            save_money: 2,
            use_kind: '0',
            name: '每满件活动-单档位-全店商品',
            start: '2019-07-01',
            zengquan: '0',
            id: '5d2a8d3fcba349530cc25b2e',
            discount_money: 2,
            coupons_count: 1,
            discount_type: '3',
            all: 1,
            active_type: '1'
          },
          {
            coupons: {
              coupon_id: '5d29b6b6cba349452b98df96',
              use_type_range: [],
              endtime: '2019-07-31',
              comment: '0713 优惠券-满减-多档位-全商品-满额用户-直接发放',
              all_money: 11,
              discount_money: 2,
              status: 0,
              starttime: '2019-07-01',
              use_type: 0,
              name: '0713 优惠券-满减-多档位-全商品-满额用户-直接发放'
            },
            end: '2019-07-31',
            save_money: 0,
            use_kind: '0',
            name: '每满减活动-单档位赠券-全店商品',
            start: '2019-07-01',
            zengquan: '1',
            id: '5d2a8daecba349530e9357ec',
            discount_money: 0,
            coupons_count: 1,
            discount_type: '1',
            all: 100,
            active_type: '1'
          },
          {
            coupons: {
              coupon_id: '5d29b481cba349452b98df8b',
              use_type_range: [],
              endtime: '2019-07-31',
              comment: '0713 优惠券-满减-多档位-全商品-全体用户-领用',
              all_money: 2000,
              discount_money: 400,
              status: 0,
              starttime: '2019-07-01',
              use_type: 0,
              name: '0713 优惠券-满减-多档位-全商品-全体用户-领用'
            },
            end: '2019-07-31',
            save_money: 0,
            use_kind: '0',
            name: '每满件活动-单档位赠券-全店商品',
            start: '2019-07-01',
            zengquan: '1',
            id: '5d2a9014cba349530e9357f1',
            discount_money: 0,
            coupons_count: 1,
            discount_type: '3',
            all: 1,
            active_type: '1'
          }
        ],
        save_money: ''
      }
    }
  },
  {
    // 订单页面获取优惠券列表
    path: '/api/v1/order/coupons',
    method: 'post',
    // active: true,
    data: [
      {
        name: 'test1',
        status: 0, // 0：可使用  1：已过期  2：已作废
        discount_money: 1500,
        endtime: '2018-10-10 00:00:00',
        all_money: 1000,
        starttime: '2018-09-10 00:00:00',
        coupon_id: '5baddef1467b621adb48d922',
        comment: 'xxxx',
        can_use: 0 // 1 此订单可用，0 此订单不可用
      },
      {
        name: 'test1',
        status: 0, // 0：可使用  1：已过期  2：已作废
        discount_money: 150,
        endtime: '2018-10-10 00:00:00',
        all_money: 1000,
        starttime: '2018-09-10 00:00:00',
        coupon_id: '5baddef1467b621adb48d922',
        comment: 'xxxx',
        can_use: 0 // 1 此订单可用，0 此订单不可用
      }
    ]
  },
  {
    // 订单页面获取品牌礼遇列表
    path: '/api/v1/order/liquan',
    method: 'get',
    // active: true,
    data: [
      {
        id: '122',
        code: '3344',
        name: '生日礼券',
        discount_momey: 100,
        all_momey: 500,
        comment: '描述信息',
        can_use: 1
      },
      {
        id: '122',
        code: '3344',
        name: '生日礼券',
        discount_momey: 100,
        all_momey: 500,
        comment: '描述信息',
        can_use: 0
      }
    ]
  }
];

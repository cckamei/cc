export default [{
    //库存
    path: '/api/v1/goods_stock',
    data: { "stock": 99 }
  },
  {
    // 个人中心卡券数量
    path: '/api/v1/my/coupons/count',
    data: { "vipcard_count": 1, "coupon_count": 1, "uncoupon_count": 2 }
  },
  {
    // 我的优惠券
    path: '/api/v1/my/coupons',
    data: [{
      "name": "test1",
      "status": 0, // 0：可使用  1：已过期  2：已作废
      "discount_money": 150,
      "endtime": "2018-10-10 00:00:00",
      "all_money": 1000,
      "starttime": "2018-09-10 00:00:00",
      "coupon_id": "5baddef1467b621adb48d922",
      "comment": "xxxx",
    }]
  },
  {
    // 待领优惠券
    path: '/api/v1/coupons',
    data: [{
        "coupon_id": "5baddef1467b621adb48d922", //优惠券id
        "endtime": "2018-10-10 00:00:00", //截止时间
        "name": "test1", //优惠券名称
        "discount_money": 150, //优惠金钱
        "already": true, //是否领取过
        "starttime": "2018-09-10 00:00:00", //开始时间
        "all_money": 1000, //达到满减要求的金额
        "comment": "xxx", //购买注意事项
      },
      {
        "coupon_id": "5baddffb38f7564a6a5ca31d",
        "endtime": "2018-10-20 00:00:00",
        "name": "test3",
        "discount_money": 500,
        "starttime": "2018-09-11 00:00:00",
        "already": false,
        "all_money": 2000,
        "comment": "xxx",
      }
    ]
  },
  {
    // 优惠券详情
    path: /api\/v1\/coupons\/detail/,
    data: {
      "name": "test1",
      "status": 0, //0：可使用  1：已过期  2：已作废
      "discount_money": 150,
      "endtime": "2018-10-10 00:00:00",
      "all_money": 1000,
      "starttime": "2018-09-10 00:00:00",
      "coupon_id": "5baddef1467b621adb48d922",
      "comment": "xxxxxx" //优惠券注意事项
    }
  },
  {
    //我的购物卡
    path: '/api/v1/my/vipcards',
    data: [{
      "name": "test1",
      "status": 0, //  0：可使用  1：已过期  2：已作废
      "discount": 8,
      "endtime": "2018-10-10 00:00:00",
      "starttime": "2018-09-10 00:00:00",
      "card_id": "5baddef1467b621adb48d922",
      "use_type": 1, //适用范围类型 0:全部 1:按套系 2：按款式 3：按镶嵌方式
      "use_type_range": ["猛狮", "A套系", "B套系"], //适用范围  数组类型  套系1，套系2 ... ； 注意：若use_type为全部(0)，use_type_range为空数组
      "comment": "xxxxxx" //购物卡注意事项
    }]
  },
  {
    //购物卡商城
    path: '/api/v1/vipcards',
    data: [{
        "card_id": "5baddef1467b621adb48d922", //VIP卡id
        "endtime": "2018-10-10 00:00:00", //截止时间
        "name": "test1", //卡名称
        "discount": 7.5, //优惠折扣
        "already": true, //是否领取过
        "starttime": "2018-09-10 00:00:00", //开始时间
        "price": 66, //价格  
        "use_type": 1, //适用范围类型  0:全部 1:按套系 2：按款式 3：按镶嵌方式
        "use_type_range": ["猛狮", "A套系", "B套系"], //适用范围  数组类型  套系1，套系2 ...； 注意：若use_type为全部(0)，use_type_range为空数组
        "comment": "xxxxxx" //购物卡注意事项
      },
      {
        "card_id": "5baddffb38f7564a6a5ca31d",
        "endtime": "2018-10-20 00:00:00",
        "name": "test3",
        "discount": 8,
        "starttime": "2018-09-11 00:00:00",
        "already": false,
        "price": 66,
        "use_type": "2",
        "use_type_range": ["A款式", "B款式"],
        "comment": "xxxxxx" //购物卡注意事项
      }
    ]
  },
  {
    // 购物卡详情
    path: /api\/v1\/vipcards\/detail/,
    data: {
      "name": "test1",
      "status": 0, // 0：可使用  1：已过期  2：已作废
      "discount": 8,
      "endtime": "2018-10-10 00:00:00",
      "price": 66,
      "starttime": "2018-09-10 00:00:00",
      "card_id": "5baddef1467b621adb48d922",
      "use_type": 0, // 0:全部 1:按套系 2：按款式 3：按镶嵌方式
      "use_type_range": [],
      "comment": "xxxxxx" //购物卡注意事项
    }
  }
];
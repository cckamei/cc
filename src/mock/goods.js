export default [{
    path: /api\/v1\/goods\/detail/,
    active: true,
    data: {
      "xiangqiancaizhi": "",
      "fuzuanfenshu": "",
      "service": [{
          "desc": "微信商城购买的商品提供免费保修服务",
          "name": "店铺保修"
        },
        {
          "desc": "微信商城购买的商品可在线下品牌专柜提供客户权益保障",
          "name": "专柜联保"
        }
      ],
      "merchant_code": "DES00153",
      "is_diamond": false,
      "fuzuanxingzhuang": "",
      "slide_img": ["http://img.cc-jewel.com/892dbcce-e197-11e8-bde2-00163e020fbd", "http://img.cc-jewel.com/8ac04390-e197-11e8-bde2-00163e020fbd"],
      "cangku": "广东深圳",
      "xiangqianfangshi": "",
      "sub_title": "点亮秋冬，对抗单调和乏味",
      "has_kezi": false,
      "is_shop_same": true,
      "series": "CHIC 潮",
      "goods_title": "魅狐耳饰耳钉",
      "skus": [{ "price": 6800.0, "sku_id": "5be147d3a2154f6a3731a5f4", "merchant_code": "110601001", "color": "红粉", "default": null, "count": 99, "weight_unit": null, "zhuzuanfenshu": null, "guige": "标准", "weight_value": null, "zhushimingcheng": "红宝石", "zuanshijingdu": null, "zhushipingji": "标准" }],
      "img": "http://img.cc-jewel.com/85ddc6fe-e197-11e8-bde2-00163e020fbd",
      "price": 6800.0,
      "logitics": { "price": 0.0, "name": "顺丰快递" },
      "kuanshi": "耳饰",
      "goods_id": "5be14683a2154f6a355108e0",
      "is_new": true,
      "is_active": true,
      "category": null,
      "detail": "<p><img alt=\"\" src=\"http://img.cc-jewel.com/2701e4da-e291-11e8-bde2-00163e020fbd\" style=\"height:1232px; width:790px\" /><img alt=\"\" src=\"http://img.cc-jewel.com/2cbd4fc2-e291-11e8-bde2-00163e020fbd\" style=\"height:1816px; width:790px\" /><img alt=\"\" src=\"http://img.cc-jewel.com/f1a89c84-e290-11e8-bde2-00163e020fbd\" style=\"height:2013px; width:790px\" /><img alt=\"\" src=\"http://img.cc-jewel.com/010285e6-e291-11e8-bde2-00163e020fbd\" style=\"height:1066px; width:790px\" /></p>",
      "tag": "",
      "zhuzuanxingzhuang": "",
      "zuanshiqiegong": ""
    }
  },
  {
    // 获取优惠券
    path: /api\/v1\/coupons/,
    // active: true,
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
    // 获取优惠活动
    path: /api\/v1\/active\/list/,
    // active: true,
    data: [{
        "active_type": "0", // 活动类型 0：限时折扣   1：满减优惠
        "name": "五一特惠", // 活动名称
        "discount": 7, // 折扣
        "start": "2018-09-10 00:00:00",
        "end": "2018-09-10 00:00:00",
        "use_kind": "0", //  0：全店商品， 1：指定商品
      }, {
        "active_type": "1", // 活动类型 0：限时折扣   1：满减优惠
        "name": "五一特惠2", // 活动名称
        "discount": 7, // 折扣
        "start": "2018-09-10 00:00:00",
        "end": "2018-09-10 00:00:00",
        "use_kind": "0", //  0：全店商品， 1：指定商品
        "discount_type": "0", // 0:满减  1：每满减  2: 满件  3：每满件
        "zengquan": "0", // 0: 不赠券  1：赠券
        "items": [{
          "all": 100,
          "discount_money": 10,
          "coupon_id": ""
        }, {
          "all": 50,
          "discount_money": 20,
          "coupon_id": ""
        }, {
          "all": 50,
          "discount_money": 20,
          "coupon_id": ""
        }]

      },
      {
        "active_type": "1", // 活动类型 0：限时折扣   1：满减优惠
        "name": "五一特惠3", // 活动名称
        "discount": 7, // 折扣
        "start": "2018-09-10 00:00:00",
        "end": "2018-09-10 00:00:00",
        "use_kind": "1", //  0：全店商品， 1：指定商品
        "discount_type": "2", // 0:满减  1：每满减  2: 满件  3：每满件
        "zengquan": "1", // 0: 不赠券  1：赠券
        "items": [{
          "all": 100,
          "discount_money": 10,
          "coupon_id": ""
        }, {
          "all": 50,
          "discount_money": 20,
          "coupon_id": ""
        }]

      }
    ]
  }
];
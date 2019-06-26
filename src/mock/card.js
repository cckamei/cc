export default [{
    // 获取空托列表
    path: /api\/v1\/kt\/info/,
    active: true,
    data: [{
        "kt_caizhi": "18K", //空托材质
        "kt_caizhi_color": "W", // W: 白色， Y：黄色， R：玫瑰金
        "shouc": [11, 12, 13, 14], //男士手寸
      },
      {
        "kt_caizhi": "19K", //空托材质
        "kt_caizhi_color": "W", // W: 白色， Y：黄色， R：玫瑰金
        "shouc": [11, 12, 13, 16], //男士手寸
        "shouc": [11, 12, 13, 19] //女士手寸
      }
    ]
  },
  {
    // 获取钻石列表
    path: /api\/v1\/zhus\/info/,
    data: {
      "infos": [{
        "fhlx": "2", // 发货类型  1：现货， 2：15天， 3：45天
        "jinlx": "18K白", // 金类型
        "gsmh": "DRGC01070", // 公司模号
        "zhusjd": "VS2", //净度
        "shouj": "8140", // 售价
        "shouc": "13", // 手寸
        "zslx": "GIA/IGI/HRD", //证书类型
        "zhusqg": "3VG", //切工
        "zhusys": "I", // 颜色
        "zhusz": "0.33", // 主石重
        "zhuspg": "", // 主石抛工
        "zhusdc": "" // 主石对称
      }, ],
      "pageIndex": 1
    }
  }
];
let api = {
  wxLogin: { url: 'api/v1/wechat_login' }, //微信授权登陆
  wxBindPhone: { url: 'api/v1/bind_phone' }, //微信授权登陆后绑定手机号
  getWxSign: { url: 'api/v1/wechat_sign', method: 'post' }, //微信签名
  authCode: { url: 'api/v1/vcode', method: 'get' }, //获取短信验证码
  register: { url: 'api/v1/register' }, //手机号注册
  login: { url: 'api/v1/login' }, //手机号登陆
  forget: { url: 'api/v1/forget_password' }, //修改密码
  index: { url: 'api/v1/preset', method: 'get' }, //首页接口
  goods: { url: 'api/v1/goods', method: 'get' }, //获取商品列表
  series: { url: 'api/v1/series', method: 'get' }, //获取所有套系信息
  getCategory: { url: 'api/v1/category', method: 'get' },
  goodsDetail: { url: 'api/v1/goods/detail/:id', method: 'get' }, //获取商品详情
  cart: { url: 'api/v1/cart', method: 'get' }, //获取购物车的商品列表
  addCart: { url: 'api/v1/cart' }, //添加删除购物车
  addCollect: { url: 'api/v1/collects' }, //收藏商品
  delCollect: { url: 'api/v1/collects', method: 'delete', isJson: true }, //移除收藏商品
  getUserInfo: { url: 'api/v1/user_info', method: 'get' }, //获取个人信息
  editUserInfo: { url: 'api/v1/user_info', method: 'post' }, //个人资料完善
  getAddress: { url: 'api/v1/address', method: 'get' }, //获取收货地址
  addAdress: { url: 'api/v1/address', method: 'post' }, //添加收货地址
  setAdress: { url: 'api/v1/address', method: 'put', isJson: true }, //编辑收货地址
  delAdress: { url: 'api/v1/address', method: 'delete', isJson: true }, //删除收货地址
  getProvince: { url: '/api/v1/province', method: 'get' }, //获取省
  getCity: { url: '/api/v1/city', method: 'get' }, //获取市
  getDistrict: { url: '/api/v1/district', method: 'get' }, //获取区
  getRecommend: { url: 'api/v1/recommendcart', method: 'get' }, //
  getappoint: { url: 'api/v1/appointment', method: 'get' }, //获取预约信息
  addAppointment: { url: 'api/v1/appointment', method: 'post' },
  getStore: { url: 'api/v1/store', method: 'get' },
  cancelAppointment: { url: 'api/v1/appointment', method: 'put', isJson: true },
  getOrders: { url: 'api/v1/my/orders', method: 'get' },
  addOrder: { url: 'api/v1/cart', method: 'put', isJson: true }, //下单
  getLogitics: { url: 'api/v1/logitics', method: 'get' }, //查看快递
  getTicheng: { url: 'api/v1/ticheng', method: 'get' },
  lastTicheng: { url: 'api/v1/lastticheng', method: 'get' },
  updateAppointment: { url: 'api/v1/appointment', method: 'put', isJson: true },
  getOrder: { url: 'api/v1/order/detail/:id', method: 'get' },
  changeOrder: { url: 'api/v1/change_order', method: 'post' },
  pay1: { url: 'api/v1/pay_prepare', method: 'post' }, //支付1
  pay2: { url: 'api/v1/pay_submit', method: 'post' }, //支付2
  collects: { url: 'api/v1/collects', method: 'get' },
  updateOrder: { url: 'api/v1/update_order' }, //修改订单
  forgetPwd: { url: 'api/v1/forget_password' }, //忘记密码
  resetPwd: { url: 'api/v1/reset_password' }, //重置密码
  buyNow: { url: 'api/v1/buy_now' }, //立即购买
  goodsStock: { url: 'api/v1/goods_stock', method: 'get' }, //获取某个sku的库存
  images: { url: 'api/v1/preset_png', method: 'get' }, //获取默认图
  cards: { url: 'api/v1/vipcards', method: 'get' }, //获取购物卡列表
  getMyCards: { url: 'api/v1/my/vipcards', method: 'get' }, //查看个人已有购物卡
  cardDetail: { url: 'api/v1/vipcards/detail/:id', method: 'get' }, //获取购物卡详情
  coupons: { url: 'api/v1/coupons', method: 'get' }, //获取优惠券列表
  getMyCoupons: { url: 'api/v1/my/coupons', method: 'get' }, //查看个人优惠券
  addCoupons: { url: 'api/v1/my/coupons' }, //领取优惠券
  getCoupon: { url: 'api/v1/coupons/detail/:id', method: 'get' }, //获取优惠券详情
  getCouponCount: { url: 'api/v1/my/coupons/count', method: 'get' }, //获取个人中心卡券数量
  buyCard: { url: 'api/v1/buy_vipcard_now' }, //购买购物卡
  cardShareURL: { url: 'api/v1/share/pic' }, //优惠券购物卡生成分享图片地址
  getEmptyRing: { url: 'api/v1/kt/info', method: 'get' }, //主石定制空托列表
  getStoneList: { url: 'api/v1/zhus/info', method: 'get' }, //获取钻石列表
  getStoneSimOptions: { url: 'api/v1/zhus/simple_options', method: 'get' }, //获取钻石快捷筛选选项
  getStoneOptions: { url: 'api/v1/zhus/options', method: 'get' }, //获取钻石高级筛选选项
  addDIYStoneOrder: { url: 'api/v1/buy_diyproduct_now', method: 'post' }, //提交托石分离订单
  getActivity: { url: 'api/v1/active/list', method: 'get' }, //获取商品详情优惠活动列表
  getBrandGift: { url: 'api/v1/order/liquan', method: 'get' }, //获取品牌礼遇列表
  getOrderCoupon: { url: 'api/v1/order/coupons', method: 'post', isJson: true }, //获取下单时可用的优惠券
  getOrderActivity: { url: 'api/v1/order/actives', method: 'post', isJson: true }, //获取下单时优惠活动列表
  getStonePrice: { url: 'api/v1/s_diy_price', method: 'get' }, //高级定制价格查询
  getPackageList: { url: 'api/v1/gp/:id', method: 'get' }, //根据商品id获取套餐
  buyPackage: { url: 'api/v1/buy_taocan_now', method: 'post' }, //套餐购买
  addInvoice: { url: 'api/v1/add_invoice', method: 'post', isJson: true }, //开票
  viewInvoice: { url: 'api/v1/invoice', method: 'get' }, //查看发票
  getWechatGroup: { url: 'api/v1/marketing_group', method: 'get' }, //商品详情营销群
  returnMoney: { url: 'api/v1/add_return_amount', method: 'post', isJson: true }, //退差价
  getLettering: { url: 'api/v1/aepict_info', method: 'get' }, //获取刻字列表
  getMixinsPic: { url: 'api/v1/show_aepict_info', method: 'get' }, //获取组合图片
  showLettering: { url: 'api/v1/show_goods_aepict', method: 'get' }, //订单查询刻字
  addLettering: { url: 'api/v1/add_goods_aepict', method: 'post', isJson: true }, //订单加入刻字
  shopList: { url: 'api/v1/store_list', method: 'get' }, //店铺列表
  tradeinOptions: { url: 'api/v1/yjhx_options', method: 'get' }, //以旧换新选项
  tradeinAddOld: { url: 'api/v1/add_yjhx_order', method: 'post' }, //以旧换新添加旧品商品
  tradeinAddNew: { url: 'api/v1/add_new_goods', method: 'post', isJson: true }, //以旧换新添加新品
  tradeinUpdateOrder: { url: 'api/v1/update_yjhx_order/:id', method: 'post' }, //以旧换新旧品发货订单？？？/以旧换新取消订单/以旧换新确认收货
  tradeinCalOld: { url: 'api/v1/auto_cal_price', method: 'post' }, //估算旧品价格
  tradeinCalNew: { url: 'api/v1/check_new_goods_price', method: 'post', isJson: true }, //估算新品价格
  omGetPrice: { url: 'api/v1/split_pay', method: 'get' }, //分开付款 获取待付款金额信息
  omPay1: { url: 'api/v1/split_pay_prepare', method: 'post' }, //分开付款 支付流程第一步
  omPay2: { url: 'api/v1/split_pay_submit', method: 'post' }, //分开付款 向我方服务发起支付
  getBareStoneList: { url: 'api/v1/ls/info', method: 'get' }, //获取裸钻列表
  addBareStoneOrder: { url: 'api/v1/buy_luoshi_now', method: 'post' } //提交裸石订单
};

for (var k in api) {
  let urlHost = process.env.VUE_APP_API_HOST;
  let url = api[k].url;
  api[k].url = urlHost + url;
}

export default api;

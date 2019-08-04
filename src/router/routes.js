const router = [{
    name: 'index',
    path: '/',
    component: () => import('@/views/home')
  },
  {
    name: 'goodslist',
    path: '/goodslist',
    component: () => import('@/views/goodslist')
  },
  {
    name: 'goodssearch',
    path: '/goodslist/goodssearch',
    component: () => import('@/views/goodssearch')
  },
  {
    name: 'goodsdetail',
    path: '/goodslist/goodssearch/goodsdetail/:id',
    component: () => import('@/views/goodsdetail')
  },
  {
    name: 'package',
    path: '/goodslist/goodssearch/goods-detail/package',
    component: () => import('@/views/package/index')
  },
  {
    name: 'packageorder',
    path: '/goodslist/goodssearch/goods-detail/package/order',
    component: () => import('@/views/package/confirmorder')
  },
  {
    name: 'cart',
    path: '/goodslist/goodssearch/goods-detail/cart',
    component: () => import('@/views/cart'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'confirmorder',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder',
    component: () => import('@/views/confirmorder')
  },
  {
    name: 'lettering',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/lettering/:type/:index',
    component: () => import('@/views/lettering/index')
  },
  {
    name: 'letteringedit',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/lettering-edit/:index',
    component: () => import('@/views/lettering/edit')
  },
  {
    name: 'selectcoupon',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/selectcoupon',
    component: () => import('@/views/coupon/selectcoupon')
  },
  {
    name: 'selectactivity',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/selectactivity',
    component: () => import('@/views/card/selectactivity')
  },
  {
    name: 'address',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/address',
    component: () => import('@/views/address')
  },
  {
    name: 'pay',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/pay',
    component: () => import('@/views/pay')
  },
  {
    name: 'paysuccess',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/pay/paysuccess',
    component: () => import('@/views/paysuccess')
  },
  {
    name: 'wechatgroup',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/pay/paysuccess/wechatgroup',
    component: () => import('@/views/wechat/index')
  },
  {
    name: 'invoice',
    path: '/goodslist/goodssearch/goods-detail/cart/confirmorder/invoice',
    component: () => import('@/views/invoice/index')
  },
  {
    name: 'cusstone',
    path: '/goodslist/goodssearch/goods-detail/cusstone',
    component: () => import('@/views/cusstone/index')
  },
  {
    name: 'cusstoneorder',
    path: '/goodslist/goodssearch/goods-detail/cusstone/order',
    component: () => import('@/views/cusstone/confirmorder')
  },
  {
    name: 'selectstone',
    path: '/goodslist/goodssearch/goods-detail/cusstone/selectstone',
    component: () => import('@/views/cusstone/selectstone')
  },
  {
    name: 'advanced',
    path: '/goodslist/goodssearch/goods-detail/cusstone/selectstone/advanced',
    component: () => import('@/views/cusstone/index')
  },
  {
    name: 'advancedselect',
    path: '/goodslist/goodssearch/goods-detail/cusstone/selectstone/advanced/select',
    component: () => import('@/views/cusstone/advanced')
  },
  {
    name: 'success',
    path: '/goodslist/goodssearch/goods-detail/cusstone/selectstone/advanced/success',
    component: () => import('@/views/cusstone/success')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    name: 'register',
    path: '/login/register',
    component: () => import('@/views/register')
  },
  {
    name: 'agreement',
    path: '/login/register/agreement',
    component: () => import('@/views/agreement')
  },
  {
    name: 'verifyphone',
    path: '/login/verifyphone',
    component: () => import('@/views/verifyphone')
  },
  {
    name: 'perfectinfo',
    path: '/login/verifyphone/perfectinfo',
    component: () => import('@/views/perfectinfo')
  },
  {
    name: 'registersuccess',
    path: '/login/verifyphone/perfectinfo/registersuccess',
    component: () => import('@/views/registersuccess')
  },
  {
    name: 'mypage',
    path: '/mypage',
    component: () => import('@/views/user/index'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'commissions',
    path: '/commissions',
    component: () => import('@/views/commissions'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'orderlist',
    path: '/my/orderlist',
    component: () => import('@/views/order/index'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'orderdetail',
    path: '/my/orderdetail',
    component: () => import('@/views/order/orderdetail'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'viewinvoice',
    path: '/orderlist/orderdetail/invoice',
    component: () => import('@/views/invoice/viewinvoice'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'returndiffapply',
    path: '/orderlist/orderdetail/returndiffapply',
    component: () => import('@/views/returndiff/returndiffapply'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'returndiffstatus',
    path: '/orderlist/orderdetail/returndiffapply/returndiffstatus',
    component: () => import('@/views/returndiff/returndiffstatus'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'logistics',
    path: '/my/logistics',
    component: () => import('@/views/logisticsTrack')
  },
  {
    name: 'mystore',
    path: '/my/mystore',
    component: () => import('@/views/mystore'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'myset',
    path: '/my/myset',
    component: () => import('@/views/myset'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'editinfo',
    path: '/my/myset/editinfo',
    component: () => import('@/views/editinfo'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'myaddress',
    path: '/my/myaddress',
    component: () => import('@/views/myaddress')
  },
  {
    name: 'revisepwd',
    path: '/my/revisepwd',
    component: () => import('@/views/revisepwd'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'editaddress',
    path: '/my/editaddress',
    component: () => import('@/views/editaddress'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'applyrefund',
    path: '/my/applyrefund',
    component: () => import('@/views/order/applyrefund'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'refunddetail',
    path: '/my/refunddetail',
    component: () => import('@/views/order/refunddetail'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'cancelList',
    path: '/my/cancelList',
    component: () => import('@/views/order/cancelList'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'bespeak',
    path: '/mypage/bespeak',
    component: () => import('@/views/bespeak/index'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'addappointment',
    path: '/mypage/bespeak/addappointment',
    component: () => import('@/views/bespeak/add'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'freebuy',
    path: '/home/freebuy',
    component: () => import('@/views/freebuy')
  },
  {
    name: 'mycard',
    path: '/card/mycard',
    component: () => import('@/views/card/mycard')
  },
  {
    name: 'cardmall',
    path: '/card/mycard/cardmall',
    component: () => import('@/views/card/cardmall')
  },
  {
    name: 'carddetail',
    path: '/card/mycard/cardmall/:id',
    component: () => import('@/views/card/carddetail')
  },
  {
    name: 'cardorder',
    path: '/card/mycard/cardmall/carddetail/order',
    component: () => import('@/views/card/confirmorder')
  },
  {
    name: 'mycoupon',
    path: '/coupon/mycoupon',
    component: () => import('@/views/coupon/mycoupon')
  },
  {
    name: 'couponmall',
    path: '/coupon/mycoupon/couponmall',
    component: () => import('@/views/coupon/couponmall')
  },
  {
    name: 'coupondetail',
    path: '/coupon/mycoupon/couponmall/:id',
    component: () => import('@/views/coupon/coupondetail')
  },
  {
    name: 'sharecard',
    path: '/sharecard',
    component: () => import('@/views/coupon/share')
  },
  {
    name: 'memberbenefits',
    path: '/coupon/memberbenefits',
    component: () => import('@/views/coupon/memberbenefits')
  },
  {
    name: 'shoplist',
    path: '/shoplist',
    component: () => import('@/views/shop/shoplist')
  },
  {
    name: 'shopdetail',
    path: '/shoplist/:id',
    component: () => import('@/views/shop/shopdetail')
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default router;
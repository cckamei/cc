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
    path: '/goodslist/goodssearch/goodsdetail',
    component: () => import('@/views/goodsdetail'),
    meta: {
      params: []
    }
  },
  {
    name: 'cart',
    path: '/goodslist/goodssearch/goodsdetail/cart',
    component: () => import('@/views/cart'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'confirmorder',
    path: '/goodslist/goodssearch/goodsdetail/cart/confirmorder',
    component: () => import('@/views/confirmorder'),
    meta: {}
  },
  {
    name: 'address',
    path: '/goodslist/goodssearch/goodsdetail/cart/confirmorder/address',
    component: () => import('@/views/address')
  },
  {
    name: 'pay',
    path: '/goodslist/goodssearch/goodsdetail/cart/confirmorder/pay',
    component: () => import('@/views/pay')
  },
  {
    name: 'paysuccess',
    path: '/goodslist/goodssearch/goodsdetail/cart/confirmorder/pay/paysuccess',
    component: () => import('@/views/paysuccess')
  },
  {
    name: 'cusstone',
    path: '/goodslist/goodssearch/goodsdetail/cusstone',
    component: () => import('@/views/cusstone/index')
  },
  {
    name: 'cusstoneorder',
    path: '/goodslist/goodssearch/goodsdetail/cusstone/order',
    component: () => import('@/views/cusstone/confirmorder'),
    meta: {
      params: []
    }
  },
  {
    name: 'selectstone',
    path: '/goodslist/goodssearch/goodsdetail/cusstone/selectstone',
    component: () => import('@/views/cusstone/selectstone')
  },
  {
    name: 'advanced',
    path: '/goodslist/goodssearch/goodsdetail/cusstone/selectstone/advanced',
    component: () => import('@/views/cusstone/advanced')
  },
  {
    name: 'success',
    path: '/goodslist/goodssearch/goodsdetail/cusstone/selectstone/advanced/success',
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
    component: () => import('@/views/orderdetail'),
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
    component: () => import('@/views/applyrefund'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'refunddetail',
    path: '/my/refunddetail',
    component: () => import('@/views/refunddetail'),
    meta: {
      params: ['token']
    }
  },
  {
    name: 'cancelList',
    path: '/my/cancelList',
    component: () => import('@/views/cancelList'),
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
    component: () => import('@/views/freebuy'),
    meta: {
      params: []
    }
  },
  {
    name: 'redirect',
    path: '/redirect',
    component: () => import('@/views/redirect'),
    meta: {
      params: []
    }
  },
  {
    name: 'mycard',
    path: '/card/mycard',
    component: () => import('@/views/card/mycard'),
    meta: {
      params: []
    }
  },
  {
    name: 'cardmall',
    path: '/card/mycard/cardmall',
    component: () => import('@/views/card/cardmall'),
    meta: {
      params: []
    }
  },
  {
    name: 'carddetail',
    path: '/card/mycard/cardmall/:id',
    component: () => import('@/views/card/carddetail'),
    meta: {
      params: []
    }
  },
  {
    name: 'cardorder',
    path: '/card/mycard/cardmall/carddetail/order',
    component: () => import('@/views/card/confirmorder'),
    meta: {
      params: []
    }
  },
  {
    name: 'mycoupon',
    path: '/coupon/mycoupon',
    component: () => import('@/views/coupon/mycoupon'),
    meta: {
      params: []
    }
  },
  {
    name: 'couponmall',
    path: '/coupon/mycoupon/couponmall',
    component: () => import('@/views/coupon/couponmall'),
    meta: {
      params: []
    }
  },
  {
    name: 'coupondetail',
    path: '/coupon/mycoupon/couponmall/:id',
    component: () => import('@/views/coupon/coupondetail'),
    meta: {
      params: []
    }
  },
  {
    name: 'sharecard',
    path: '/sharecard',
    component: () => import('@/views/coupon/share'),
    meta: {
      params: []
    }
  },
  {
    name: 'memberbenefits',
    path: '/coupon/memberbenefits',
    component: () => import('@/views/coupon/memberbenefits'),
    meta: {
      params: []
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default router;
import Vue from 'vue';
import Vuex from 'vuex';
import { serialize, getLoc, setLoc, getSen, setSen } from '../utils';
import { xhr, api } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  state: {
    cacheData: getSen('cacheData') || {},
    ordertype: -1,
    common: getSen('common') || {
      goodsId: '',
      goodsType: '',
      orderId: '',
      emp_id: '',
      category: '',
      isTradein: false
    },
    appointment: getSen('appointment') || {},
    userInfo: getSen('userInfo') || {},
    address: getSen('address') || { type: 0 },
    cart: getSen('cart') || {},
    payOrder: getSen('payOrder') || {},
    card: getSen('card') || {},
    stoneMade: getSen('stoneMade') || {},
    shareCard: getSen('shareCard') || {
      url: '',
      type: 0
    },
    package: getSen('package') || {},
    redirect: getSen('redirect') || {
      page: '',
      params: {},
      query: {}
    },
    invoice: getSen('invoice') || {},
    letteringValues: getSen('letteringValues') || [{ type: 2 }, { type: 2 }, { type: 2 }],
    letteringLabels: getSen('letteringLabels') || {
      type: ['文字', '图案', '无'],
      font: ['黑体', '宋体'],
      subject: ['星座', '生肖'],
      constellation: ['金牛座', '摩羯座'],
      zodiac: ['牛', '鼠']
    },
    shopList: getSen('shopList') || [],
    tradeinOld: getSen('tradeinOld') || [],
    tradeinNew: getSen('tradeinNew') || [],
    tradeinViewOld: getSen('tradeinViewOld') || [],
    tradeinOptions: getSen('tradeinOptions') || {}
  },
  getters: {
    getCacheData: state => serialize(state.cacheData),
    getCommon: state => state.common,
    getAppointment: state => state.appointment,
    token: state => state.userInfo.token,
    userId: state => state.userInfo.userId,
    getAddress: state => state.address,
    getUserInfo: state => state.userInfo,
    getCart: state => state.cart,
    getOrderId: state => state.common.orderId,
    getPayOrder: state => serialize(state.payOrder),
    getOrderType: state => state.ordertype,
    getStoneMade: state => serialize(state.stoneMade),
    getLetteringValues: state => serialize(state.letteringValues),
    getLetteringLabels: state => serialize(state.letteringLabels),
    getTradeinOld: state => serialize(state.tradeinOld),
    getTradeinNew: state => serialize(state.tradeinNew),
    getTradeinOptions: state => serialize(state.tradeinOptions)
  },
  mutations: {
    setCacheData(state, data) {
      state.cacheData = { ...state.cacheData, ...data };
      setSen('cacheData', state.cacheData);
    },
    setCommon(state, data) {
      state.common = { ...state.common, ...data };
      setSen('common', state.common);
    },
    setRedirect(state, data) {
      state.redirect = data;
      setSen('redirect', data);
    },
    setUserInfo(state, data) {
      state.userInfo = { ...state.userInfo, ...data };
      setSen('userInfo', state.userInfo);
    },
    setAppointment(state, data) {
      state.appointment = { ...state.appointment, ...data };
      setSen('appointment', state.appointment);
    },
    setAddress(state, data) {
      state.address = { ...state.address, ...data };
      setSen('address', state.address);
    },
    setCart(state, data) {
      state.cart = data;
      setSen('cart', data);
    },
    setPayOrder(state, data) {
      state.payOrder = { ...state.payOrder, ...data };
      setSen('payOrder', state.payOrder);
    },
    clearPayOrder(state) {
      state.payOrder = {};
      setSen('payOrder', state.payOrder);
    },
    logout(state) {
      state.userInfo = {};
      setSen('userInfo', state.userInfo);
    },
    setOrderType(state, data) {
      state.ordertype = data;
    },
    setCard(state, data) {
      state.card = data;
      setSen('card', state.card);
    },
    setStoneMade(state, data) {
      state.stoneMade = { ...state.stoneMade, ...data };
      setSen('stoneMade', state.stoneMade);
    },
    setShareCard(state, data) {
      state.shareCard = data;
      setSen('shareCard', state.shareCard);
    },
    setPackage(state, data) {
      state.package = data;
      setSen('package', state.package);
    },
    setInvoice(state, data) {
      state.invoice = { ...state.invoice, ...data };
      setSen('invoice', state.invoice);
    },
    setLetteringValues(state, data) {
      state.letteringValues = data;
      setSen('letteringValues', state.letteringValues);
    },
    setLetteringLabels(state, data) {
      state.letteringLabels = { ...state.letteringLabels, ...data };
      setSen('letteringLabels', state.letteringLabels);
    },
    setShopList(state, data) {
      state.shopList = data;
      setSen('shopList', state.shopList);
    },
    setTradeinOld(state, data) {
      state.tradeinOld = data;
      setSen('tradeinOld', state.tradeinOld);
    },
    setTradeinNew(state, data) {
      state.tradeinNew = data;
      setSen('tradeinNew', state.tradeinNew);
    },
    setTradeinOptions(state, data) {
      state.tradeinOptions = data;
      setSen('tradeinOptions', state.tradeinOptions);
    },
    setTradeinViewOld(state, data) {
      state.tradeinViewOld = data;
      setSen('tradeinViewOld', state.tradeinViewOld);
    }
  },
  actions: {
    ajax(state, data) {
      let name = data.name;
      let cacheData = state.state.cacheData;

      if (data instanceof Array) {
        return xhr(data);
      } else {
        return new Promise((resolve, reject) => {
          if (api[name].cache && cacheData[name]) {
            return resolve(serialize(cacheData[name]));
          }
          xhr(data)
            .then(res => {
              // state.commit('setCacheData', {
              //   [name]: serialize(res)
              // });
              resolve(res);
            })
            .catch(res => reject(res));
        });
      }
    }
  }
});

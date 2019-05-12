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
      lastPage: 'index',
      emp_id: '',
      couponId: '',
      cardId: ''
    },
    appointment: getSen('appointment') || {},
    userInfo: getSen('userInfo') || {},
    address: getSen('address') || {},
    cart: getSen('cart') || {},
    payOrder: getSen('payOrder') || {},
    stoneMade: getSen('stoneMade') || {
      gsmh: ''
    }
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
    getStoneMade: state => serialize(state.stoneMade)
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
    setUserInfo(state, data) {
      state.userInfo = { ...state.userInfo, ...data };
      setSen('userInfo', state.userInfo);
    },
    setAppointment(state, data) {
      state.appointment = { ...state.appointment, ...data };
      setSen('appointment', state.appointment);
    },
    setAddress(state, data) {
      state.address = data;
      setSen('address', data);
    },
    setCart(state, data) {
      state.cart = data;
      setSen('cart', data);
    },
    setPayOrder(state, data) {
      state.payOrder = { ...state.payOrder, ...data };
      setSen('payOrder', state.payOrder);
    },
    clearPayOrder(state, data) {
      state.payOrder = {};
      setSen('payOrder', state.payOrder);
    },
    logout(state, data) {
      state.userInfo = {};
      setSen('userInfo', state.userInfo);
    },
    setOrderType(state, data) {
      state.ordertype = data;
    },
    setStoneMade(state, data) {
      state.stoneMade = { ...state.stoneMade, ...data };
      setSen('stoneMade', state.stoneMade);
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
              state.commit('setCacheData', {
                [name]: serialize(res)
              });
              resolve(res);
            })
            .catch(res => reject(res));
        });
      }
    }
  }
});
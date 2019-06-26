import card from './card';
import custone from './custone';
import goods from './goods';
var Mock = require('mockjs');

function json(data) {
  return {
    "data": data,
    "status": 0,
    "msg": ""
  }
}

const list = [].concat(card, custone, goods);

list.forEach(({ path, active, method = 'get', data }) => {
  if (active) {
    if (typeof path === 'string') {
      path = '/proxy' + path;
    }
    Mock.mock(path, method, json(data));
  }
});
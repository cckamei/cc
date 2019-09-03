import card from './card';
import cusstone from './cusstone';
import goods from './goods';
var Mock = require('mockjs');

function json(data) {
  return {
    data: data,
    status: 0,
    msg: ''
  };
}

const list = [].concat(card, cusstone, goods);

list.forEach(({ path, type, active, method = 'get', data }) => {
  if (active) {
    if (type !== undefined) {
      Mock.mock(path, method, ({ body }) => {
        if (typeof body === 'string') {
          body = JSON.parse(body);
        }
        return json(data[body[type]]);
      });
    } else {
      Mock.mock(path, method, json(data));
    }
  }
});

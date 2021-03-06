import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';
import MintUI from 'mint-ui';
import { Slider, Upload, Modal, Icon } from 'ant-design-vue';
import FastClick from 'fastclick';
import VueClipboard from 'vue-clipboard2';
import router from './router';
import store from './store';
import components from './components';
import filters from './filters';
import directs from './directive';
import App from './App';
import { spread } from './utils';

if (window.htp.mock) {
  require('./mock');
}

Vue.use(VueClipboard);

Vue.use(MintUI);

//ant-design-vue
Vue.use(Slider);
Vue.use(Upload);
Vue.use(Modal);
Vue.use(Icon);

Vue.prototype.toast = MintUI.Toast;
Vue.prototype.spread = spread;

if ('addEventListener' in document) {
  document.addEventListener(
    'fastclick',
    () => {
      FastClick.attach(document.body);
    },
    false
  );
}

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase());
  Vue.component(`v${name}`, components[key]);
});

if (location.href.indexOf('from=wechat') == -1) {
  if (location.href.split('#')[0].indexOf('?') == -1) {
    window.location.href = location.href.split('#')[0] + '?from=wechat#' + location.href.split('#')[1];
  } else {
    window.location.href = location.href.split('#')[0] + '&from=wechat#' + location.href.split('#')[1];
  }
}

store.dispatch('ajax', { name: 'images' }).then(res => {
  store.commit('setUserInfo', res);
});

new Vue({
  data: {
    eventHub: new Vue() //事件中心
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app');

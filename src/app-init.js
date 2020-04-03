import Vue from 'vue';
import urls from '@/common/urls';
import http from '@/common/http';
import store from '@/store';
const devConfig = require('../config/dev-config');

export default function() {
  return new Promise((resolve, reject) => {
    // do something init App
    Vue.prototype.$urls = urls;
    Vue.prototype.$http = http;
    Vue.prototype.$checkLogin = function() {
      if (store.getters.userId) {
        return true;
      }
      return false;
    };

    // 判断环境，此处可以扩展
    let bridge = '';
    if (process.env.NODE_ENV === 'development') {
      bridge = 'dev';
    }
    if (bridge === 'dev') {
      store.commit('updateUserId', { userId: devConfig.userId });
      store.commit('updateUserInfo', { userInfo: devConfig.userInfo });
    }
    resolve();
  });
}

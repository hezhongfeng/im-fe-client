import Vue from 'vue';
import urls from '@/common/urls';
import http from '@/common/http';
import store from '@/store';
import ViewPage from '@/compenents/ViewPage.vue';

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

    // 注册全局组件
    Vue.component('view-page', ViewPage);

    resolve();
  });
}

import Vue from 'vue';
import urls from '@/common/urls';
import http from '@/common/http';

export default function() {
  return new Promise((resolve, reject) => {
    // do something init App
    Vue.prototype.$urls = urls;
    Vue.prototype.$http = http;
    resolve();
  });
}

// import Vue from 'vue';
import axios from 'axios';
import Promise from './promise-finally';
import store from '@/store';

// 添加一个响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // Do something with response data
//     store.commit('updateNetworkError', false);
//     return response;
//   },
//   error => {
//     // Do something with response error
//     switch (error.message) {
//       case 'Network Error':
//         // 显示网络错误
//         const msg = { data: { resultCode: '0', errorMessage: '网络已断开' } };
//         store.commit('updateNetworkError', true);
//         return msg;
//     }
//     return Promise.reject(error);
//   }
// );

const responseHandle = function(response) {
  return new Promise(function(resolve, reject) {
    const data = response.data;
    if (data.resultCode === '100') {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

/**
 * 当前请求计数
 * 保存到vuex中
 * 在app.vue中监控处理
 */
const add = () => {
  store.commit('Loading/addCounter');
};
const minus = () => {
  store.commit('Loading/minusCounter');
};

export default {
  async get(url, params) {
    add();
    const host = store.getters.current.host || '';
    const response = await axios.get(host + url, { params: params });
    minus();
    return responseHandle(response);
  },
  async post(url, params) {
    add();
    const host = store.getters.current.host || '';
    const response = await axios.post(host + url, params);
    minus();
    return responseHandle(response);
  },
  async put(url, params) {
    add();
    const host = store.getters.current.host || '';
    const response = await axios.put(host + url, params);
    minus();
    return responseHandle(response);
  },
  async delete(url, params) {
    add();
    const host = store.getters.current.host || '';
    const response = await axios.delete(host + url, { data: params });
    minus();
    return responseHandle(response);
  }
};

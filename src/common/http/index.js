import axios from 'axios';
import Promise from './promise-finally';

// 默认的全局处理拦截
const responseHandle = function(response) {
  return new Promise(function(resolve, reject) {
    const data = response.data;
    if (data.statusCode === '0') {
      resolve(data.data);
    } else {
      reject(data);
    }
  });
};

export default {
  async get(url, params) {
    const response = await axios.get(url, { params: params });
    return responseHandle(response);
  },
  async post(url, params) {
    const response = await axios.post(url, params);
    return responseHandle(response);
  },
  async put(url, params) {
    const response = await axios.put(url, params);
    return responseHandle(response);
  },
  async delete(url, params) {
    const response = await axios.delete(url, { data: params });
    return responseHandle(response);
  }
};

import http from '@/common/http';
import urls from '@/common/urls';
import store from '@/store';

export function getUserInfo() {
  const userInfo = store.getters.userInfo;
  http.get(urls.restful.userInfo + `/${userInfo.id}`).then(data => {
    store.commit('updateUserInfo', {
      userInfo: data
    });
  });
}

export function updateUserInfo(params) {
  const userInfo = store.getters.userInfo;

  return http.put(urls.restful.userInfo + `/${userInfo.id}`, Object.assign({}, userInfo, params));
}

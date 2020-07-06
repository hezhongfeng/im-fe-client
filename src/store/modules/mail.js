import http from '@/common/http';
import urls from '@/common/urls';

const state = {
  // 申请数量
  applyCount: 0,
  mailList: []
};

// getters
const getters = {
  mailList(state) {
    return state.mailList;
  },
  applyCount(state) {
    return state.applyCount;
  }
};

// mutations
const mutations = {
  updateMailList(state, mailList) {
    state.mailList = mailList;
  },
  updateApplyCount(state, applyCount) {
    state.applyCount = applyCount;
  }
};

// actions
const actions = {
  getMailList({ commit }) {
    http.get(urls.mailList.mailList).then(data => {
      commit('updateMailList', data);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

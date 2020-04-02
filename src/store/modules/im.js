const state = {
  sessionList: []
};

// getters
const getters = {
  sessionList(state) {
    return state.sessionList;
  },
  activeSession(state) {
    return state.sessionList.find(item => item.isActive === true);
  },
  messageList(state) {
    return state.sessionList.find(item => item.isActive === true).messageList;
  }
};

// mutations
const mutations = {
  newMessage(state, { type, targetId, message }) {
    state.sessionList
      .find(session => {
        return session.type === type && session.targetId === targetId;
      })
      .messageList.push(message);
  },
  updateSessionList(state, sessionList) {
    state.sessionList = sessionList;
  },
  updateSessionInfo(state, { type, targetId, info }) {
    state.sessionList.find(session => {
      return session.type === type && session.targetId === targetId;
    }).info = info;
  },
  activateSession(state, { type, targetId, isActive }) {
    console.log({ type, targetId, isActive });
    state.sessionList.find(session => {
      return session.type === type && session.targetId === targetId;
    }).isActive = isActive;
  }
};

// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

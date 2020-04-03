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
  newMessage(state, { message, isPush = true }) {
    const messageList = state.sessionList.find(session => {
      return session.id === message.sessionId;
    }).messageList;
    if (isPush) {
      messageList.push(message);
    } else {
      messageList.unshift(message);
    }
  },
  updateSessionList(state, sessionList) {
    state.sessionList = sessionList;
  },
  updateSessionInfo(state, { sessionId, info }) {
    state.sessionList.find(session => {
      return session.id === sessionId;
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

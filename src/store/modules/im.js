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
    const session = state.sessionList.find(session => {
      return session.id === message.sessionId;
    });
    if (isPush) {
      session.messageList.push(message);
    } else {
      session.messageList.unshift(message);
    }
    console.log(session.messageList.length, session.messageCount);
    if (session.messageList.length === session.messageCount) {
      session.finished = true;
    }
  },
  clearMessages(state, { sessionId }) {
    const session = state.sessionList.find(session => {
      return session.id === sessionId;
    });
    session.messageList = [];
    session.pageNumber = 1;
  },
  updateMessageCount(state, { sessionId, messageCount }) {
    state.sessionList.find(session => {
      return session.id === sessionId;
    }).messageCount = messageCount;
  },
  updateLoading(state, { sessionId, loading }) {
    state.sessionList.find(session => {
      return session.id === sessionId;
    }).loading = loading;
  },
  updateRefreshing(state, { sessionId, refreshing }) {
    state.sessionList.find(session => {
      return session.id === sessionId;
    }).refreshing = refreshing;
  },
  updateSessionList(state, sessionList) {
    state.sessionList = sessionList;
  },
  updateSessionInfo(state, { sessionId, info }) {
    state.sessionList.find(session => {
      return session.id === sessionId;
    }).info = info;
  },
  activateSession(state, { sessionId }) {
    const activeSession = state.sessionList.find(session => {
      return session.isActive === true;
    });
    if (activeSession) {
      activeSession.isActive = false;
    }
    state.sessionList.find(session => {
      return session.id === sessionId;
    }).isActive = true;
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

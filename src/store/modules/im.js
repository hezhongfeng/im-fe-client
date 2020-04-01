const state = {
  sessionList: [
    {
      id: 2,
      type: '1',
      isTop: false,
      topTime: '2020-03-27 16:27:56',
      targetId: '1',
      createdAt: '2020-03-27 16:27:56',
      updatedAt: '2020-03-27 16:27:56',
      userId: 3,
      isActive: true,
      messageList: [
        {
          to: { id: '5645' },
          from: { id: '123' },
          chat_type: 'chat',
          body: {
            msg: '嘿嘿嘿',
            type: 'txt'
          }
        },
        {
          to: { id: '5645' },
          from: { id: '123' },
          chat_type: 'chat',
          body: {
            msg: '嘿哈哈哈嘿',
            type: 'txt'
          }
        }
      ]
    }
  ]
};

// getters
const getters = {
  sessionList(state) {
    return state.sessionList;
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

const state = {
  conversationList: []
};

// getters
const getters = {
  conversationList(state) {
    return state.conversationList;
  },
  activeConversation(state) {
    return state.conversationList.find(item => item.isActive === true);
  }
  // messageList(state) {
  //   return state.conversationList.find(item => item.isActive === true).messageList;
  // }
};

// mutations
const mutations = {
  // 单条新消息
  newMessage(state, { message, isPush = true }) {
    const index = state.conversationList.findIndex(conversation => conversation.id === message.conversationId);
    console.log(index);
    if (isPush) {
      state.conversationList[index].messageList.push(message);
    } else {
      state.conversationList[index].messageList.unshift(message);
    }

    // // 调序，将这个会话排序上调
    const conversation = state.conversationList.splice(index, 1)[0];
    state.conversationList.unshift(conversation);
  },
  // 批量消息
  newMessages(state, { conversationId, messages }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    for (const message of messages) {
      conversation.messageList.unshift(message);
    }
  },
  clearMessages(state, { conversationId }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    conversation.messageList = [];
    conversation.pageNumber = 1;
  },
  updateMessageCount(state, { conversationId, messageCount }) {
    const conversation = state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    });
    conversation.messageCount = messageCount;
    if (conversation.messageList.length >= conversation.messageCount) {
      conversation.finished = true;
    }
  },
  updateLoading(state, { conversationId, loading }) {
    state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    }).loading = loading;
  },
  updateRefreshing(state, { conversationId, refreshing }) {
    state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    }).refreshing = refreshing;
  },
  updateConversationList(state, conversationList) {
    state.conversationList = conversationList;
  },
  updateConversationInfo(state, { conversationId, info }) {
    state.conversationList.find(conversation => {
      return conversation.id === conversationId;
    }).info = info;
  },
  activateConversation(state, { conversationId }) {
    const activeConversation = state.conversationList.find(conversation => {
      return conversation.isActive === true;
    });
    if (activeConversation) {
      activeConversation.isActive = false;
    }
    state.conversationList.find(conversation => {
      return conversation.id === conversationId;
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

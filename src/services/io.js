import http from '@/common/http';
import io from 'socket.io-client';
import store from '@/store';
import urls from '@/common/urls';
import config from '../../config/config';

const IoService = {
  socket: null,
  scroll: null,
  async getSocket() {
    const userId = store.getters.userId;
    this.socket = io(config.ioHost, {
      query: {
        scene: 'im',
        userId: userId
      }
    });

    this.socket.on('connect', () => {
      console.log('socket连接成功！');
      getConversationList();
    });

    // 有新消息
    this.socket.on('/v1/im/new-message', message => {
      handleMessage(message);
      store.commit('im/newMessage', { message });
    });

    // 消息记录
    this.socket.on('/v1/im/get-messages', ({ count, conversationId, messages }) => {
      store.commit('im/updateRefreshing', {
        conversationId: conversationId,
        refreshing: false
      });
      store.commit('im/updateLoading', {
        conversationId: conversationId,
        loading: false
      });
      for (const message of messages) {
        handleMessage(message);
      }
      store.commit('im/newMessages', { conversationId, messages });
      // 更新count
      setTimeout(() => {
        store.commit('im/updateMessageCount', { messageCount: count, conversationId });
      }, 50);
    });

    // 处理消息体
    const handleMessage = message => {
      // if (message.payload.body.msg) {
      //   message.payload.body.msg = emoji.transform(message.payload.body.msg);
      // }

      // 在入口处直接添加isMyself
      message.isMyself = store.getters.userId === message.fromId;
    };
  },
  connect() {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.getSocket();
    }
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('socket断开成功！');
    }
  },
  // 发送消息
  sendMessage(message) {
    this.socket.emit('/v1/im/new-message', message);
  },
  // 请求聊天记录
  getMessageList({ conversationId, pageSize, pageNumber }) {
    this.socket.emit('/v1/im/get-messages', {
      conversationId,
      pageSize,
      pageNumber
    });
  },
  // join
  join(conversationId) {
    this.socket.emit('/v1/im/join', {
      conversationId
    });
  }
};

const getConversationList = () => {
  http
    .get(urls.restful.conversations, {})
    .then(conversationList => {
      for (const iterator of conversationList) {
        iterator.isActive = false;
        iterator.info = {
          name: ''
        };
        iterator.messageList = [];
        iterator.pageNumber = 2;
        iterator.pageSize = 10;
        iterator.refreshing = false;
        iterator.loading = false;
        iterator.finished = false;
      }
      store.commit('im/updateConversationList', conversationList);
      setTimeout(() => {
        for (const conversation of conversationList) {
          IoService.getMessageList({
            conversationId: conversation.id,
            pageSize: conversation.pageSize,
            pageNumber: 1
          });
        }
      }, 20);
    })
    .catch(error => {
      console.log(error.errorMessage);
    });
};

export default IoService;

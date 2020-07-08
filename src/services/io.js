import http from '@/common/http';
import io from 'socket.io-client';
import store from '@/store';
import urls from '@/common/urls';
import config from '../../config/config';

// 处理消息体
const handleMessage = message => {
  // if (message.payload.body.msg) {
  //   message.payload.body.msg = emoji.transform(message.payload.body.msg);
  // }

  // 在入口处直接添加isMyself
  message.isMyself = store.getters.userId === message.fromId;
};

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
      // if (this.scroll) {
      //   console.log(this.scroll);
      //   this.scroll.finishPullDown();
      //   this.scroll.finishPullUp();
      //   this.scroll = null;
      // }

      for (const message of messages) {
        handleMessage(message);
      }
      store.commit('im/newMessages', { conversationId, messages });
      // 更新count
      setTimeout(() => {
        store.commit('im/updateMessageCount', { messageCount: count, conversationId });
      }, 50);
    });
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
  getMessageList({ conversationId, pageSize, pageNumber, init }) {
    this.socket.emit(
      '/v1/im/get-messages',
      {
        conversationId,
        pageSize,
        pageNumber
      },
      ({ count, conversationId, messages }) => {
        // console.log('getMessageList', data);
        for (const message of messages) {
          handleMessage(message);
        }
        if (!init && messages[0]) {
          messages[0].shouldScroll = true;
        }
        store.commit('im/newMessages', { conversationId, messages, messageCount: count });
        // 更新count
        // setTimeout(() => {
        //   store.commit('im/updateMessageCount', { messageCount: count, conversationId });
        // }, 50);
      }
    );
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
      }
      store.commit('im/updateConversationList', conversationList);
      setTimeout(() => {
        for (const conversation of conversationList) {
          IoService.getMessageList({
            conversationId: conversation.id,
            pageSize: conversation.pageSize,
            pageNumber: 1,
            init: true
          });
        }
      }, 20);
    })
    .catch(error => {
      console.log(error.errorMessage);
    });
};

export default IoService;

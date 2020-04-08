// import emoji from '@/utils/emoji';
import http from '@/common/http';
import io from 'socket.io-client';
import store from '@/store';
import urls from '@/common/urls';

const IoService = {
  socket: null,
  scroll: null,
  async getSocket() {
    // const data = await http.get(urls.customService.storeInfo);
    const userId = store.getters.userId;
    this.socket = io('http://127.0.0.1:7001', {
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
      // 更新count
      store.commit('im/updateMessageCount', { messageCount: count, conversationId });
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
        store.commit('im/newMessage', { message, isPush: false });
      }
    });

    // 处理消息体
    const handleMessage = message => {
      // if (message.payload.body.msg) {
      //   message.payload.body.msg = emoji.transform(message.payload.body.msg);
      // }

      // if (message.payload.body.type === 'video') {
      //   message.payload.body.poster = message.payload.body.url.replace(/\.\w+$/, '') + '.jpg';
      // }

      message.isMyself = store.getters.userId === message.fromId;
    };

    // 处理存储的消息
    // const handleSavedMessage = message => {
    //   message.from = {
    //     id: message.fromId
    //   };
    //   message.to = {
    //     id: message.toId
    //   };
    //   message.payload = { body: message.body };
    // };

    // 新消息
    // const newMessageSave = message => {
    //   store.commit('CustomService/newMessage', {
    //     message: {
    //       id: message.isMyself ? message.toId : message.fromId,
    //       fromName: message.from.name,
    //       head: message.isMyself ? userInfo.headerUrl || '' : message.from.head,
    //       timestamp: message.timestamp,
    //       body: message.payload.body,
    //       isMyself: message.isMyself,
    //       isRobot: message.isRobot
    //     }
    //   });
    // };
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
      // setTimeout(() => {
      //   for (const conversation of conversationList) {
      //     IoService.getMessageList({
      //       conversationId: conversation.id,
      //       pageSize: conversation.pageSize,
      //       pageNumber: 1
      //     });
      //   }
      // }, 20);
    })
    .catch(error => {
      this.$toast(error.errorMessage);
    });
};

export default IoService;

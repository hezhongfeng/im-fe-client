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
      getSessionList();
    });

    // 有新消息
    this.socket.on('/v1/im/new-message', message => {
      handleMessage(message);
      store.commit('im/newMessage', { message });
    });

    // 消息记录
    this.socket.on('/v1/im/get-messages', ({ messages }) => {
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
  getMessageList(params) {
    this.socket.emit('/v1/im/get-messages', params);
  },
  // join
  join(sessionId) {
    this.socket.emit('/v1/im/join', {
      sessionId
    });
  }
};

const getSessionList = () => {
  http
    .get(urls.restful.sessions, {})
    .then(data => {
      for (const iterator of data) {
        iterator.isActive = false;
        iterator.info = {
          name: ''
        };
        iterator.messageList = [];
      }
      store.commit('im/updateSessionList', data);
      setTimeout(() => {
        for (const message of data) {
          IoService.getMessageList({
            sessionId: message.id,
            pageSize: 1,
            pageNumber: 10
          });
        }
      }, 20);
    })
    .catch(error => {
      this.$toast(error.errorMessage);
    });
};

export default IoService;

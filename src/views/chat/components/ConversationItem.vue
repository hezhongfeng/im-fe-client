<template>
  <van-swipe-cell class="conversation-wrap">
    <div class="conversation-item" @click="onClick">
      <div class="avatar">
        <img :src="head" />
      </div>
      <div class="left">
        <div class="name-time">
          <div class="name">{{ conversation.info.name || conversation.info.nickname }}</div>
          <div class="time">{{ conversation.updatedAt }}</div>
        </div>
        <div class="last-message">{{ lastMessage }}</div>
      </div>
    </div>
    <template #right>
      <van-button :disabled="conversation.type === 'robot'" square type="danger" text="删除" @click="disabledConversation" />
    </template>
  </van-swipe-cell>
</template>

<script>
import IoService from '@/services/io.js';
import { mapMutations } from 'vuex';
import defaultHead from '@/assets/images/head.png';
import defaultGroup from '@/assets/images/group.png';

export default {
  name: 'ConversationItem',
  components: {},
  props: {
    conversation: Object
  },
  data() {
    return {
      defaultHead: defaultHead,
      defaultGroup: defaultGroup
    };
  },
  computed: {
    head() {
      if (this.conversation.info && this.conversation.info.photo) {
        return this.conversation.info.photo;
      }
      return this.conversation.type === 'chat' ? this.defaultHead : this.defaultGroup;
    },
    lastMessage() {
      let lastMessage = null;
      if (this.conversation.messageList.length > 0) {
        lastMessage = this.conversation.messageList[this.conversation.messageList.length - 1];
      }
      if (!lastMessage) {
        return '';
      }
      switch (lastMessage.body.type) {
        case 'text':
          return lastMessage.body.msg;
        case 'image':
          return '图片消息';
        case 'video':
          return '视频消息';
        case 'loc':
          return '定位消息';

        default:
          return '';
      }
    }
  },
  watch: {},
  created() {
    if (this.conversation.type === 'chat') {
      this.getUserInfo();
    }
    if (this.conversation.type === 'groupchat') {
      this.getGroupInfo();
    }
    IoService.join(this.conversation.id);
  },
  methods: {
    ...mapMutations('im', ['activateConversation', 'updateConversationInfo', 'removeConversation']),
    disabledConversation() {
      this.removeConversation({
        conversationId: this.conversation.id
      });
    },
    onClick() {
      this.activateConversation({
        conversationId: this.conversation.id
      });
      setTimeout(() => {
        this.$router.push('/chat');
      }, 60);
    },
    getUserInfo() {
      this.$http
        .get(`${this.$urls.restful.userInfo}/${this.conversation.target.id}`, {})
        .then(data => {
          this.updateConversationInfo({
            conversationId: this.conversation.id,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getGroupInfo() {
      this.$http
        .get(`${this.$urls.restful.groups}/${this.conversation.target.id}`, {})
        .then(data => {
          this.updateConversationInfo({
            conversationId: this.conversation.id,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.conversation-wrap {
  height: 62px;
  .conversation-item {
    background-color: $color-white;
    display: flex;
    align-items: center;
    min-height: 60px;
    .avatar {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      img {
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .left {
      padding: 10px;
      display: flex;
      flex-direction: column;
      width: calc(100% - 50px);
      position: relative;
      .name-time {
        display: flex;
        justify-content: space-between;
        .name {
          color: #2f2f2f;
          font-size: 16px;
        }
        .time {
          color: #d8d8d8;
          font-size: 14px;
        }
      }
      .last-message {
        color: #d8d8d8;
        font-size: 14px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0 solid #ebedf0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-bottom-width: 1px;
      }
    }
  }
  .van-button {
    height: 100%;
  }
}
</style>

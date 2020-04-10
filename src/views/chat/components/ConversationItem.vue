<template>
  <div class="conversation-item" @click="onClick">
    <div class="avator">
      <img :src="head" />
    </div>
    <div class="left">
      <div class="name-time">
        <div class="name">{{conversation.info.name||conversation.info.nickname}}</div>
        <div class="time">{{conversation.updatedAt}}</div>
      </div>
      <div class="last-message">{{lastMessage}}</div>
    </div>
  </div>
</template>

<script>
import IoService from '@/services/io.js';
import { mapMutations } from 'vuex';
import defaultUser from '@/assets/images/default.png';

export default {
  name: 'ConversationItem',
  components: {},
  props: {
    conversation: Object
  },
  data() {
    return {
      defaultUser: defaultUser
    };
  },
  computed: {
    head() {
      return this.conversation.info.photo || this.defaultUser;
    },
    lastMessage() {
      if (this.conversation.messageList.length > 1) {
        return this.conversation.messageList[this.conversation.messageList.length - 1].body.msg;
      }
      return '';
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
    ...mapMutations('im', ['activateConversation', 'updateConversationInfo']),
    onClick() {
      this.activateConversation({
        conversationId: this.conversation.id
      });
      this.$router.push('/chat');
    },
    getUserInfo() {
      this.$http
        .get(`${this.$urls.restful.userInfo}/${this.conversation.targetId}`, {})
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
        .get(`${this.$urls.restful.groups}/${this.conversation.targetId}`, {})
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
.conversation-item {
  display: flex;
  align-items: center;
  .avator {
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
    flex-grow: 5;
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
</style>

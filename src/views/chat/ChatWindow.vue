<template>
  <view-page class="cs-chatbox">
    <div class="cs-chat" ref="wrapper">
      <div>
        <message-item
          ref="messages"
          v-for="message of activeConversation.messageList"
          :key="message.id"
          :message="message"
          :scroll="scroll"
          :conversationId="activeConversation.id"
        ></message-item>
      </div>
    </div>
    <enter-area></enter-area>
  </view-page>
</template>

<script>
import MessageItem from './components/MessageItem';
import EnterArea from './components/EnterArea';
import { mapGetters, mapMutations } from 'vuex';
import IoService from '@/services/io.js';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import PullDown from '@better-scroll/pull-down';

BScroll.use(ObserveDOM);
BScroll.use(PullDown);

export default {
  name: 'Chat',
  components: {
    MessageItem,
    EnterArea
  },
  props: {},
  data() {
    return {
      topMessage: null,
      scroll: null
    };
  },
  computed: {
    ...mapGetters('im', ['activeConversation'])
  },
  mounted() {
    if (!(this.activeConversation.type === 'robot')) {
      this.activedConversation();
    }

    const scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      observeDOM: true,
      pullDownRefresh: {
        threshold: -30
      }
    });

    scroll.on('pullingDown', this.onLoad);
    this.scroll = scroll;
    setTimeout(() => {
      this.scroll.scrollTo(0, this.scroll.maxScrollY);
    }, 50);
  },
  destroyed() {
    this.scroll = null;
  },
  methods: {
    ...mapMutations('im', ['clearMessage', 'clearMessages', 'increaseConversationPageNumber']),
    onLoad() {
      if (this.activeConversation.messageList.length >= this.activeConversation.messageCount) {
        return;
      }
      this.increaseConversationPageNumber({
        conversationId: this.activeConversation.id
      });
      this.$nextTick(() => {
        IoService.getMessageList({
          conversationId: this.activeConversation.id,
          pageSize: this.activeConversation.pageSize,
          pageNumber: this.activeConversation.pageNumber
        });
      });
    },
    activedConversation() {
      this.$http.put('/api/v1/conversations/active', {
        id: this.activeConversation.id,
        active: true
      });
    }
  }
};
</script>

<style lang="scss">
.cs-chatbox {
  height: 100%;
  .cs-chat {
    overflow: hidden;
    height: calc(100% - 90px);
    .van-list {
      min-height: 50vh;
    }
  }
}
</style>

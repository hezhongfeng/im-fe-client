<template>
  <view-page class="cs-chatbox">
    <div class="cs-chat" ref="wrapper">
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <message-item v-for="(message,index) of activeConversation.messageList" :key="index" :message="message"></message-item>
        </van-list>
      </van-pull-refresh>-->
      <div class="conntennt">
        <message-item v-for="(message,index) of activeConversation.messageList" :key="index" :message="message"></message-item>
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
import MouseWheel from '@better-scroll/mouse-wheel';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

BScroll.use(ObserveDOM);
BScroll.use(MouseWheel);
BScroll.use(PullDown);
BScroll.use(Pullup);

export default {
  name: 'Chat',
  components: {
    MessageItem,
    EnterArea
  },
  props: {},
  data() {
    return {
      scroll: null
    };
  },
  computed: {
    ...mapGetters('im', ['activeConversation'])
  },
  mounted() {
    this.activedConversation();
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      observeDOM: true,
      pullUpLoad: {
        threshold: -90
      },
      pullDownRefresh: {
        threshold: -30,
        stop: 0
      },
      mouseWheel: {}
    });
    this.scroll.on('pullingUp', this.onRefresh);
    this.scroll.on('pullingDown', this.onLoad);
  },
  destroyed() {
    this.scroll = null;
  },
  methods: {
    ...mapMutations('im', ['clearMessage', 'clearMessages', 'increaseConversationPageNumber']),
    onLoad() {
      if (this.activeConversation.messageCount <= this.activeConversation.messageList.length) {
        this.scroll.finishPullUp();
        return;
      }
      this.increaseConversationPageNumber({
        conversationId: this.activeConversation.id
      });
      this.$nextTick(() => {
        IoService.getMessageList({
          conversationId: this.activeConversation.id,
          pageSize: this.activeConversation.pageSize,
          pageNumber: this.activeConversation.pageNumber,
          scroll: this.scroll
        });
      });
    },
    onRefresh() {
      console.log('onRefresh');
      this.clearMessages({
        conversationId: this.activeConversation.id
      });
      IoService.getMessageList({
        conversationId: this.activeConversation.id,
        pageSize: this.activeConversation.pageSize,
        pageNumber: this.activeConversation.pageNumber,
        scroll: this.scroll
      });
    },
    activedConversation() {
      this.$http.put('api/v1/conversations/active', {
        id: this.activeConversation.id
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

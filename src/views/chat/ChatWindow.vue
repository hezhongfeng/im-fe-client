<template>
  <div title="客服" class="cs-chatbox">
    <div class="cs-chat" :style="handleStyle">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <message-item v-for="(message,index) of activeConversation.messageList" :key="index" :message="message"></message-item>
        </van-list>
      </van-pull-refresh>
    </div>
    <enter-area @change-hight="changeHight"></enter-area>
  </div>
</template>

<script>
import MessageItem from './components/MessageItem';
import EnterArea from './components/EnterArea';
import { mapGetters, mapMutations } from 'vuex';
import IoService from '@/services/io.js';

export default {
  name: 'Chat',
  components: {
    MessageItem,
    EnterArea
  },
  props: {},
  data() {
    return {
      enterHeight: '90',
      refreshing: false,
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapGetters('im', ['activeConversation']),
    handleStyle() {
      return {
        height: 'calc(100% - ' + this.enterHeight + 'px)'
      };
    }
  },
  watch: {
    'activeConversation.refreshing': function(val) {
      if (!val) {
        this.refreshing = false;
      }
    },
    'activeConversation.loading': function(val) {
      if (!val) {
        this.loading = false;
      }
    },
    'activeConversation.finished': {
      handler: function(val) {
        if (val) {
          this.finished = true;
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('im', ['clearMessage', 'updateRefreshing', 'updateLoading', 'clearMessages']),
    onLoad() {
      // this.loading = false;
      // this.finished = true;
      // IoService.getMessageList({
      //   conversationId: this.activeConversation.id,
      //   pageSize: this.activeConversation.pageSize,
      //   pageNumber: this.activeConversation.pageNumber,
      //   instance: this
      // });
      this.updateLoading({
        conversationId: this.activeConversation.id,
        loading: true
      });
      IoService.getMessageList({
        conversationId: this.activeConversation.id,
        pageSize: this.activeConversation.pageSize,
        pageNumber: this.activeConversation.pageNumber
      });
    },
    onRefresh() {
      this.updateRefreshing({
        conversationId: this.activeConversation.id,
        refreshing: true
      });
      this.clearMessages({
        conversationId: this.activeConversation.id
      });
      IoService.getMessageList({
        conversationId: this.activeConversation.id,
        pageSize: this.activeConversation.pageSize,
        pageNumber: this.activeConversation.pageNumber
      });
    },
    changeHight(height) {
      this.scrollRefresh();
    }
  }
};
</script>

<style lang="scss">
.cs-chatbox {
  .cs-chat {
    overflow: auto;
  }
}
</style>

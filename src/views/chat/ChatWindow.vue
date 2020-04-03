<template>
  <div title="客服" class="cs-chatbox">
    <div class="cs-chat" :style="handleStyle">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <message-item v-for="(message,index) of activeSession.messageList" :key="index" :message="message"></message-item>
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
    ...mapGetters('im', ['activeSession']),
    handleStyle() {
      return {
        height: 'calc(100% - ' + this.enterHeight + 'px)'
      };
    }
  },
  watch: {
    'activeSession.refreshing': function(val) {
      if (!val) {
        this.refreshing = false;
      }
    },
    'activeSession.loading': function(val) {
      if (!val) {
        this.loading = false;
      }
    },
    'activeSession.finished': {
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
      //   sessionId: this.activeSession.id,
      //   pageSize: this.activeSession.pageSize,
      //   pageNumber: this.activeSession.pageNumber,
      //   instance: this
      // });
      this.updateLoading({
        sessionId: this.activeSession.id,
        loading: true
      });
      IoService.getMessageList({
        sessionId: this.activeSession.id,
        pageSize: this.activeSession.pageSize,
        pageNumber: this.activeSession.pageNumber
      });
    },
    onRefresh() {
      this.updateRefreshing({
        sessionId: this.activeSession.id,
        refreshing: true
      });
      this.clearMessages({
        sessionId: this.activeSession.id
      });
      IoService.getMessageList({
        sessionId: this.activeSession.id,
        pageSize: this.activeSession.pageSize,
        pageNumber: this.activeSession.pageNumber
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

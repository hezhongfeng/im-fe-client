<template>
  <div title="客服" class="cs-chatbox">
    <div class="cs-chat" :style="handleStyle">
      <message-item v-for="(message,index) of messageList" :key="index" :message="message"></message-item>
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
      pagination: {
        pageSize: 10,
        pageNumber: 1
      }
    };
  },
  computed: {
    ...mapGetters('im', ['messageList', 'activeSession']),
    handleStyle() {
      return {
        height: 'calc(100% - ' + this.enterHeight + 'px)'
      };
    },
    imgList() {
      const imgList = [];
      for (const element of this.messageList) {
        if (element.body.type === 'image') {
          imgList.push(this.host + element.body.url);
        }
      }
      return imgList;
    }
  },
  created() {
    this.getMessageList();
  },
  methods: {
    ...mapMutations('im', ['clearMessage']),
    changeHight(height) {
      this.scrollRefresh();
    },
    scrollRefresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    scrollToBottom() {
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY);
      }, 500);
    },
    onPullingDown() {
      this.getMessageList();
    },
    getMessageList() {
      IoService.getMessageList({
        sessionId: this.activeSession.id,
        pageSize: this.pagination.pageSize,
        pageNumber: this.pagination.pageNumber
      });
      this.pagination.pageNumber++;
    }
    // imgPreview(message) {
    //   const index = this.imgList.indexOf(this.host + message.body.url);
    //   this.$createImagePreview({
    //     imgs: this.imgList,
    //     initialIndex: index
    //   }).show();
    // },
    // locPreview(message) {
    //   this.$router.push({
    //     path: '/custom-service/message-loc',
    //     query: { addr: message.body.addr, lat: message.body.lat, lng: message.body.lng }
    //   });
    // }
  }
};
</script>

<style lang="scss">
.cs-chatbox {
  .hy-header {
    position: relative;
    .hy-line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>

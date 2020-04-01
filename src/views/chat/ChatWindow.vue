<template>
  <div title="客服" class="cs-chatbox">
    <div class="cs-chat" :style="handleStyle">
      <message-item v-for="(message,index) of messageList" :key="index" :message="message"></message-item>
    </div>
    <enter-area @change-hight="changeHight"></enter-area>
  </div>
</template>

<script>
// import { HyPage } from '@/components/hy-page';
// import IoService from '@/services/io.js';
import MessageItem from './components/MessageItem';
import EnterArea from './components/EnterArea';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Chat',
  components: {
    MessageItem,
    EnterArea
  },
  props: {},
  data() {
    return {
      messageTip: {},
      options: {
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/ },
        pullDownRefresh: {
          txt: '刷新成功'
        }
      },
      enterHeight: '90',
      messagePagination: {
        pageSize: '10',
        pageNumber: '1'
      }
    };
  },
  computed: {
    ...mapGetters('im', ['messageList']),
    handleStyle() {
      return {
        height: 'calc(100% - ' + this.enterHeight + 'px)'
      };
    },
    imgList() {
      const imgList = [];
      for (const element of this.messageList) {
        if (element.body.type === 'img') {
          imgList.push(this.host + element.body.url);
        }
      }
      return imgList;
    }
  },
  watch: {
    // messageList(newVal) {
    //   if (newVal[0] === this.messageTip) {
    //     this.scrollToBottom();
    //   }
    //   this.messageTip = newVal[0];
    // }
  },
  created() {
    // this.clearMessage();
  },
  mounted() {
    // customService.socket = null;
    // customService.connect(this.$refs.scroll);
  },
  beforeDestroy() {
    // customService.disconnect();
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
      this.messagePagination.pageNumber++;
      // customService.getMessageList({
      //   shopId: this.current.shopId,
      //   clientId: this.current.userId,
      //   pageNumber: this.messagePagination.pageNumber,
      //   pageSize: this.messagePagination.pageSize
      // });
    },
    imgPreview(message) {
      const index = this.imgList.indexOf(this.host + message.body.url);
      this.$createImagePreview({
        imgs: this.imgList,
        initialIndex: index
      }).show();
    },
    locPreview(message) {
      this.$router.push({
        path: '/custom-service/message-loc',
        query: { addr: message.body.addr, lat: message.body.lat, lng: message.body.lng }
      });
    }
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

<template>
  <div class="chat">
    <van-nav-bar title="chat">
      <template #right>
        <van-icon name="plus" size="18" @click="onAdd" />
      </template>
    </van-nav-bar>
    <conversation-list></conversation-list>
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="chat-menu">
        <div class="menu-item" @click="onAddFriend">
          <van-icon name="add-o" size="18" />添加朋友
        </div>
        <div class="menu-item" @click="onAddFriend">
          <van-icon name="add-o" size="18" />添加朋友
        </div>
        <div class="menu-item" @click="onAddFriend">
          <van-icon name="add-o" size="18" />添加朋友
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import IoService from '@/services/io.js';
import ConversationList from './components/ConversationList';

export default {
  name: 'Chat',
  components: {
    ConversationList
  },
  props: {},
  data() {
    return {
      showMenu: false,
      showOverlay: false
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$checkLogin()) {
      IoService.connect();
    }
  },
  beforeDestroy() {
    IoService.disconnect();
  },
  methods: {
    onAdd() {
      this.showOverlay = true;
    },
    onAddFriend() {
      this.showMenu = false;
      this.$router.push('/add-friend');
    }
  }
};
</script>

<style lang="scss">
.chat {
  width: 100vw;
  position: relative;
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.2);
    .chat-menu {
      background-color: #fff;
      padding: 20px;
      position: absolute;
      right: 0;
      top: 46px;
      .menu-item {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        .van-icon {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

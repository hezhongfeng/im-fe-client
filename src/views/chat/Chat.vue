<template>
  <div class="chat">
    <van-nav-bar title="chat">
      <template #right>
        <van-icon name="add-o" size="18" @click="onAdd" />
      </template>
    </van-nav-bar>
    <div class="chat-menu" v-show="showMenu">
      <div class="menu-item" @click="onAddFriend">
        <van-icon name="add-o" size="18" />添加朋友
      </div>
    </div>
    <conversation-list></conversation-list>
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
      showMenu: false
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
      this.showMenu = !this.showMenu;
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
  .chat-menu {
    z-index: 2;
    background-color: #666;
    padding: 20px;
    transition: all 0.8s;
    position: absolute;
    right: 20px;
    top: 50px;
  }
}
</style>

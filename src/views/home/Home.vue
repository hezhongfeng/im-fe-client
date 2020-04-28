<template>
  <div class="home">
    <tab-switch :index="active">
      <tab-item>
        <chat />
      </tab-item>
      <tab-item>
        <mail-list></mail-list>
      </tab-item>
      <tab-item>
        <div style="width: 100vw;"></div>
      </tab-item>
      <tab-item>
        <mine />
      </tab-item>
    </tab-switch>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="chat-o">chat</van-tabbar-item>
      <van-tabbar-item icon="friends-o">通讯录</van-tabbar-item>
      <van-tabbar-item icon="friends-o">ToDo</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import TabSwitch from './components/TabSwitch';
import TabItem from './components/TabItem';
import Chat from '@/views/chat/Chat';
import MailList from '@/views/mail-list/MailList';
import Mine from '@/views/mine/Mine';

export default {
  name: 'Home',
  components: {
    TabSwitch,
    TabItem,
    Chat,
    MailList,
    Mine
  },
  props: {},
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.home {
}
</style>

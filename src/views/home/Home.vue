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
        <div style="width: 100%; height: 100%;overflow-y: auto;">Todo...</div>
      </tab-item>
      <tab-item>
        <mine />
      </tab-item>
    </tab-switch>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="chat-o">chat</van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <i class="iconfont icontongxunlu" style="font-size: 20px;"></i>
        </template>
        <template #default>通讯录</template>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <i class="iconfont iconfaxian" style="font-size: 20px;"></i>
        </template>
        <template #default>Todo</template>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <template #icon>
          <i class="iconfont iconwode" style="font-size: 20px;"></i>
        </template>
        <template #default>我的</template>
      </van-tabbar-item>
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
  .van-tabbar--fixed {
    position: absolute;
  }
}
</style>

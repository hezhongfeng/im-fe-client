<template>
  <div class="home">
    <tab-switch :index="active">
      <tab-item>
        <chat />
      </tab-item>
      <tab-item>
        <mine />
      </tab-item>
    </tab-switch>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import TabSwitch from './components/TabSwitch';
import TabItem from './components/TabItem';
import Chat from '@/views/chat/Chat';
import Mine from '@/views/mine/Mine';

export default {
  name: 'Home',
  components: {
    TabSwitch,
    TabItem,
    Chat,
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

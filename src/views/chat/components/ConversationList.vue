<template>
  <div class="conversation-list" ref="wrapper">
    <div class="scroll-wrap">
      <conversation-item :conversation="conversation" v-for="conversation of conversationList" :key="conversation.id"></conversation-item>
    </div>
  </div>
</template>

<script>
import ConversationItem from './ConversationItem';
import { mapGetters } from 'vuex';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import MouseWheel from '@better-scroll/mouse-wheel';

BScroll.use(ObserveDOM);
BScroll.use(MouseWheel);

export default {
  name: 'ConversationList',
  components: {
    ConversationItem
  },
  props: {},
  data() {
    return {
      bs: null
    };
  },
  computed: {
    ...mapGetters('im', ['conversationList'])
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      observeDOM: true,
      mouseWheel: {}
    });
  },
  methods: {}
};
</script>

<style lang="scss">
.conversation-list {
  height: calc(100% - 46px);
  overflow: hidden;
}
</style>

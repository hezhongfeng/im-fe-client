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
  watch: {
    conversationList: {
      immediate: true,
      handler() {
        console.log('conversationList');
        if (this.bs) {
          setTimeout(() => {
            this.bs.refresh();
          }, 20);
        }
      }
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true
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

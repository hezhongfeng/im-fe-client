<template>
  <div class="chat">
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
    return {};
  },
  computed: {},
  watch: {},
  created() {
    IoService.connect();
  },
  beforeDestroy() {
    IoService.disconnect();
  },
  methods: {}
};
</script>

<style lang="scss">
.chat {
  width: 100vw;
}
</style>

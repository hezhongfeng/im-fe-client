<template>
  <div class="conversation-list">
    <conversation-item :conversation="conversation" v-for="conversation of conversationList" :key="conversation.id"></conversation-item>
  </div>
</template>

<script>
import ConversationItem from './ConversationItem';
import { mapGetters } from 'vuex';

export default {
  name: 'ConversationList',
  components: {
    ConversationItem
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('im', ['conversationList'])
  },
  methods: {}
};
</script>

<style lang="scss">
.conversation-list {
}
</style>

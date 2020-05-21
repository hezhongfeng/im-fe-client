<template>
  <view-page class="group-list">
    <group-conversation-item
      v-for="conversation of groupConversationList"
      :conversation="conversation"
      :key="conversation.id"
      @click.native="onCLick(conversation)"
    ></group-conversation-item>
  </view-page>
</template>

<script>
import GroupConversationItem from './compenents/GroupConversationItem';
import { mapMutations } from 'vuex';

export default {
  name: 'group-list',
  components: {
    GroupConversationItem
  },
  props: {},
  data() {
    return {
      groupConversationList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getConversationGroupList();
  },
  methods: {
    ...mapMutations('im', ['activateConversation']),
    onCLick(conversation) {
      this.activateConversation({
        conversationId: conversation.target.id
      });
      this.$router.push('/chat');
    },
    getConversationGroupList() {
      this.$http
        .get(this.$urls.restful.groups)
        .then(data => {
          this.groupConversationList = data;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.group-list {
}
</style>

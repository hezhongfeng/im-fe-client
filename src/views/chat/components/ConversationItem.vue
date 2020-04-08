<template>
  <div class="conversation-item" @click="onClick">{{conversation.info.name||conversation.info.nickname}}</div>
</template>

<script>
import IoService from '@/services/io.js';
import { mapMutations } from 'vuex';

export default {
  name: 'ConversationItem',
  components: {},
  props: {
    conversation: Object
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    if (this.conversation.type === 'chat') {
      this.getUserInfo();
    }
    if (this.conversation.type === 'groupchat') {
      this.getGroupInfo();
    }
    IoService.join(this.conversation.id);
  },
  methods: {
    ...mapMutations('im', ['activateConversation', 'updateConversationInfo']),
    onClick() {
      this.activateConversation({
        conversationId: this.conversation.id
      });
      this.$router.push('/chat');
    },
    getUserInfo() {
      this.$http
        .get(`${this.$urls.restful.userInfo}/${this.conversation.targetId}`, {})
        .then(data => {
          this.updateConversationInfo({
            conversationId: this.conversation.id,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getGroupInfo() {
      this.$http
        .get(`${this.$urls.restful.groups}/${this.conversation.targetId}`, {})
        .then(data => {
          this.updateConversationInfo({
            conversationId: this.conversation.id,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.conversation-item {
}
</style>

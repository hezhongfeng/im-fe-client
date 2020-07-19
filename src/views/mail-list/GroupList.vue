<template>
  <view-page class="group-list">
    <group-item v-for="group of groupList" :group="group" :key="group.id" @click.native="onCLick(group)"></group-item>
  </view-page>
</template>

<script>
import GroupItem from './compenents/GroupItem';
import { mapMutations } from 'vuex';
import { dateFormat } from '@/utils/format.js';

export default {
  name: 'group-list',
  components: {
    GroupItem
  },
  props: {},
  data() {
    return {
      groupList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getGroupList();
  },
  methods: {
    ...mapMutations('im', ['addConversation', 'activateConversation']),
    onCLick(group) {
      this.addConversation({
        type: 'groupchat',
        id: group.conversationId,
        isActive: false,
        info: {
          name: ''
        },
        target: group,
        updatedAt: dateFormat('YYYY-mm-dd HH:MM:SS', new Date()),
        messageCount: 0,
        messageList: [],
        pageNumber: 2,
        pageSize: 10,
        refreshing: false,
        loading: false,
        finished: false
      });
      this.activateConversation({
        conversationId: group.conversationId
      });
      this.$router.push('/chat');
    },
    getGroupList() {
      this.$http
        .get(this.$urls.restful.groups)
        .then(data => {
          this.groupList = data;
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

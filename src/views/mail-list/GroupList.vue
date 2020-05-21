<template>
  <view-page class="group-list">
    <group-item v-for="group of groupList" :group="group" :key="group.id" @click.native="onCLick(group)"></group-item>
  </view-page>
</template>

<script>
import GroupItem from './compenents/GroupItem';
import { mapMutations } from 'vuex';

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
    ...mapMutations('im', ['activateConversation']),
    onCLick(group) {
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

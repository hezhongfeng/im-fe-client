<template>
  <div class="group-list">
    <group-item v-for="group of groupList" :group="group" :key="group.id"></group-item>
  </div>
</template>

<script>
import GroupItem from './compenents/GroupItem';

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
  created() {},
  methods: {
    getGroupList() {
      this.$http
        .get(this.$urls.mailList.groupList, {})
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

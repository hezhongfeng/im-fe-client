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
  methods: {}
};
</script>

<style lang="scss">
.group-list {
}
</style>

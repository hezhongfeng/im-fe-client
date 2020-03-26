<template>
  <div class="session-list">
    <session-item v-for="session of sessionList" :key="session.id"></session-item>
  </div>
</template>

<script>
import SessionItem from './SessionItem';

export default {
  name: 'SessionList',
  components: {
    SessionItem
  },
  props: {},
  data() {
    return {
      sessionList: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.session-list {
}
</style>

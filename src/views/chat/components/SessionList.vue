<template>
  <div class="session-list">
    <session-item :session="session" v-for="session of sessionList" :key="session.id"></session-item>
  </div>
</template>

<script>
import SessionItem from './SessionItem';
import { mapGetters } from 'vuex';

export default {
  name: 'SessionList',
  components: {
    SessionItem
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('im', ['sessionList'])
  },
  methods: {}
};
</script>

<style lang="scss">
.session-list {
}
</style>

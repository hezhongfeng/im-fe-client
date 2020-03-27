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
  created() {
    this.getSessionList();
  },
  methods: {
    getSessionList() {
      this.$http
        .get('/api/v1/admin/users/2/sessions', {})
        .then(data => {
          this.sessionList = data;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.session-list {
}
</style>

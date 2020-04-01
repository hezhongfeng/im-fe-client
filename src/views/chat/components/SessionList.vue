<template>
  <div class="session-list">
    <session-item :session="session" v-for="session of sessionList" :key="session.id"></session-item>
  </div>
</template>

<script>
import SessionItem from './SessionItem';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'SessionList',
  components: {
    SessionItem
  },
  props: {},
  data() {
    return {
      // sessionList: []
    };
  },
  computed: {
    ...mapGetters('im', ['sessionList'])
  },
  watch: {},
  created() {
    this.getSessionList();
  },
  methods: {
    ...mapMutations('im', ['updateSessionList']),
    getSessionList() {
      this.$http
        .get(this.$urls.restful.sessions, {})
        .then(data => {
          for (const iterator of data) {
            iterator.isActive = false;
            iterator.info = {
              name: ''
            };
            iterator.messageList = [];
          }
          this.updateSessionList(data);
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

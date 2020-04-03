<template>
  <div class="session-item" @click="onClick">{{session.info.name||session.info.nickname}}</div>
</template>

<script>
import IoService from '@/services/io.js';
import { mapMutations } from 'vuex';

export default {
  name: 'SessionItem',
  components: {},
  props: {
    session: Object
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    if (this.session.type === 'chat') {
      this.getUserInfo();
    }
    if (this.session.type === 'groupchat') {
      this.getGroupInfo();
    }
    IoService.join(this.session.id);
  },
  methods: {
    ...mapMutations('im', ['activateSession', 'updateSessionInfo']),
    onClick() {
      this.activateSession({
        sessionId: this.session.id
      });
      this.$router.push('/chat');
    },
    getUserInfo() {
      this.$http
        .get(`${this.$urls.restful.userInfo}/${this.session.targetId}`, {})
        .then(data => {
          this.updateSessionInfo({
            sessionId: this.session.id,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getGroupInfo() {
      this.$http
        .get(`${this.$urls.restful.groups}/${this.session.targetId}`, {})
        .then(data => {
          this.updateSessionInfo({
            sessionId: this.session.id,
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
.session-item {
}
</style>

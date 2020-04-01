<template>
  <div class="session-item" @click="onClick">{{session.info.name}}</div>
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
    if (this.session.type === '1') {
      this.getGroupInfo();
      this.joinRoom();
    }
  },
  methods: {
    ...mapMutations('im', ['activateSession', 'updateSessionInfo']),
    onClick() {
      this.activateSession({
        type: this.session.type,
        targetId: this.session.targetId,
        isActive: true
      });
      this.$router.push('/chat');
    },
    getGroupInfo() {
      this.$http
        .get(`${this.$urls.restful.groups}/${this.session.targetId}`, {})
        .then(data => {
          this.info = data;
          this.updateSessionInfo({
            type: this.session.type,
            targetId: this.session.targetId,
            info: data
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    joinRoom() {
      IoService.joinRoom(this.session.targetId);
    }
  }
};
</script>

<style lang="scss">
.session-item {
}
</style>

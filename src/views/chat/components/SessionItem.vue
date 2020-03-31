<template>
  <div class="session-item">{{info.name}}</div>
</template>

<script>
import IoService from '@/services/io.js';

export default {
  name: 'SessionItem',
  components: {},
  props: {
    session: Object
  },
  data() {
    return {
      info: {}
    };
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
    getGroupInfo() {
      this.$http
        .get(`${this.$urls.restful.groups}/${this.session.targetId}`, {})
        .then(data => {
          this.info = data;
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

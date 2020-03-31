<template>
  <div class="session-item">{{info.name}}</div>
</template>

<script>
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
    }
  }
};
</script>

<style lang="scss">
.session-item {
}
</style>

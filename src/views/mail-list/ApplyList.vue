<template>
  <div class="apply-list"></div>
</template>

<script>
export default {
  name: 'ApplyList',
  components: {},
  props: {},
  data() {
    return {
      applyList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getApplies();
  },
  methods: {
    getApplies() {
      this.$http
        .get(this.$urls.add.applies)
        .then(data => {
          this.applyList = data;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.apply-list {
}
</style>

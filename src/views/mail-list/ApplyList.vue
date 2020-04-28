<template>
  <view-page class="apply-list"></view-page>
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

<template>
  <view-page class="apply-list">
    <apply-item :apply="apply" v-for="apply of applyList" :key="apply.id"></apply-item>
  </view-page>
</template>

<script>
import ApplyItem from './compenents/ApplyItem';

export default {
  name: 'ApplyList',
  components: {
    ApplyItem
  },
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
          this.applyList = data.rows;
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

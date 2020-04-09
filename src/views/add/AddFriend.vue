<template>
  <div class="add-friend">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <form action="/">
      <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'add-friend',
  components: {},
  props: {},
  data() {
    return {
      searchValue: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch() {
      console.log('onSearch');
      this.$http
        .post(this.$urls.add.search, {
          searchValue: this.searchValue
        })
        .then(data => {})
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    onCancel() {
      console.log('onCancel');
    },
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.add-friend {
}
</style>

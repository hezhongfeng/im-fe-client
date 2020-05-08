<template>
  <view-page class="add-friend" title="添加">
    <form action="/">
      <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="f-list">
      <friend v-for="user of users" :key="user.id" :friend="user" type="user"></friend>
    </div>
  </view-page>
</template>

<script>
import friend from './compenents/Friend';

export default {
  name: 'add-friend',
  components: {
    friend
  },
  props: {},
  data() {
    return {
      searchValue: '',
      users: [],
      groups: []
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
        .then(data => {
          this.users = data.users;
          this.groups = data.groups;
        })
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

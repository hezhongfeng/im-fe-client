<template>
  <view-page class="friend-detail">
    <div class="info">
      <div class="avatar"></div>
      <div class="name"></div>
    </div>
    <div class="signature"></div>
    <van-button type="primary" block @click="addToMailList">添加到通讯录</van-button>
  </view-page>
</template>

<script>
export default {
  name: 'FriendDetail',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    addToMailList() {}
  }
};
</script>

<style lang="scss">
.friend-detail {
}
</style>

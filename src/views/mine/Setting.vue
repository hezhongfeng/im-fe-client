<template>
  <view-page class="setting">
    <van-button type="default" block @click="onLogout">退出</van-button>
    <van-action-sheet v-model="showLogout" :actions="actions" description="是否确认" cancel-text="取消" @select="onSelect" @cancel="onCancel" />
  </view-page>
</template>

<script>
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      showLogout: false,
      actions: [{ name: '退出登录' }]
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onCancel() {
      this.showLogout = false;
    },
    onSelect() {
      this.showLogout = false;
      this.$http
        .post(this.$urls.login.logout, {})
        .then(data => {
          this.$toast.success('退出登录成功');
          this.updateUserId({
            userId: ''
          });
          this.updateUserInfo({
            userInfo: {}
          });
          this.$nextTick(() => {
            this.$router.replace('/');
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    onLogout() {
      this.showLogout = true;
      // this.$dialog
      //   .confirm({
      //     title: '确认',
      //     message: '您确定要退出？'
      //   })
      //   .then(() => {
      //     // on confirm
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    }
  }
};
</script>

<style lang="scss">
.setting {
  .van-button {
    margin-top: 10px;
  }
}
</style>

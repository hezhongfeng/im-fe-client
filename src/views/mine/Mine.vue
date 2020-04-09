<template>
  <div class="mine">
    我的
    <van-button @click="onLogout" type="warning">退出</van-button>
    <van-action-sheet v-model="showLogout" :actions="actions" description="是否确认" cancel-text="取消" @select="onSelect" @cancel="onCancel" />
  </div>
</template>

<script>
export default {
  name: 'mine',
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
.mine {
  width: 100vw;
  height: calc(100vh - 60px);
  .van-overlay,
  .van-popup--bottom {
    left: 300vw;
  }
}
</style>

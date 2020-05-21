<template>
  <view-page class="setting">
    <van-button type="default" block @click="onLogout">退出登录</van-button>
    <van-action-sheet v-model="showLogout" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel" />
  </view-page>
</template>

<script>
import { mapMutations } from 'vuex';
import IoService from '@/services/io.js';

export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      showLogout: false,
      actions: [{ name: '确认退出', color: 'red' }]
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapMutations(['updateUserId', 'updateUserInfo']),
    onCancel() {
      this.showLogout = false;
    },
    onSelect() {
      this.showLogout = false;
      this.$http
        .post(this.$urls.login.logout, {})
        .then(data => {
          this.$toast.success('退出登录成功');
          setTimeout(() => {
            this.updateUserId({
              userId: ''
            });
            this.updateUserInfo({
              userInfo: {}
            });
            IoService.disconnect();
            this.$nextTick(() => {
              this.$router.replace('/login');
            });
          }, 900);
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    onLogout() {
      this.showLogout = true;
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

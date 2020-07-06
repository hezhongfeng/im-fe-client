<template>
  <van-form @submit="onSubmit" class="sign-up">
    <van-field v-model="username" label="用户名" placeholder="请填写用户名" :rules="usernameRules" />
    <van-field v-model="password" type="password" label="密码" placeholder="请填写密码" :rules="passwordRules" />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SignUp',
  components: {},
  props: {},
  data() {
    return {
      username: '',
      password: '',
      usernameRules: [
        { required: true, message: '请填写用户名' },
        { pattern: /\w{4,10}/, message: '用户名长度(4-10)位' }
      ],
      passwordRules: [
        { required: true, message: '请填写密码' },
        { pattern: /\S{6,20}/, message: '密码长度(6-20)位' }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    ...mapMutations(['updateUserId', 'updateUserInfo']),
    onSubmit() {
      this.$http
        .post(this.$urls.login.signup, {
          username: this.username,
          password: this.password
        })
        .then(data => {
          this.$toast.success('注册成功');
          this.$router.back();
          this.updateUserId({
            userId: data.id
          });
          this.updateUserInfo({
            userInfo: data.userInfo
          });
          setTimeout(() => {
            this.$router.replace('/');
          }, 10);
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.sign-up {
}
</style>

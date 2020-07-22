<template>
  <van-form @submit="onSubmit" class="login">
    <van-field v-model="username" label="用户名" placeholder="可用用户名：user" :rules="usernameRules" />
    <van-field v-model="password" type="password" label="密码" placeholder="密码：123456" v-on:keyup.enter="onSubmit" :rules="passwordRules" />
    <div class="action">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
    <div class="bottom-action">
      <a href="/api/v1/passport/github" class="github">
        <svg class="icon" aria-hidden="true" @click="choose('[中毒]')">
          <use xlink:href="#icongithub" />
        </svg>
        一键登录
      </a>
      <div class="sign-up" @click="onSignup">注册</div>
    </div>
  </van-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
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
        .post(this.$urls.login.login, {
          username: this.username,
          password: this.password
        })
        .then(data => {
          this.$toast.success('登录成功');
          this.updateUserId({
            userId: data.id
          });
          this.updateUserInfo({
            userInfo: data.userInfo
          });
          this.$nextTick(() => {
            this.$router.replace('/');
          });
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    onSignup() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style lang="scss">
.login {
  .action {
    margin: 15px 10px;
  }
  .bottom-action {
    display: flex;
    justify-content: space-between;
    .github {
      margin-left: 10px;
      color: #222;
    }
    .sign-up {
      margin-right: 10px;
    }
  }
}
</style>

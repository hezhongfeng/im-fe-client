<template>
  <van-form @submit="onSubmit" class="sign-up">
    <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="usernameRules" />
    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="passwordRules" />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>

<script>
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
    onSubmit(values) {
      this.$http
        .post('/api/v1/signup', {
          username: this.username,
          password: this.password
        })
        .then();
    }
  }
};
</script>

<style lang="scss">
.sign-up {
}
</style>

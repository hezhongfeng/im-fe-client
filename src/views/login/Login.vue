<template>
  <van-form @submit="onSubmit" class="login">
    <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      this.$http
        .post('/api/v1/login', {
          username: 'username',
          password: 'password'
        })
        .then();
    }
  }
};
</script>

<style lang="scss">
.login {
}
</style>

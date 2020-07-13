<template>
  <div class="mine">
    <div class="user-info" @click="onEditUserInfo">
      <div class="avatar">
        <img :src="avatar" />
      </div>
      <div class="info">
        <div class="nickname">昵称：{{userInfo.nickname}}</div>
        <div class="account">签名：{{userInfo.sign}}</div>
      </div>
    </div>
    <van-cell icon="setting-o" title="设置" is-link to="/mine/setting" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'mine',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userInfo']),
    avatar() {
      return this.userInfo.photo || '/public/images/head.png';
    }
  },
  watch: {},
  created() {},
  methods: {
    onEditUserInfo() {
      this.$router.push('/mine/userinfo');
    }
  }
};
</script>

<style lang="scss">
.mine {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .user-info {
    display: flex;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

<template>
  <div class="mine">
    <div class="user-info">
      <div class="avator">
        <img :src="avator" />
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
    avator() {
      return this.userInfo.photo || '/public/images/head.png';
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.mine {
  width: 100vw;
  height: calc(100vh - 60px);
  .user-info {
    display: flex;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    .avator {
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

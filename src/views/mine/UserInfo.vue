<template>
  <view-page class="user-info">
    <van-cell title="头像" is-link class="avatar-wrap" to="/mine/edit-avatar">
      <template #default>
        <div class="avatar">
          <img :src="avatar" />
        </div>
      </template>
    </van-cell>
    <van-cell title="昵称" is-link :value="userInfo.nickname" to="/mine/edit-nickname" />
    <van-cell title="签名" is-link :value="userInfo.sign" to="/mine/edit-sign" />
  </view-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserInfo',
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
  methods: {}
};
</script>

<style lang="scss">
.user-info {
  .avatar-wrap {
    line-height: 44px;
    .van-cell__left-icon,
    .van-cell__right-icon {
      height: 44px;
      line-height: 44px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

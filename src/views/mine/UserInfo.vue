<template>
  <div class="user-info">
    <van-cell title="头像" is-link class="avator-wrap" to="/mine/edit-avator">
      <template #default>
        <div class="avator">
          <img :src="avator" />
        </div>
      </template>
    </van-cell>
    <van-cell title="昵称" is-link :value="userInfo.nickname" />
    <van-cell title="签名" is-link :value="userInfo.sign" to="/mine/edit-sign" />
  </div>
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
.user-info {
  .avator-wrap {
    line-height: 44px;
    .van-cell__left-icon,
    .van-cell__right-icon {
      height: 44px;
      line-height: 44px;
    }
    .avator {
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

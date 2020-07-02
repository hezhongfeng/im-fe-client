<template>
  <view-page class="edit-nickname" title="编辑昵称">
    <van-form @submit="onSubmit">
      <van-field v-model="nickname" label="昵称" :rules="[{ required: true, message: '请填写昵称' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </view-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { getUserInfo, updateUserInfo } from '@/services/edit.js';

export default {
  name: 'edit-nickname',
  components: {},
  props: {},
  data() {
    return {
      nickname: ''
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {
    this.nickname = this.userInfo.nickname;
  },
  methods: {
    onSubmit() {
      if (!this.nickname) {
        return;
      }
      updateUserInfo({ nickname: this.nickname })
        .then(() => {
          this.$toast('操作完成');
          getUserInfo();
          this.$router.back();
        })
        .catch();
    }
  }
};
</script>

<style lang="scss">
.edit-nickname {
  .van-field__label {
    width: 50px;
  }
}
</style>

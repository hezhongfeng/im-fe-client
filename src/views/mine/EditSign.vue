<template>
  <view-page class="edit-sign" title="编辑签名">
    <van-form @submit="onSubmit">
      <van-field v-model="sign" label="签名" :rules="[{ required: true, message: '请填写签名' }]" />
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
  name: 'edit-sign',
  components: {},
  props: {},
  data() {
    return {
      sign: ''
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {
    this.sign = this.userInfo.sign;
  },
  methods: {
    onSubmit() {
      if (!this.sign) {
        return;
      }
      updateUserInfo({ sign: this.sign })
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
.edit-sign {
  .van-field__label {
    width: 50px;
  }
}
</style>

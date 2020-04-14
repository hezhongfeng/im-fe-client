<template>
  <div class="edit-sign">
    <van-form @submit="onSubmit">
      <van-field v-model="nickname" label="签名" :rules="[{ required: true, message: '请填写签名' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'edit-sign',
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
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.edit-sign {
  .van-field__label {
    width: 50px;
  }
}
</style>

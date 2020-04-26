<template>
  <div class="edit-avator">
    <vue-cropper ref="cropper" autoCrop="true" :img="userInfo.photo"></vue-cropper>
    <div class="bottom">
      <van-button type="primary" block>选择图片</van-button>
      <van-button type="primary" block>保存</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueCropper } from 'vue-cropper';
export default {
  name: 'EditAvator',
  components: {
    VueCropper
  },
  props: {},
  data() {
    return {};
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
.edit-avator {
  position: relative;
  .vue-cropper {
    width: 100vw;
    height: 100vw;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    .van-button {
      margin-top: 10px;
    }
  }
}
</style>

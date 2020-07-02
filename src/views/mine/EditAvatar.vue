<template>
  <view-page class="edit-avatar">
    <vue-cropper ref="cropper" outputType="jpg" :autoCrop="autoCrop" :img="userInfo.photo"></vue-cropper>
    <div class="bottom">
      <van-button type="primary" block>选择图片</van-button>
      <van-button type="primary" block @click="save">保存</van-button>
    </div>
  </view-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueCropper } from 'vue-cropper';
import { getUserInfo, updateUserInfo } from '@/services/edit.js';

export default {
  name: 'EditAvatar',
  components: {
    VueCropper
  },
  props: {},
  data() {
    return {
      autoCrop: true
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {},
  methods: {
    save() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(data => {
        const file = new window.File([data], 'demo.jpg', { type: 'image/jpg' });
        const formData = new FormData();
        formData.append('demo.jpg', file);
        this.$http
          .post('/api/v1/upload', formData)
          .then(urls => {
            for (const terator of urls) {
              updateUserInfo({ photo: terator.url })
                .then(() => {
                  this.$toast('操作完成');
                  getUserInfo();
                  this.$router.back();
                })
                .catch();
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }
};
</script>

<style lang="scss">
.edit-avatar {
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

<template>
  <view-page class="edit-avatar">
    <vue-cropper ref="cropper" outputType="jpg" :autoCrop="autoCrop" :img="img"></vue-cropper>
    <div class="bottom">
      <van-button type="primary" block @click="chooseImage">选择图片</van-button>
      <van-button type="primary" block @click="save">保存</van-button>
    </div>

    <input type="file" id="uploads" style="display:none;" accept="image/*" @change="imgChange" ref="inputImg" />
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
      autoCrop: true,
      img: null
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {
    this.img = this.userInfo.photo;
  },
  methods: {
    chooseImage() {
      this.$refs.inputImg.click();
    },
    imgChange(e) {
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.img = data;
        this.$refs.inputImg.value = '';
      };
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imageSuccess() {},
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
    width: 100%;
    height: 100%;
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

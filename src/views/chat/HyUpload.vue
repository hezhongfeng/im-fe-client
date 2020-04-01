<template>
  <div class="hy-upload">
    <input ref="input" type="file" @change="changeHandler" :multiple="multiple" :accept="accept">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import store from '@/store';
import throttle from 'lodash.throttle';

export default {
  name: 'HyUpload',
  components: {},
  props: {
    fileList: Array,
    limit: Number,
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    action: {
      type: Object,
      default() {
        return {
          fileName: 'file',
          data: {
            type: '2'
          },
          target: this.host || '' + '/rest/file/uploads.jhtml'
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['host', 'userInfo'])
  },
  watch: {},
  created() {},
  methods: {
    click() {
      this.$refs.input.click();
    },
    changeHandler(e) {
      const fileEle = e.currentTarget;
      const files = fileEle.files;
      if (files) {
        this.uploadFiles(files);
      }
    },
    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(rawFile => {
        let timestamp = new Date().getTime();
        this.addUploading(timestamp);
        this.upload({ rawFile, timestamp });
      });
    },
    upload({ rawFile, timestamp }) {
      this.$refs.input.value = null;
      let formData = new FormData();
      formData.append(this.action.fileName, rawFile);
      if (this.action.data) {
        Object.keys(this.action.data).forEach(key => {
          formData.append(key, this.action.data[key]);
        });
      }
      let config = {
        onUploadProgress: throttle(progressEvent => {
          let progress = (progressEvent.loaded / progressEvent.total) * 100 || 0;
          store.commit('CustomService/updateProgressByTimestamp', {
            timestamp,
            progress
          });
        }, 100),
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios
        .post(this.action.target, formData, config)
        .then(res => {
          if (res.data.resultCode === '100') {
            store.commit('CustomService/clearMessageByTimestamp', {
              timestamp
            });
            this.$emit('file-success', res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addUploading(timestamp) {
      store.commit('CustomService/newMessage', {
        message: {
          id: '',
          fromName: this.userInfo.userNickname,
          head: this.userInfo.headerUrl,
          timestamp: timestamp,
          body: {
            type: 'loading'
          },
          isMyself: true
        }
      });
    }
  }
};
</script>

<style lang="scss">
.hy-upload {
}
</style>

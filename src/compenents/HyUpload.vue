<template>
  <div class="hy-upload">
    <input ref="input" type="file" @change="changeHandler" :multiple="multiple" :accept="accept" />
  </div>
</template>

<script>
export default {
  name: 'HyUpload',
  components: {},
  props: {
    limit: Number,
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    action: {
      type: Object,
      default() {
        return {
          target: '/api/v1/upload'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$refs.input.click();
    },
    changeHandler(e) {
      const files = e.currentTarget.files;
      if (files) {
        this.uploadFiles(files);
      }
    },
    uploadFiles(files) {
      if (this.limit && files.length > this.limit) {
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }
      this.upload(postFiles);
    },
    upload(files) {
      this.$refs.input.value = null;
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.$http
        .post(this.action.target, formData)
        .then(data => {
          this.$emit('file-success', data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.hy-upload {
}
</style>

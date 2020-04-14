<template>
  <div class="mail-list"></div>
</template>

<script>
export default {
  name: 'MailList',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.getMailList();
  },
  methods: {
    getMailList() {
      this.$http
        .get(this.$urls.mailList.mailList, {})
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.mail-list {
  width: 100vw;
}
</style>

<template>
  <div class="mail-list">
    <mail-item v-for="mail of mailList" :key="mail.id" :mail="mail"></mail-item>
  </div>
</template>

<script>
import MailItem from './compenents/MailItem';

export default {
  name: 'MailList',
  components: {
    MailItem
  },
  props: {},
  data() {
    return {
      mailList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getMailList();
    this.getApplies();
  },
  methods: {
    getMailList() {
      this.$http
        .get(this.$urls.mailList.mailList, {})
        .then(data => {
          this.mailList = data.filter(item => item.type === 'chat');
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getApplies() {
      this.$http
        .get(this.$urls.add.applies, {})
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

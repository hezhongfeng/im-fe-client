<template>
  <div class="mail-list">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-cell title="新的申请" is-link to="apply-list">
      <template #icon>
        <i class="iconfont iconqunliao" style="margin-right: 5px;"></i>
      </template>
    </van-cell>
    <van-cell title="群组" is-link to="group-list">
      <template #icon>
        <i class="iconfont iconqunliao" style="margin-right: 5px;"></i>
      </template>
    </van-cell>
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
      value: '',
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
    onSearch() {},
    onCancel() {},
    getMailList() {
      this.$http
        .get(this.$urls.mailList.mailList)
        .then(data => {
          this.mailList = data;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getApplies() {
      this.$http
        .get(this.$urls.add.applies)
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

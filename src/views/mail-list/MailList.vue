<template>
  <div class="mail-list">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-cell title="新的申请" to="apply-list">
      <template #icon>
        <i class="iconfont iconqunliao" style="margin-right: 5px;"></i>
      </template>
      <template #right-icon>
        <div class="apply-count" v-show="applyCount">
          <span class="count">{{applyCount}}</span>
          <i class="van-icon van-icon-arrow"></i>
        </div>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MailList',
  components: {
    MailItem
  },
  props: {},
  data() {
    return {
      value: ''
    };
  },
  computed: {
    ...mapGetters('mail', ['applyCount', 'mailList'])
  },
  watch: {},
  created() {
    this.getMailList();
    this.getApplies();
  },
  methods: {
    ...mapMutations('mail', ['updateApplyCount']),
    ...mapActions('mail', ['getMailList']),
    onSearch() {},
    onCancel() {},
    getApplies() {
      this.$http
        .get(this.$urls.add.applies)
        .then(data => {
          this.updateApplyCount(data.count);
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
  height: 100%;
  overflow-y: auto;
  .apply-count {
    height: 100%;
    display: flex;
    align-items: center;
    .count {
      color: rgba(255, 51, 0, 0.993);
      margin-right: 5px;
    }
  }
}
</style>

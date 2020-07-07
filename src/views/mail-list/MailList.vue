<template>
  <div class="mail-list" ref="wrapper">
    <div class="content">
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
      <mail-item v-for="mail of filterMailList" :key="mail.id" :mail="mail"></mail-item>
    </div>
  </div>
</template>

<script>
import MailItem from './compenents/MailItem';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import MouseWheel from '@better-scroll/mouse-wheel';

BScroll.use(ObserveDOM);
BScroll.use(MouseWheel);

export default {
  name: 'MailList',
  components: {
    MailItem
  },
  props: {},
  data() {
    return {
      value: '',
      bs: null
    };
  },
  computed: {
    ...mapGetters('mail', ['applyCount', 'mailList']),
    filterMailList() {
      if (!this.value) {
        return this.mailList;
      }
      return this.mailList.filter(mail => !(mail.userInfo.nickname.indexOf(this.value) === -1));
    }
  },
  created() {
    this.getMailList();
    this.getApplies();
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      observeDOM: true,
      mouseWheel: {}
    });
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
  overflow: hidden;
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

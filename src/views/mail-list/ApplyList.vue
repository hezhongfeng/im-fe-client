<template>
  <view-page class="apply-list" title="新的朋友">
    <div class="wrapper">
      <apply-item :apply="apply" v-for="apply of applyList" :key="apply.id" @click="onClick(apply)"></apply-item>
    </div>
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel" />
  </view-page>
</template>

<script>
import ApplyItem from './compenents/ApplyItem';

export default {
  name: 'ApplyList',
  components: {
    ApplyItem
  },
  props: {},
  data() {
    return {
      show: false,
      actions: [
        { name: '通过', color: '#07c160' },
        { name: '拒绝', color: 'red' }
      ],
      activeApplyId: '',
      activeApplyType: '',
      applyList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getApplies();
  },
  methods: {
    onCancel() {
      this.show = false;
    },
    onSelect(item) {
      const result = item.name === '通过';
      if (this.activeApplyType === 'user') {
        this.applyFriend(result);
      } else if (this.activeApplyType) {
        this.applyGroup(result);
      }
    },
    onClick(apply) {
      this.activeApplyId = apply.id;
      this.activeApplyType = apply.type;
      this.show = true;
    },
    applyFriend(approval) {
      const params = {
        id: this.activeApplyId,
        approval
      };
      this.$http
        .post(this.$urls.add.applyFriend, params)
        .then(data => {
          this.applyList = data.rows;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    applyGroup(approval) {
      const params = {
        id: this.activeApplyId,
        approval
      };
      this.$http
        .post(this.$urls.add.applyGroup, params)
        .then(data => {
          this.applyList = data.rows;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    },
    getApplies() {
      this.$http
        .get(this.$urls.add.applies)
        .then(data => {
          this.applyList = data.rows;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.apply-list {
  .apply-item:not(:last-child) {
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      margin-left: 10px;
      margin-right: 10px;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 1px;
    }
  }
}
</style>

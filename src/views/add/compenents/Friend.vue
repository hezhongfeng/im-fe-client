<template>
  <div class="friend">
    <div class="avatar">
      <img :src="avatar" />
    </div>
    <div class="name-info">
      <div class="name">{{name}}</div>
      <div class="info">{{info}}</div>
    </div>
    <div class="operation">
      <van-button type="primary" size="small" @click="onAdd">{{addStr}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friend',
  components: {},
  props: {
    friend: Object,
    type: String
  },
  data() {
    return {};
  },
  computed: {
    avatar() {
      switch (this.type) {
        case 'user':
          return this.friend.userInfo.photo;
        case 'group':
          return this.friend.photo;

        default:
          return '';
      }
    },
    name() {
      switch (this.type) {
        case 'user':
          return this.friend.userInfo.nickname;
        case 'group':
          return this.friend.name;

        default:
          return '';
      }
    },
    info() {
      switch (this.type) {
        case 'user':
          return this.friend.userInfo.sign || '暂无签名';
        case 'group':
          return this.friend.introduction || '暂无介绍';

        default:
          return '';
      }
    },
    addStr() {
      return this.type === 'user' ? '添加好友' : '申请入群';
    }
  },
  watch: {},
  created() {},
  methods: {
    onAdd() {
      this.$emit('add', { type: this.type, toId: this.friend.id });
    }
  }
};
</script>

<style lang="scss">
.friend {
  display: flex;
}
</style>

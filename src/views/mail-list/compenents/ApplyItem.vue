<template>
  <div class="apply-item">
    <div class="avatar">
      <img :src="apply.from.userInfo.photo" />
    </div>
    <div class="name-info">
      <div class="name">{{apply.from.userInfo.nickname}}</div>
      <div class="info">{{info}}</div>
    </div>
    <div class="operation">
      <van-button type="primary" size="small" @click="onClick">处理</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplyItem',
  components: {},
  props: {
    apply: Object
  },
  data() {
    return {};
  },
  computed: {
    info() {
      switch (this.apply.type) {
        case 'user':
          return '对方请求添加你为朋友';
        case 'group':
          return '对方请求入群';
        default:
          return '';
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss">
.apply-item {
  display: flex;
  position: relative;
  background-color: #fff;
  .avatar {
    width: 40px;
    height: 40px;
    margin: 10px;
    flex-shrink: 0;
    img {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name-info {
    flex-grow: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      color: #2f2f2f;
      font-size: 18px;
    }
    .info {
      color: #b1b1b1;
      font-size: 16px;
    }
  }
  .operation {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

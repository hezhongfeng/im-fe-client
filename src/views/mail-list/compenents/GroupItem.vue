<template>
  <div class="group-item">
    <div class="avatar">
      <img :src="group.photo" />
    </div>
    <div class="name">{{group.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'group-conversation-item',
  components: {},
  props: {
    group: Object
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.group-item {
  background-color: $color-white;
  display: flex;
  align-items: center;
  height: 60px;
  .avatar {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    img {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name {
    flex-grow: 2;
    position: relative;
    height: 100%;
    line-height: 60px;
    margin-left: 10px;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 1px;
    }
  }
}
</style>

<template>
  <div class="view-page">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
      <template #left v-if="$slots.left">
        <slot name="left"></slot>
      </template>
      <template #title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template #right v-if="$slots.right">
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
    <slot name="default"></slot>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPage',
  components: {},
  props: {
    title: String
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$emit('click-left');
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.view-page {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

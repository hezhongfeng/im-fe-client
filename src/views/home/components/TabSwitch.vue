<template>
  <div class="tab-switch">
    <div class="trans-zone" :style="styleObject">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-switch',
  components: {},
  props: {
    index: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    styleObject() {
      return {
        transform: `translateX(-${this.index}00vw)`
      };
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.tab-switch {
  overflow: hidden;
  height: calc(100vh - 50px);
  .trans-zone {
    display: flex;
    transition-duration: 0.3s;
  }
}
</style>

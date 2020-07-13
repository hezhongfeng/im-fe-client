<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabItem',
  components: {},
  props: {},
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
.tab-item {
  width: 25%;
  height: 100%;
}
</style>

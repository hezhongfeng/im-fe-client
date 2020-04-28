<template>
  <div class="apply-item">
    <div class="avatar"></div>
    <div class="name">{{apply.name}}</div>
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
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.apply-item {
}
</style>

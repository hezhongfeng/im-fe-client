<template>
  <div class="group-item">
    <div class="avatar"></div>
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
}
</style>

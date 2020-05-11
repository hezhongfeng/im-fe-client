<template>
  <div class="group-item">
    <div class="avatar"></div>
    <div class="name">{{conversation.target.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'group-conversation-item',
  components: {},
  props: {
    conversation: Object
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

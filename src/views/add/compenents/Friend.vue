<template>
  <div class="friend">
    <div class="name">{{name}}</div>
    <div class="type">{{typeStr}}</div>
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
    name() {
      switch (this.type) {
        case 'user':
          return this.friend.username;

        default:
          break;
      }
      return '';
    },
    typeStr() {
      return this.type === 'user' ? '会员' : '群组';
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.friend {
  display: flex;
}
</style>

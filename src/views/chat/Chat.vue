<template>
  <div class="chat">
    chat
    <session-list></session-list>
  </div>
</template>

<script>
import SessionList from './components/SessionList';
export default {
  name: 'session',
  components: {
    SessionList
  },
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
.chat {
  width: 100vw;
}
</style>

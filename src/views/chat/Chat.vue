<template>
  <div class="chat">
    chat
    <session-list></session-list>
  </div>
</template>

<script>
import IoService from '@/services/io.js';
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
  created() {
    IoService.connect();
  },
  methods: {}
};
</script>

<style lang="scss">
.chat {
  width: 100vw;
}
</style>

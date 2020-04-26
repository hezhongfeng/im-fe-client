<template>
  <div class="mail-item">
    <div class="avator"></div>
    <div class="name">{{mail.target.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'mail-item',
  components: {},
  props: {
    mail: Object
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
.mail-item {
  display: flex;
}
</style>

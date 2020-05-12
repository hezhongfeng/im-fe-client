<template>
  <view-page class="apply-list" title="新的朋友">
    <div class="wrapper">
      <apply-item :apply="apply" v-for="apply of applyList" :key="apply.id" @click="onClick"></apply-item>
    </div>
  </view-page>
</template>

<script>
import ApplyItem from './compenents/ApplyItem';

export default {
  name: 'ApplyList',
  components: {
    ApplyItem
  },
  props: {},
  data() {
    return {
      applyList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getApplies();
  },
  methods: {
    onClick() {
      console.log('click');
    },
    getApplies() {
      this.$http
        .get(this.$urls.add.applies)
        .then(data => {
          this.applyList = data.rows;
        })
        .catch(error => {
          this.$toast(error.errorMessage);
        });
    }
  }
};
</script>

<style lang="scss">
.apply-list {
  .apply-item:not(:last-child) {
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      margin-left: 10px;
      margin-right: 10px;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 1px;
    }
  }
}
</style>

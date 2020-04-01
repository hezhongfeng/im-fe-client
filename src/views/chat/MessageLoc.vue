<template>
  <hy-page title="客服" class="cs-chatbox">
    <template slot="content">
      <div class="message-loc">
        <biz-location-map :value="mapMessage"></biz-location-map>
      </div>
    </template>
  </hy-page>
</template>

<script>
import { HyPage } from '@/components/hy-page';
import { BizLocationMap } from '@/components/hy-location';

export default {
  name: 'MessageLoc',
  components: { HyPage, BizLocationMap },
  props: {},
  data() {
    return {
      mapMessage: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.mapMessage = this.$route.query;
  },
  methods: {}
};
</script>

<style lang="scss">
.message-loc {
  width: 100%;
  height: 100%;
}
</style>

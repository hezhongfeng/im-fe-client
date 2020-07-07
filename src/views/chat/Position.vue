<template>
  <div class="positionn" ref="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import BMap from 'BMap';

export default {
  name: 'positionn',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('position', ['position'])
  },
  watch: {},
  created() {},
  mounted() {
    const map = new BMap.Map(this.$refs.map);
    const point = new BMap.Point(this.position.lng, this.position.lat);
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
    const label = new BMap.Label(this.position.addr, {
      offset: new BMap.Size(20, -10)
    });
    marker.setLabel(label);
    map.centerAndZoom(point, 14);
  },
  methods: {}
};
</script>

<style lang="scss">
.positionn {
}
</style>

<template>
  <div id="app">
    <transition :name="transitionName">
      <vue-page-stack>
        <router-view :key="$route.fullPath" class="router-view-c"></router-view>
      </vue-page-stack>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'forward'
    };
  },
  components: {},
  created() {},
  watch: {
    $route(to, from) {
      if (to.params['stack-key-dir'] === 'forward') {
        this.transitionName = 'forward';
      } else {
        this.transitionName = 'back';
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  * {
    box-sizing: border-box;
  }
  .router-view-c {
    position: absolute;
    transition: opacity 0.5s, transform 0.5s;
    width: 100%;
    height: 100%;
    background-color: #ededed;
  }
  .forward-enter,
  .back-leave-active {
    opacity: 0.5;
    transform: translateX(100%);
  }
  .forward-leave-active,
  .back-enter {
    opacity: 0.5;
    transform: translateX(-100%);
  }
}
</style>

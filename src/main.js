import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import VuePageStack from 'vue-page-stack';
import AppInit from './app-init.js';
import 'vant/lib/index.css';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(VuePageStack, { router });

AppInit().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import im from './modules/im';
import mail from './modules/mail';
import position from './modules/position';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    im,
    mail,
    position
  }
});

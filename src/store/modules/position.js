const state = {
  position: {
    lng: 0,
    lta: 0,
    addr: ''
  }
};

// getters
const getters = {
  position(state) {
    return state.position;
  }
};

// mutations
const mutations = {
  updatePosition(state, position) {
    state.position = position;
  }
};

// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

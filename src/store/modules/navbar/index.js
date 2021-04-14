let state = {
  navbarShow: false,
};

const mutations = {
  SHOW_NAVBAR(state) {
    state.navbarShow = true;
  },
  HIDE_NAVBAR(state) {
    state.navbarShow = false;
  },
};

const actions = {
  showNavbar(context) {
    context.commit("SHOW_NAVBAR");
  },
  hideNavbar(context) {
    context.commit("HIDE_NAVBAR");
  },
};

const navbarModule = {
  state,
  mutations,
  actions,
};

export default navbarModule;

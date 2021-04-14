import { createStore } from "vuex";
import authentication from "./modules/authentication";
import navbar from "./modules/navbar";

const store = createStore({
  modules: {
    auth: authentication,
    nav: navbar,
  },
});

export default store;

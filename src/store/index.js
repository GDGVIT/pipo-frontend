import { createStore } from "vuex";
import authentication from "./modules/authentication";

const store = createStore({
  modules: {
    authentication,
  },
});

export default store;

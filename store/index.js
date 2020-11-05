import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import shift from "./modules/shift";

Vue.use(Vuex);
const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      shift
    }
  });
};
export default createStore;

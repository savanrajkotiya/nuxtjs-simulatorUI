import * as types from "./types";

const mutations = {
  [types.SET_SHIFTS](state, payload) {
    const data = state.shiftList;
    data.push(payload);
    state.shiftList = data;
  }
};
export default mutations;

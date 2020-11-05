import * as types from "./types";
export default {
  setShifts(context, payload) {
    context.commit(types.SET_SHIFTS, payload);
  }
};

import { combineSlices } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api";
import { countersReducer } from "../modules/counters/counters.slice";

export const rootReducer = combineSlices(baseApi, {
  counters: countersReducer,
});

import { combineSlices } from "@reduxjs/toolkit";
import { countersReducer } from "../modules/counters/counters.slice";

export const rootReducer = combineSlices({
  counters: countersReducer,
});

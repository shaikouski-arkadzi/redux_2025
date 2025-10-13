import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "./store.types";

export const createAppSelector = createSelector.withTypes<AppState>();

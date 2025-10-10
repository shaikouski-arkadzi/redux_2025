import { createSelector } from "@reduxjs/toolkit";
import type { AppState } from "./store";

export const createAppSelector = createSelector.withTypes<AppState>();

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import type { store } from "./store";
import type { extraArgument } from "./extra-arguments";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import type { store } from "./store";
import type { extraArgument } from "./extra-arguments";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
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

export type ExtraArgument = typeof extraArgument;

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

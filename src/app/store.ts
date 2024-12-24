import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imageReducer from "../slices/imageSlice";
import counterReducer from "../features/counter/counterSlice";
import tableReducer from "../slices/tableSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    counter: counterReducer,
    table: tableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import userReducer from "../pages/auth/redux/user.slice";

export const store = configureStore({
  reducer: { user: userReducer },
});

// Lấy RootState và AppDispatch từ store của chúng ta.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

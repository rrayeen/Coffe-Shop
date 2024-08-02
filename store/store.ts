import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "./features/CartSlice";

const store = configureStore({
  reducer: { user: userSlice, cart: cartSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { store };

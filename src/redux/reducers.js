import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "../lib/persistConfig";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

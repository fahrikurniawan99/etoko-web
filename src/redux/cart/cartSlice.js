import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { PURGE } from "redux-persist";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      toast.success("succes add to cart");
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      customEntityAdapter.removeAll(state);
    });
  },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

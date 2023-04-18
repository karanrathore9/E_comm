import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  counter: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.counter = state.cartItems.length;
      console.log(action.payload);
    },
    incrementCounter: (state) => {
      state.counter = state.counter + 1;
      console.log(state.counter);
    },
    decrementCounter: (state) => {
      state.counter--;
      console.log(state.counter);
    },
  },
});
console.log(cartSlice.actions, "ACTIONS");

export const { setCartItems, incrementCounter, decrementCounter } =
  cartSlice.actions;

export default cartSlice.reducer;

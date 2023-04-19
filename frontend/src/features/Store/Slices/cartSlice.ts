import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  [x: string]: any;
  cartItems: CartItem[];
  counter: number;
}

const initialState: CartState = {
  cartItems: [],
  counter: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
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



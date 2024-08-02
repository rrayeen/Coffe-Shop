import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface cartState {
  username: string;
  adress: string;
  cart: any;
}

// Define the initial state using that type
const initialState: cartState = {
  username: "rayen",
  adress: "hshshshs",
  cart: [],
};

export const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    CreateAdress: (state, action) => {
      state.username = action.payload.username;
      state.adress = action.payload.adress;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },

    clearCart: (state) => {
      state.cart = [];
    },
    inscreaseQuantity: (state, action) => {
      state.cart = state.cart.map((el: any) => {
        if (el.$id === action.payload) {
          return { ...el, quantity: el.quantity + 1 };
        } else {
          return el;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((el: any) => {
        if (el.$id === action.payload)
          return { ...el, quantity: el.quantity - 1 };
        else return el;
      });
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((el: any) => el.$id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  inscreaseQuantity,
  decreaseQuantity,
  removeFromCart,
  CreateAdress,
  addToCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

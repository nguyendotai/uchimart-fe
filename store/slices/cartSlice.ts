import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/app/types/Product";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        const currentItem = state.items[index];
        const maxAddable =
          currentItem.stock_quantity - currentItem.cartQuantity;

        const quantityToAdd = Math.min(
          action.payload.cartQuantity,
          maxAddable
        );

        if (quantityToAdd > 0) {
          currentItem.cartQuantity += quantityToAdd;
        }
      } else {
        const quantityToAdd = Math.min(
          action.payload.cartQuantity,
          action.payload.stock_quantity
        );

        state.items.push({
          ...action.payload,
          cartQuantity: quantityToAdd,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.cartQuantity < item.stock_quantity) {
        item.cartQuantity += 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.cartQuantity > 1) {
        item.cartQuantity -= 1;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/Product";

interface CartItem extends Product {
  cartQuantity: number;
}

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
    addToCart(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].cartQuantity += 1;
      } else {
        state.items.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.cartQuantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.cartQuantity > 1) item.cartQuantity -= 1;
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

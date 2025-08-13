import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/app/types/Product";
import axios from "axios";

// ==========================
// Helpers for localStorage
// ==========================
const CART_KEY = "cart";

const saveCartToLocal = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const loadCartFromLocal = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

// ==========================
// State
// ==========================
interface CartState {
  items: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  items: loadCartFromLocal(),
  loading: false,
};

// ==========================
// Helper: Lấy token và header
// ==========================
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ==========================
// Async thunks (API mode)
// ==========================

// Lấy giỏ hàng từ DB
export const fetchCartFromApi = createAsyncThunk(
  "cart/fetchFromApi",
  async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/carts", {
      headers: getAuthHeader(),
    });
    return res.data.data as CartItem[];
  }
);

// Đồng bộ giỏ hàng local -> DB khi login
export const syncCartApi = createAsyncThunk(
  "cart/syncCart",
  async (payload: { items: { inventory_id: number; quantity: number }[] }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/carts/sync-cart",
      payload, // ✅ payload đúng format { items: [...] }
      { headers: getAuthHeader() }
    );
    console.log("API sync-cart response:", res.data);
    return res.data.cart.items as CartItem[];
  }
);



// Thêm sản phẩm vào giỏ (API)
export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async ({
    inventory_id,
    quantity,
  }: {
    inventory_id: number;
    quantity: number;
  }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/carts/items",
      { inventory_id, quantity },
      { headers: getAuthHeader() }
    );
    return res.data.cart.items; // hoặc item tùy BE trả
  }
);

// Cập nhật số lượng (API)
export const updateCartItemApi = createAsyncThunk(
  "cart/updateCartItemApi",
  async ({ id, quantity }: { id: number; quantity: number }) => {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/carts/items/${id}`,
      { quantity },
      { headers: getAuthHeader() }
    );
    return res.data.item;
  }
);

// Xóa sản phẩm (API)
export const removeItemFromCartApi = createAsyncThunk(
  "cart/removeItemFromCartApi",
  async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/api/carts/items/${id}`, {
      headers: getAuthHeader(),
    });
    return id;
  }
);

// Xóa toàn bộ giỏ (API)
export const clearCartApi = createAsyncThunk("cart/clearCartApi", async () => {
  await axios.delete("http://127.0.0.1:8000/api/carts/clear", {
    headers: getAuthHeader(),
  });
  return [];
});
// ==========================
// Slice
// ==========================
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ====== Local mode ======
    addToCartLocal(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        const currentItem = state.items[index];
        const maxAddable =
          currentItem.stock_quantity - currentItem.cartQuantity;
        const quantityToAdd = Math.min(action.payload.cartQuantity, maxAddable);

        if (quantityToAdd > 0) {
          currentItem.cartQuantity += quantityToAdd;
        }
      } else {
        const quantityToAdd = Math.min(
          action.payload.cartQuantity,
          action.payload.stock_quantity
        );

        state.items.push({ ...action.payload, cartQuantity: quantityToAdd });
      }

      saveCartToLocal(state.items);
    },

    removeFromCartLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocal(state.items);
    },

    increaseQuantityLocal(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.cartQuantity < item.stock_quantity) {
        item.cartQuantity += 1;
        saveCartToLocal(state.items);
      }
    },

    decreaseQuantityLocal(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.cartQuantity > 1) {
        item.cartQuantity -= 1;
        saveCartToLocal(state.items);
      }
    },

    setQuantityLocal(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const newQuantity = Math.max(
          1,
          Math.min(quantity, item.stock_quantity)
        );
        item.cartQuantity = newQuantity;
        saveCartToLocal(state.items);
      }
    },

    clearCartLocal(state) {
      state.items = [];
      localStorage.removeItem(CART_KEY);
    },
  },
  // ==========================
  // extraReducers
  // ==========================
  extraReducers: (builder) => {
    builder
      // Fetch from API
      .addCase(fetchCartFromApi.fulfilled, (state, action) => {
        state.items = action.payload; // backend trả về mảng CartItem trực tiếp
      })

      // Sync local to API
      .addCase(syncCartApi.fulfilled, (state, action) => {
        // backend trả về { message, cart: { items: [...] } }
        state.items = action.payload; // action.payload đã là CartItem[]
      })

      // Add API
      .addCase(addToCartApi.fulfilled, (state, action) => {
        // backend trả về { message, cart: { items: [...] } }
        state.items = action.payload; // gán mảng CartItem
      })

      // Update API
      .addCase(updateCartItemApi.fulfilled, (state, action) => {
        // backend trả về { message, item }
        const updatedItem = action.payload.item ?? action.payload; // phòng trường hợp BE trả về item trực tiếp
        const index = state.items.findIndex((i) => i.id === updatedItem.id);
        if (index >= 0) state.items[index] = updatedItem;
      })

      // Remove API
      .addCase(removeItemFromCartApi.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // Clear API
      .addCase(clearCartApi.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  setQuantityLocal,
  clearCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;

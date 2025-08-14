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
    // 1. Lấy cart từ API
    const resCart = await axios.get("http://127.0.0.1:8000/api/carts", {
      headers: getAuthHeader(),
    });
    const cartItems = resCart.data.data as CartItem[];

    // 2. Lấy toàn bộ product (có inventory bên trong)
    const resProduct = await axios.get("http://127.0.0.1:8000/api/products", {
      headers: getAuthHeader(),
    });
    const products = resProduct.data.data;

    // 3. Map cartItem với inventory tương ứng
    const cartItemsWithInventory = cartItems.map((item) => {
      const product = products.find((p: any) =>
        p.inventories.some((inv: any) => inv.id === item.inventory_id)
      );
      const inventory = product?.inventories.find(
        (inv: any) => inv.id === item.inventory_id
      );

      return {
        ...item,
        inventory: {
          ...inventory,
          sale_price: inventory?.sale_price ?? "0₫",
          offer_price: inventory?.offer_price ?? "0₫",
          stock_quantity: inventory?.stock_quantity ?? 0,
          title: inventory?.title ?? "", // fallback là string rỗng
          image: inventory?.image ?? "", // fallback là string rỗng
        },
      };
    });

    return cartItemsWithInventory;
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
        const stockQuantity = currentItem.inventory?.stock_quantity ?? 0;
        const maxAddable = stockQuantity - currentItem.quantity;
        const quantityToAdd = Math.min(action.payload.quantity, maxAddable);

        if (quantityToAdd > 0) {
          currentItem.quantity += quantityToAdd;
        }
      } else {
        const stockQuantity = action.payload.inventory?.stock_quantity ?? 0;
        const quantityToAdd = Math.min(action.payload.quantity, stockQuantity);
        state.items.push({ ...action.payload, quantity: quantityToAdd });
      }

      saveCartToLocal(state.items);
    },

    removeFromCartLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocal(state.items);
    },

    increaseQuantityLocal(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      const stockQuantity = item?.inventory?.stock_quantity ?? 0;
      if (item && item.quantity < stockQuantity) {
        item.quantity += 1;
        saveCartToLocal(state.items);
      }
    },

    decreaseQuantityLocal(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocal(state.items);
      }
    },

    setQuantityLocal(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      const stockQuantity = item?.inventory?.stock_quantity ?? 0;
      if (item) {
        const newQuantity = Math.max(1, Math.min(quantity, stockQuantity));
        item.quantity = newQuantity;
        saveCartToLocal(state.items);
      }
    },

    clearCartLocal(state) {
      state.items = [];
      localStorage.removeItem(CART_KEY);
    },
    resetCart(state) {
      state.items = [];
      saveCartToLocal([]); // local cũng trống
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
        const updatedItem = action.payload.item ?? action.payload;
        const index = state.items.findIndex((i) => i.id === updatedItem.id);
        if (index >= 0) {
          state.items[index].quantity = updatedItem.quantity;
          saveCartToLocal(state.items);
        }
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
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

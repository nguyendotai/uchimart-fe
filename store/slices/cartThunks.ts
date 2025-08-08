// src/redux/thunks/cartThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CartItem } from "@/app/types/Product";

// Lấy giỏ hàng của người dùng (yêu cầu token)
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.items as CartItem[];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Thêm sản phẩm vào giỏ trên backend
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/carts", item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Xóa item khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (
    { cartId, inventoryId }: { cartId: number; inventoryId: number },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/carts/${cartId}/items/${inventoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return inventoryId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Cập nhật số lượng
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    {
      cartId,
      itemId,
      quantity,
    }: { cartId: number; itemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/carts/${cartId}`, {
        inventory_id: itemId,
        quantity: quantity,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

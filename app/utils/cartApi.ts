import axios from "axios";
import type { CartItem } from "@/app/types/Product";
import { RootState } from "@/store";

const API_URL = `http://127.0.0.1:8000`; // vd: http://localhost:8000/api

// Thêm sản phẩm vào giỏ
export const addCartItem = async (inventory_id: number, quantity: number) => {
  const res = await axios.post(`${API_URL}/carts/items`, {
    inventory_id,
    quantity,
  }, {
    withCredentials: true, // nếu dùng Sanctum
  });
  return res.data;
};

// Lấy giỏ hàng
export const getCart = async () => {
  const res = await axios.get(`${API_URL}/carts`, { withCredentials: true });
  return res.data;
};

// Cập nhật số lượng
export const updateCartItem = async (itemId: number, quantity: number) => {
  const res = await axios.put(`${API_URL}/carts/items/${itemId}`, {
    quantity,
  }, {
    withCredentials: true,
  });
  return res.data;
};

// Xóa sản phẩm
export const removeCartItem = async (itemId: number) => {
  const res = await axios.delete(`${API_URL}/carts/items/${itemId}`, {
    withCredentials: true,
  });
  return res.data;
};

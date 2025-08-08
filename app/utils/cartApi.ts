// utils/cartApi.ts
import axios from "axios";
import { CartItem } from "@/app/types/Product";

const API_BASE = "http://127.0.0.1:8000/api"; // chỉnh lại nếu khác

export const fetchCart = async () => {
  const response = await axios.get(`${API_BASE}/carts`);
  return response.data;
};

export const addToCartApi = async (item: CartItem) => {
  const token = localStorage.getItem("token"); // dùng authToken, KHÔNG phải "token"

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await axios.post(`${API_BASE}/carts`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const updateCartItem = async (cartId: number, item: CartItem) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN GỬI LÊN:", token);

  const response = await axios.put(`${API_BASE}/carts/${cartId}`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeCartItem = async (cartId: number, inventoryId: number) => {
  const response = await axios.delete(
    `${API_BASE}/carts/${cartId}/items/${inventoryId}`
  );
  return response.data;
};

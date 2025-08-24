"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { syncCartApi, fetchCartFromApi } from "@/store/slices/cartSlice";
import type { AppDispatch } from "@/store";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const hasRun = useRef(false); // ✅ flag chống chạy lại

  useEffect(() => {
    if (hasRun.current) return; // nếu đã chạy thì bỏ qua
    hasRun.current = true;

    const handleLoginGGSuccess = async () => {
      const id = searchParams.get("id");
      const email = searchParams.get("email");
      const name = searchParams.get("name");
      const avatar = searchParams.get("avatar");
      const birthday = searchParams.get("birthday");
      const phone_number = searchParams.get("phone_number");
      const genders = searchParams.get("genders");
      const token = searchParams.get("token");

      if (id && email && name && token) {
        // 1️⃣ Lưu user + token
        const user = {
          id,
          email,
          name,
          avatar,
          birthday,
          phone_number,
          genders: Number(genders),
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        window.dispatchEvent(new Event("userChanged"));

        // 2️⃣ Lấy giỏ hàng local (persist:cart)
        const persistedCart = localStorage.getItem("persist:cart");
        let cartItems: any[] = [];
        if (persistedCart) {
          const parsed = JSON.parse(persistedCart);
          cartItems = JSON.parse(parsed.items || "[]");
        }

        // 3️⃣ Chuyển đổi format giỏ hàng
        const itemsToSync = cartItems.map((item: any) => ({
          inventory_id: item.inventory_id ?? item.id,
          quantity: item.quantity ?? item.cartQuantity,
        }));

        // 4️⃣ Sync local → DB
        if (itemsToSync.length > 0) {
          await dispatch(syncCartApi({ items: itemsToSync }));
        }

        // 5️⃣ Fetch giỏ hàng từ DB
        await dispatch(fetchCartFromApi());

        // 6️⃣ Xoá giỏ hàng local
        localStorage.removeItem("persist:cart");

        // 7️⃣ Thông báo + redirect
        toast.success("Đăng nhập Google thành công!");
        router.push("/");
      }
    };

    handleLoginGGSuccess();
  }, [searchParams, router, dispatch]);

  return <div className="text-center mt-10 text-xl">Đang đăng nhập bằng Google...</div>;
};

export default LoginGGSuccess;

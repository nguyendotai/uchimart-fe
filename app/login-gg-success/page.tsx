"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { syncCartApi, fetchCartFromApi } from "@/store/slices/cartSlice";
import type { AppDispatch } from "@/store";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoginGGSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const hasRun = useRef(false); // ✅ flag chống chạy lại

  useEffect(() => {
    if (hasRun.current) return;
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

        const persistedCart = localStorage.getItem("persist:cart");
        let cartItems: any[] = [];
        if (persistedCart) {
          const parsed = JSON.parse(persistedCart);
          cartItems = JSON.parse(parsed.items || "[]");
        }

        const itemsToSync = cartItems.map((item: any) => ({
          inventory_id: item.inventory_id ?? item.id,
          quantity: item.quantity ?? item.cartQuantity,
        }));

        if (itemsToSync.length > 0) {
          await dispatch(syncCartApi({ items: itemsToSync }));
        }

        await dispatch(fetchCartFromApi());
        localStorage.removeItem("persist:cart");

        toast.success("Đăng nhập Google thành công!");
        router.push("/");
      }
    };

    handleLoginGGSuccess();
  }, [searchParams, router, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      {/* Spinner xoay */}
      <Loader2 className="w-12 h-12 animate-spin text-[#921573]" />

      {/* Text có hiệu ứng mờ dần sáng dần */}
      <motion.div
        className="text-xl font-medium text-gray-700"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Đang đăng nhập bằng Google...
      </motion.div>
    </div>
  );
};

export default LoginGGSuccess;

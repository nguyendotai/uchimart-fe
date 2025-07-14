"use client";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

const Cart = () => {
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.cartQuantity, 0)
  );

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-black"
    >
      <div className="bg-[#f3e5f5] rounded-full p-2">
        <FaShoppingCart className="text-2xl" style={{ color: "#921573" }} />
      </div>
      <span className="text-sm font-medium truncate">Giỏ hàng</span>
      {totalItems > 0 && (
        <span className="absolute top-[-8px] right-[60px] bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default Cart;

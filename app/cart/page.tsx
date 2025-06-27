"use client";
import React from "react";
import { useState } from "react";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";

export default function CartPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <div className="container p-4 flex justify-between lg:flex-row gap-8">
      {/* Left: Danh sách sản phẩm */}
      <div className="w-[75%]">
        <h1 className="text-3xl font-bold mb-4 ">GIỎ HÀNG</h1>
        <CartList selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
      </div>

      {/* Right: Tổng thanh toán */}
      <div className="w-[24%] mt-13 sticky top-32 self-start">
        <CartSummary selectedIds={selectedIds} />
      </div>
    </div>
  );
}

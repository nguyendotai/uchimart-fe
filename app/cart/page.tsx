"use client";
import React from "react";
import { useState } from "react";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import ProductSuggestions from "./components/ProductSuggestions";
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";
import ListSaleProduct from "./components/ListSaleProduct";

export default function CartPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <PageTransitionWrapper>
      <div className="container py-4">
        <div className="w-full flex justify-between lg:flex-row gap-8">
          {/* Left: Danh sách sản phẩm */}
          <div className="w-[75%]">
            <h1 className="text-3xl font-bold mb-4 text-[#921573]">GIỎ HÀNG</h1>
            <CartList
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>

          {/* Right: Tổng thanh toán */}
          <div className="w-[24%] mt-13 sticky top-32 self-start">
            <CartSummary selectedIds={selectedIds} />
          </div>
        </div>
        <div className="mt-10">
          <ProductSuggestions></ProductSuggestions>
        </div>
        <div className="mt-10">
          <ListSaleProduct></ListSaleProduct>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}

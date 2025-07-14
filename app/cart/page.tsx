"use client";
import React from "react";
import { useState } from "react";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import ProductSuggestions from "./components/ProductSuggestions";
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";
import ListSaleProduct from "./components/ListSaleProduct";
import Link from "next/link";

export default function CartPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <PageTransitionWrapper>
      <div className="w-full py-4">
        <h1 className="text-3xl font-bold mb-4 text-[#921573] text-center">
          GIỎ HÀNG
        </h1>
        <div className="text-sm text-gray-500 mb-6 text-center">
          <Link href="/" className="hover:underline cursor-pointer text-[#921573]">
            Trang chủ
          </Link>
          <span className="mx-1">/</span>
          <span>Giỏ hàng</span>
        </div>
        <div className="w-full flex lg:gap-8 flex-col lg:flex-row">
          {/* Left: Danh sách sản phẩm */}
          <div className="flex-1">
            <CartList
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>

          {/* Right: Tổng thanh toán */}
          <div className="w-full lg:w-[320px] self-end lg:self-start sticky top-32">
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

"use client";
import React from "react";
import { useState } from "react";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import ProductSuggestions from "./components/ProductSuggestions";
import ListSaleProduct from "./components/ListSaleProduct";
import Link from "next/link";
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";

export default function CartPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Giỏ Hàng Của Bạn
            </h1>
            <div className="mt-2 text-sm text-gray-600 font-medium">
              <Link
                href="/"
                className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
              >
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-500">Giỏ hàng</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart List Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sản Phẩm Đã Chọn
              </h2>
              <CartList
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>

            {/* Cart Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Tổng Quan Đơn Hàng
                </h2>
                <CartSummary selectedIds={selectedIds} />
              </div>
            </div>
          </div>

          {/* Product Suggestions Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Gợi Ý Sản Phẩm
            </h2>
            <ProductSuggestions />
          </div>

          {/* Sale Products Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sản Phẩm Đang Giảm Giá
            </h2>
            <ListSaleProduct />
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
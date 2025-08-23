"use client";
import React, { useState } from "react";
import { CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

type Props = {
  items: CartItem[];
};

export default function OrderSummary({ items }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const subTotal = items.reduce((sum, item) => {
    const salePrice = formatCurrencyToNumber(item.sale_price);
    const offerPrice = formatCurrencyToNumber(item.offer_price ?? "0");
    const price = offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

    return sum + price * item.quantity;
  }, 0);

  const shippingFee = 16000;
  const shippingDiscount = 16000;
  const totalDiscount = shippingDiscount;
  const finalTotal = subTotal + shippingFee - totalDiscount;

  return (
    <div className="bg-teal-50 rounded-xl shadow-sm text-sm p-5 space-y-5">

      {/* Tóm tắt đơn hàng */}
      <div className="bg-white p-4 rounded-lg space-y-4 border border-gray-200 shadow-sm">
        <p className="font-semibold text-gray-900 text-base">Tóm tắt đơn hàng</p>

        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tạm tính</span>
          <span className="text-gray-800 font-medium">{(subTotal ?? 0).toLocaleString()} đ</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tổng phí vận chuyển</span>
          <span className="text-gray-800 font-medium">{(shippingFee ?? 0).toLocaleString()} đ</span>
        </div>

        {/* Tổng khuyến mãi */}
        <div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="text-gray-600 flex items-center gap-1">
              Tổng khuyến mãi{" "}
              <span className="transform text-xs">
                {showDetails ? "▲" : "▼"}
              </span>
            </span>
            <span className="text-teal-600 font-medium">
              -{(totalDiscount ?? 0).toLocaleString()} đ
            </span>
          </div>

          {/* Chi tiết khuyến mãi */}
          {showDetails && (
            <div className="ml-2 mt-2 text-gray-600 text-xs">
              Giảm giá phí vận chuyển: -{shippingDiscount.toLocaleString()} đ
            </div>
          )}
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-teal-600 text-sm font-medium">
            Tiết kiệm {shippingDiscount / 1000}K
          </span>
        </div>

        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-4">
          <span>Tổng tiền</span>
          <span className="text-orange-600">{(finalTotal ?? 0).toLocaleString()} đ</span>
        </div>

        <button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-colors duration-200"
          onClick={() => alert("Đặt đơn thành công!")}
        >
          Đặt đơn
        </button>
      </div>
    </div>
  );
}

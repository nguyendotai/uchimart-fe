"use client";
import React, { useState } from "react";
import { CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

type Props = {
  items: CartItem[];
};

export default function OrderSummary({ items }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [vatChecked, setVatChecked] = useState(false);

  const subTotal = items.reduce((sum, item) => {
    const salePrice = formatCurrencyToNumber(item.sale_price);
    const offerPrice = formatCurrencyToNumber(item.offer_price ?? "0");
    const price = offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

    return sum + price * item.cartQuantity;
  }, 0);

  const shippingFee = 16000;
  const shippingDiscount = 16000;
  const totalDiscount = shippingDiscount;
  const finalTotal = subTotal + shippingFee - totalDiscount;

  return (
    <div className="bg-[#f3e5f5] rounded-lg shadow-sm text-sm p-4 space-y-4">
      {/* VAT */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={vatChecked}
          onChange={() => setVatChecked(!vatChecked)}
          className="w-4 h-4"
        />
        <span className="text-gray-800 font-medium">Xuất hóa đơn VAT</span>
      </label>

      {/* Tóm tắt đơn hàng */}
      <div className="bg-gray-50 p-4 rounded-md space-y-3 border border-gray-300">
        <p className="font-semibold text-gray-800">Tóm tắt đơn hàng</p>

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
            <span className="text-green-600 font-medium">
              -{(totalDiscount ?? 0).toLocaleString()} đ
            </span>
          </div>

          {/* Chi tiết khuyến mãi */}
          {showDetails && (
            <div className="ml-2 mt-1 text-gray-600 text-xs">
              Giảm giá phí vận chuyển: -{shippingDiscount.toLocaleString()} đ
            </div>
          )}
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="pt-2 border-t">
        <div className="flex justify-between items-center mb-1">
          <span className="text-green-600 text-sm font-medium">
            Tiết kiệm {shippingDiscount / 1000}K
          </span>
        </div>

        <div className="flex justify-between items-center text-lg font-semibold mb-4">
          <span>Tổng tiền</span>
          <span className="text-orange-600">{(finalTotal ?? 0).toLocaleString()} đ</span>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
          onClick={() => alert("Đặt đơn thành công!")}
        >
          Đặt đơn
        </button>
      </div>
    </div>
  );
}

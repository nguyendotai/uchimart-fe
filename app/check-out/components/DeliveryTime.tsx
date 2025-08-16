"use client";
import React from "react";
import { MdAccessTime } from "react-icons/md";
import Image from "next/image";
import type { CartItem } from "@/app/types/Product";
import {
  formatCurrencyToNumber,
  formatNumberToCurrency,
} from "@/app/utils/helpers";

type Props = {
  items: CartItem[];
  selectedTime: string;
  onChange: (time: string) => void;
};

export default function DeliveryTime({ items, selectedTime, onChange }: Props) {
  return (
    <div className="bg-teal-50 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Bước số */}
      <div className="flex gap-3 items-center mb-4">
        <div className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold">
          3
        </div>
        <h2 className="text-base font-semibold text-gray-900 tracking-tight">
          Chọn giờ giao nhận
        </h2>
      </div>

      {/* Chọn giờ */}
      <div className="border border-teal-200 rounded-lg overflow-hidden mb-5">
        <div className="flex items-stretch">
          <div className="flex items-center gap-2 px-4 py-3 bg-white text-teal-600 text-sm font-medium">
            <MdAccessTime className="text-lg" />
            Chọn giờ giao
          </div>
          <select
            value={selectedTime}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-sm px-4 py-3 bg-white border-l border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors"
          >
            <option value="">Hôm nay, 15:00 - 16:00</option>
            <option value="8-9">Ngày mai, 8:00 - 9:00</option>
            <option value="9-10">Ngày mai, 9:00 - 10:00</option>
            <option value="10-11">Ngày mai, 10:00 - 11:00</option>
          </select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4 mb-5">
        {items.map((item) => {
          const offerPrice = formatCurrencyToNumber(item.offer_price ?? "");
          const salePrice = formatCurrencyToNumber(item.sale_price);
          const unitPrice =
            offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

          return (
            <div
              key={item.id}
              className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-none"
            >
              <Image
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                width={48}
                height={48}
                className="rounded-lg object-cover w-12 h-12"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-gray-900">
                    {formatNumberToCurrency(unitPrice)} ₫
                  </span>
                  {offerPrice > 0 && offerPrice < salePrice && (
                    <span className="text-rose-500 text-xs bg-rose-100 px-2 py-0.5 rounded-full font-medium">
                      Ưu đãi
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                x{item.cartQuantity}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ghi chú đơn */}
      <textarea
        placeholder="Nhập ghi chú đơn"
        className="w-full rounded-lg bg-gray-50 px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors resize-none"
      />

      {/* Khuyến mãi */}
      <p className="text-sm text-gray-600 mt-4 mb-3">
        Mua thêm <span className="font-semibold text-gray-800">36k</span> để được giảm phí ship
      </p>

      {/* Điểm thưởng */}
      <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium">
        Dự kiến <span className="font-semibold">+35 điểm</span> cho đơn
      </div>
    </div>
  );
}

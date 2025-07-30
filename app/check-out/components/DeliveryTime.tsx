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
    <div className="bg-[#f3e5f5] p-4 rounded-md shadow-sm">
      {/* Bước số */}
      <div className="flex gap-2 items-center mb-3">
        <h2 className="w-6 h-6 flex items-center justify-center bg-[#c67ed1] text-white rounded-full text-sm font-semibold">
          3
        </h2>
        <h2 className="text-sm font-semibold text-gray-800">Chọn giờ giao nhận</h2>
      </div>

      {/* Chọn giờ */}
      <div className="border border-blue-300 rounded-lg overflow-hidden mb-4">
        <div className="flex items-stretch">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium">
            <MdAccessTime className="text-lg" />
            Chọn giờ giao
          </div>
          <select
            value={selectedTime}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-sm px-4 py-2 border-l border-blue-200 focus:outline-none"
          >
            <option value="">Hôm nay, 15:00 - 16:00</option>
            <option value="8-9">Ngày mai, 8:00 - 9:00</option>
            <option value="9-10">Ngày mai, 9:00 - 10:00</option>
            <option value="10-11">Ngày mai, 10:00 - 11:00</option>
          </select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-3 mb-3">
        {items.map((item) => {
          const offerPrice = formatCurrencyToNumber(item.offer_price ?? "");
          const salePrice = formatCurrencyToNumber(item.sale_price);
          const unitPrice =
            offerPrice > 0 && offerPrice < salePrice ? offerPrice : salePrice;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b pb-3 last:border-none"
            >
              <Image
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                width={48}
                height={48}
                className="rounded object-cover w-12 h-12"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-gray-800">
                    {formatNumberToCurrency(unitPrice)} ₫
                  </span>
                  {offerPrice > 0 && offerPrice < salePrice && (
                    <span className="text-red-500 text-xs bg-red-100 px-2 py-[2px] rounded-full">
                      Ưu đãi
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 whitespace-nowrap">
                x{item.cartQuantity}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ghi chú đơn */}
      <textarea
        placeholder="Nhập ghi chú đơn"
        className="w-full rounded-md bg-gray-50 px-3 py-2 text-sm mb-3 resize-none border border-gray-200"
      />

      {/* Khuyến mãi */}
      <p className="text-sm text-gray-600 mb-2">
        Mua thêm <span className="font-medium">36k</span> để được giảm phí ship
      </p>

      {/* Điểm thưởng */}
      <div className="bg-green-50 text-green-600 px-4 py-2 rounded text-sm font-medium">
        Dự kiến <span className="font-semibold">+35 điểm</span> cho đơn
      </div>
    </div>
  );
}

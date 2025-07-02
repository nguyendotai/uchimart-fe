"use client";
import React from "react";
import { PiMapPinFill } from "react-icons/pi";

export default function DeliveryAddress() {
  return (
    <div className="bg-[#f5f9ff] p-4 rounded-md">
      {/* Header */}
      <div className="flex gap-2 items-center mb-3">
        <h2 className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
          2
        </h2>
        <h2 className="text-sm font-semibold text-gray-800">
          Chọn địa chỉ giao
        </h2>
      </div>

      {/* Địa chỉ */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2">
          <PiMapPinFill className="text-red-400 mt-1" />
          <div className="text-sm">
            <p>
              Giao đến <span className="font-semibold">Nguyễn Đỗ Tài</span>
            </p>
            <p className="text-gray-700">
              256 Đường Phan Huy Ích, Phường 12, Quận Gò Vấp, Thành phố Hồ Chí Minh
            </p>
          </div>
        </div>
        <button className="text-blue-600 text-sm font-medium whitespace-nowrap">
          Đổi địa chỉ
        </button>
      </div>

      {/* Siêu thị */}
      <div className="relative bg-blue-100 px-4 py-3 rounded-md text-sm text-gray-800 flex justify-between items-start">
        {/* Tam giác nhỏ bên trên */}
        <div className="absolute -top-2 left-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-100"></div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Siêu thị phục vụ bạn</p>
          <p className="font-semibold text-sm">
            Uchimart – 448 Phạm Văn Bạch, Quận Gò Vấp
          </p>
        </div>
        <button className="text-blue-600 text-sm font-medium whitespace-nowrap ml-2">
          Đổi siêu thị
        </button>
      </div>
    </div>
  );
}

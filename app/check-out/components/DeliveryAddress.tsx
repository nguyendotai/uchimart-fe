"use client";
import React from "react";

export default function DeliveryAddress() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">2. Chọn địa chỉ giao</h2>
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-medium">Giao đến Tuaneli</p>
          <p className="text-sm text-gray-600">
            341 Tổ 28 kp2, Phường Thạnh Xuân, Quận 12, TP. Hồ Chí Minh
          </p>
        </div>
        <button className="text-sm text-blue-600 font-medium">Đổi địa chỉ</button>
      </div>
      <input
        type="text"
        placeholder="Thêm hướng dẫn giao hàng cho tài xế"
        className="w-full rounded px-3 py-2 mb-3 text-sm bg-gray-100"
      />
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded flex justify-between items-center">
        <p>
          <span className="block text-xs">Siêu thị phục vụ bạn</span>
          <span className="font-semibold">UchiMart - 308 Thạnh Xuân, Quận 12</span>
        </p>
        <button className="text-sm text-green-700 font-medium">Đổi siêu thị</button>
      </div>
    </div>
  );
}

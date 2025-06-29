"use client";
import React from "react";

type Props = {
  selectedTime: string;
  onChange: (time: string) => void;
};

export default function DeliveryTime({ selectedTime, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">3. Chọn giờ giao hàng</h2>
      <select
        className="w-full border px-3 py-2 rounded bg-blue-100"
        value={selectedTime}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Chọn giờ giao</option>
        <option value="8-9">Ngày mai, 8:00 - 9:00</option>
        <option value="9-10">Ngày mai, 9:00 - 10:00</option>
        <option value="10-11">Ngày mai, 10:00 - 11:00</option>
      </select>
    </div>
  );
}

"use client";
import React from "react";
import { FaTruck } from "react-icons/fa";

interface PaymentMethodProps {
  value: "cod" | "online";
  onChange: (value: "cod" | "online") => void;
}

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  return (
    <div className="space-y-3">
  <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-teal-400">
    <input
      type="radio"
      name="payment"
      value="cod"
      checked={value === "cod"}
      onChange={() => onChange("cod")}
      className="accent-teal-500"
    />
    <FaTruck className="text-teal-500 text-lg" />
    <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
  </label>

  <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-teal-400">
  <input
    type="radio"
    name="payment"
    value="online"
    checked={value === "online"}
    onChange={() => onChange("online")}
    className="accent-teal-500"
  />
  {/* Icon VNPAY */}
  <img
    src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" // đường dẫn tới logo VNPAY
    alt="VNPAY"
    className="w-8 h-8"
  />
  <span className="font-medium">Thanh toán online (VNPAY)</span>
</label>
</div>
  );
}

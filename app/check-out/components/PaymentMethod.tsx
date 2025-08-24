"use client";
import React from "react";

interface PaymentMethodProps {
  value: "cod" | "online";
  onChange: (value: "cod" | "online") => void;
}

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={value === "cod"}
          onChange={() => onChange("cod")}
          className="accent-teal-500"
        />
        <span>Thanh toán khi nhận hàng (COD)</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="online"
          checked={value === "online"}
          onChange={() => onChange("online")}
          className="accent-teal-500"
        />
        <span>Thanh toán online</span>
      </label>
    </div>
  );
}

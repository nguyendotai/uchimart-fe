import React from "react";

type Props = {
  value: "delivery" | "pickup";
  onChange: (val: "delivery" | "pickup") => void;
};

export default function DeliveryMethod({ value, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">1. Chọn phương thức giao</h2>
      <div className="flex gap-4">
        <button
          onClick={() => onChange("delivery")}
          className={`flex-1 py-3 rounded border ${
            value === "delivery" ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
          }`}
        >
          🚚 Giao hàng
        </button>
        <button
          onClick={() => onChange("pickup")}
          className={`flex-1 py-3 rounded border ${
            value === "pickup" ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
          }`}
        >
          🚶‍♂️ Nhận tại siêu thị
        </button>
      </div>
    </div>
  );
}

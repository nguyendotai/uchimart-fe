import React from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaWalking } from "react-icons/fa";

type Props = {
  value: "delivery" | "pickup";
  onChange: (val: "delivery" | "pickup") => void;
};

export default function DeliveryMethod({ value, onChange }: Props) {
  return (
    <div className="bg-[#f3e5f5] p-4 rounded-md">
      {/* Header */}
      <div className="flex gap-2 items-center mb-3">
        <h2 className="w-6 h-6 flex items-center justify-center bg-[#c67ed1] text-white rounded-full text-sm font-semibold">
          1
        </h2>
        <h2 className="text-sm font-semibold text-gray-800">Chọn phương thức giao</h2>
      </div>

      {/* Options */}
      <div className="flex border border-blue-200 rounded-lg overflow-hidden text-sm font-medium">
        {/* Giao hàng */}
        <button
          onClick={() => onChange("delivery")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 transition-colors
            ${
              value === "delivery"
                ? "bg-blue-100 text-blue-600"
                : "bg-white text-gray-800"
            }`}
        >
          <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
            <MdDeliveryDining className="text-base" />
          </span>
          Giao hàng
        </button>

        {/* Tự đến nhận */}
        <button
          onClick={() => onChange("pickup")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 transition-colors
            ${
              value === "pickup"
                ? "bg-blue-100 text-blue-600"
                : "bg-white text-gray-800"
            }`}
        >
          <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
            <FaWalking className="text-base" />
          </span>
          Tự đến nhận
        </button>
      </div>
    </div>
  );
}

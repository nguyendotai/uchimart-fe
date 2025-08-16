import React from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaWalking } from "react-icons/fa";

type Props = {
  value: "delivery" | "pickup";
  onChange: (val: "delivery" | "pickup") => void;
};

export default function DeliveryMethod({ value, onChange }: Props) {
  return (
    <div className="bg-teal-50 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex gap-3 items-center mb-4">
        <div className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold">
          1
        </div>
        <h2 className="text-base font-semibold text-gray-900 tracking-tight">
          Chọn phương thức giao
        </h2>
      </div>

      {/* Options */}
      <div className="flex border border-teal-200 rounded-lg overflow-hidden text-sm font-medium">
        {/* Giao hàng */}
        <button
          onClick={() => onChange("delivery")}
          className={`flex flex-1 items-center justify-center gap-3 py-3 transition-all duration-200
            ${
              value === "delivery"
                ? "bg-teal-100 text-teal-700"
                : "bg-white text-gray-800 hover:bg-teal-50"
            }`}
        >
          <span className="w-6 h-6 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full">
            <MdDeliveryDining className="text-lg" />
          </span>
          Giao hàng
        </button>

        {/* Tự đến nhận */}
        <button
          onClick={() => onChange("pickup")}
          className={`flex flex-1 items-center justify-center gap-3 py-3 transition-all duration-200
            ${
              value === "pickup"
                ? "bg-teal-100 text-teal-700"
                : "bg-white text-gray-800 hover:bg-teal-50"
            }`}
        >
          <span className="w-6 h-6 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full">
            <FaWalking className="text-lg" />
          </span>
          Tự đến nhận
        </button>
      </div>
    </div>
  );
}

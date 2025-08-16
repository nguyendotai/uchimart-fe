"use client";
import React, { useState } from "react";
import VoucherModal from "./VoucherModal";

type Props = {
  selectedVoucher: string;
  onChange: (voucher: string) => void;
};

export default function VoucherSelect({ selectedVoucher, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleApply = () => {
    if (input.trim()) {
      onChange(input.trim());
      setInput("");
    }
  };

  return (
    <>
      <div className="bg-teal-50 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold">
              4
            </span>
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Chọn khuyến mãi
            </h2>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
          >
            Xem tất cả
          </button>
        </div>

        {/* Input mã */}
        <div className="flex bg-gray-100 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi của bạn tại đây"
            className="flex-1 px-4 py-3 text-sm bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-3 text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors"
            onClick={handleApply}
          >
            Áp dụng
          </button>
        </div>
      </div>

      {/* Modal chọn mã */}
      <VoucherModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(code) => {
          onChange(code);
          setOpen(false);
        }}
      />
    </>
  );
}

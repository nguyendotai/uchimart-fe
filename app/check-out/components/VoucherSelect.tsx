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
      <div className="bg-[#f3e5f5] p-4 rounded-md shadow-sm">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center bg-[#c67ed1] text-white rounded-full text-sm font-semibold">
              4
            </span>
            <h2 className="text-sm font-semibold text-gray-800">Chọn khuyến mãi</h2>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 text-sm font-medium"
          >
            Xem tất cả
          </button>
        </div>

        {/* Input mã */}
        <div className="flex bg-gray-200 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi của bạn tại đây"
            className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-800 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
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

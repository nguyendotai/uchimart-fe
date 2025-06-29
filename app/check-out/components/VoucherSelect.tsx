// components/VoucherSelect.tsx
"use client";
import React, { useState } from "react";
import VoucherModal from "./VoucherModal";

type Props = {
  selectedVoucher: string;
  onChange: (voucher: string) => void;
};

export default function VoucherSelect({ selectedVoucher, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-2">Mã giảm giá</h2>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            {selectedVoucher || "Chưa chọn"}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="text-sm text-blue-600 font-medium"
          >
            Chọn mã
          </button>
        </div>
      </div>

      <VoucherModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(code) => onChange(code)}
      />
    </>
  );
}

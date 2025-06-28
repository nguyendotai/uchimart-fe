// components/QuantityModal.tsx
"use client";
import React, { useState } from "react";
import ModalPortal from "./ModalPortal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  productName: string;
};

export default function QuantityModal({ open, onClose, onConfirm, productName }: Props) {
  const [quantity, setQuantity] = useState(1);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-2">Chọn số lượng</h2>
        <p className="text-sm text-gray-500 mb-4">Sản phẩm: {productName}</p>
        <div className="flex items-center justify-between mb-4">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center border rounded"
          />
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onConfirm(quantity);
              onClose();
            }}
            className="px-4 py-2 bg-[#921573] text-white rounded hover:bg-[#7d0f62]"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

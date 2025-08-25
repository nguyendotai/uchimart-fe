"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Voucher } from "../../types/Voucher";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
  vouchers: Voucher[];
};

export default function VoucherModal({ open, onClose, onSelect, vouchers }: Props) {
  const [tempSelected, setTempSelected] = useState<string>("");

  const handleConfirm = () => {
    if (tempSelected) {
      onSelect(tempSelected);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white w-[420px] max-h-[80vh] rounded-2xl shadow-2xl p-6 flex flex-col z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Chọn mã giảm giá
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Danh sách voucher */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-1">
              {vouchers.length > 0 ? (
                vouchers.map((voucher) => (
                  <div
                    key={voucher.code}
                    onClick={() =>
                      setTempSelected((prev) =>
                        prev === voucher.code ? "" : voucher.code
                      )
                    }
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      tempSelected === voucher.code
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{voucher.code}</p>
                    <p className="text-sm text-gray-600">{voucher.title}</p>
                    <p className="text-xs text-gray-500">
                      Hết hạn: {new Date(voucher.end_date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center mt-6">
                  Chưa có mã giảm giá nào
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={handleConfirm}
                disabled={!tempSelected}
                className={`w-full py-2 rounded-xl font-semibold text-white transition-colors ${
                  tempSelected
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Áp dụng
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-800 py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
              >
                Huỷ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

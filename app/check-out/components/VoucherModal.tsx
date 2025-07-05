"use client";
import React, { useState } from "react";
import ModalPortal from "@/app/components/ui_temp/ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

type Voucher = {
  code: string;
  description: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
};

const vouchers: Voucher[] = [
  { code: "FREESHIP", description: "Miễn phí vận chuyển" },
  { code: "DISCOUNT10", description: "Giảm 10% tổng đơn hàng" },
];

export default function VoucherModal({ open, onClose, onSelect }: Props) {
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
        <ModalPortal>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-400"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-500 w-[90%] max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Chọn mã giảm giá</h2>
            <ul className="space-y-3 max-h-[300px] overflow-y-auto">
              {vouchers.map((voucher) => (
                <li
                  key={voucher.code}
                  onClick={() =>
                    setTempSelected((prev) =>
                      prev === voucher.code ? "" : voucher.code
                    )
                  }
                  className={`p-3 border rounded cursor-pointer ${
                    tempSelected === voucher.code
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className="font-medium">{voucher.code}</p>
                  <p className="text-sm text-gray-600">{voucher.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Huỷ
              </button>
              <button
                onClick={handleConfirm}
                disabled={!tempSelected}
                className={`px-4 py-2 text-sm rounded text-white ${
                  tempSelected
                    ? "bg-[#921573] hover:opacity-90"
                    : "bg-[#ccc] cursor-not-allowed"
                }`}
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

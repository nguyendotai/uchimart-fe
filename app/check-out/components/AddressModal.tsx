"use client";
import React, { useState } from "react";
import ModalPortal from "@/app/components/ui/ModalPortal";
import { motion, AnimatePresence } from "framer-motion";
import { AddressItem } from "../../types/address";

type Props = {
  open: boolean;
  onClose: () => void;
  addresses: AddressItem[];
  onSelect: (address: AddressItem) => void;
  onRequestCreate: () => void;
};

export default function AddressModal({
  open,
  onClose,
  addresses,
  onSelect,
  onRequestCreate,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(addresses[selectedIndex]);
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
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] rounded-lg shadow-lg p-4 z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold">Chọn địa chỉ nhận hàng</h2>
              <button onClick={onClose} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>

            <p className="text-sm mb-2 text-gray-600">
              Chọn 1 địa chỉ bạn đã lưu để giao hàng
            </p>

            {/* Danh sách địa chỉ */}
            <ul className="space-y-4">
              {addresses.map((addr, idx) => (
                <li
                  key={addr.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedIndex === idx ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div className="font-semibold">
                    {addr.name} ({addr.phone})
                  </div>
                  <div className="text-gray-700">
                    {addr.address_line}, {addr.ward?.name}, {addr.district?.name},{" "}
                    {addr.province?.name}
                  </div>
                  {addr.note && (
                    <div className="text-sm text-gray-500 italic">
                      Ghi chú: {addr.note}
                    </div>
                  )}
                  {addr.is_default === 1 && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      Mặc định
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Nút tạo địa chỉ */}
            <button
              onClick={() => {
                onClose();
                onRequestCreate();
              }}
              className="w-full border text-blue-600 py-2 rounded text-sm mb-3"
            >
              + Tạo địa chỉ
            </button>

            {/* Nút xác nhận */}
            <button
              onClick={handleConfirm}
              disabled={selectedIndex === null}
              className={`w-full py-2 rounded font-semibold text-white ${
                selectedIndex !== null
                  ? "bg-blue-500 hover:opacity-90"
                  : "bg-blue-500 opacity-60 cursor-not-allowed"
              }`}
            >
              Xong
            </button>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

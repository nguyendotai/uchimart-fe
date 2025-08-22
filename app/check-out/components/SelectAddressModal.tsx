"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AddressItem } from "../../types/address";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  addresses: AddressItem[];
  onSelect: (address: AddressItem) => void;
};

export default function SelectAddressModal({
  open,
  onClose,
  addresses,
  onSelect,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(addresses[selectedIndex]);
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
            className="bg-white w-[420px] max-h-[80vh] rounded-2xl shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Chọn địa chỉ giao hàng
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Danh sách địa chỉ */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {addresses.length > 0 ? (
                addresses.map((addr, idx) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedIndex === idx
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "bg-gray-50 border-gray-200"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold text-gray-900">{addr.name}</p>
                        <p className="text-sm text-gray-600">{addr.phone}</p>
                        <p className="text-sm text-gray-700">
                          {addr.address_line}
                          {addr.ward?.name ? `, P. ${addr.ward.name}` : ""}
                          {addr.district?.name ? `, Q. ${addr.district.name}` : ""}
                          {addr.province?.name ? `, TP. ${addr.province.name}` : ""}
                        </p>
                        {addr.note && (
                          <p className="text-xs text-gray-500 italic">Ghi chú: {addr.note}</p>
                        )}
                      </div>
                      {addr.is_default === 1 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center mt-6">
                  Bạn chưa có địa chỉ nào
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={handleConfirm}
                disabled={selectedIndex === null}
                className={`w-full py-2 rounded-xl font-semibold text-white transition-colors ${selectedIndex !== null
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-blue-300 cursor-not-allowed"
                  }`}
              >
                Xác nhận
              </button>
              <button
                onClick={() => router.push("/addressBook")}
                className="w-full bg-gray-100 text-gray-800 py-2 rounded-xl hover:bg-gray-200 transition- cursor-pointer"
              >
                + Thêm địa chỉ mới
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import React, { useState } from "react";
import ModalPortal from "@/app/components/ui/ModalPortal";
import { motion, AnimatePresence } from "framer-motion";
import CreateAddressModal, { Address } from "./CreateAddressModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
  onRequestCreate: () => void;
};

export default function AddressModal({ open, onClose, onSelect, onRequestCreate }: Props) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Nguyễn Đỗ Tài",
      fullAddress:
        "256 Đường Phan Huy Ích, Phường 12, Quận Gò Vấp, TP. Hồ Chí Minh",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

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
            {addresses.map((addr, index) => (
              <div
                key={index}
                className={`border rounded p-3 mb-3 cursor-pointer ${
                  selectedIndex === index
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <p className="font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.fullAddress}</p>
              </div>
            ))}

            {/* Nút tạo địa chỉ */}
            <button
              onClick={() => {
                onClose(); // đóng modal chọn địa chỉ
                onRequestCreate(); // mở modal tạo địa chỉ
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

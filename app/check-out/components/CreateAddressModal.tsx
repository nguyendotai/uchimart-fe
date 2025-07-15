"use client";
import React, { useState } from "react";
import ModalPortal from "@/app/components/ui/ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (address: Address) => void;
};

export type Address = {
  name: string;
  fullAddress: string;
};

export default function CreateAddressModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const handleSubmit = () => {
    if (name.trim() && fullAddress.trim()) {
      onCreate({ name, fullAddress });
      onClose();
      setName("");
      setFullAddress("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <ModalPortal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] rounded-lg shadow-lg p-4 z-[70]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold">Tạo địa chỉ mới</h2>
              <button onClick={onClose} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên người nhận"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <textarea
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Địa chỉ đầy đủ"
                className="w-full border px-3 py-2 rounded text-sm"
                rows={3}
              ></textarea>
              <button
                onClick={handleSubmit}
                disabled={!name || !fullAddress}
                className={`w-full py-2 rounded font-semibold text-white ${
                  name && fullAddress
                    ? "bg-blue-500 hover:opacity-90"
                    : "bg-blue-500 opacity-60 cursor-not-allowed"
                }`}
              >
                Lưu địa chỉ
              </button>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

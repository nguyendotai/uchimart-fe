"use client";
import React from "react";
import ModalPortal from "@/app/components/UI/ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  message,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <ModalPortal>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 bg-black/10 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            className="fixed top-1/2 left-1/2 z-600 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Xác nhận hành động</h2>
            <p className="text-sm text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Huỷ
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Đồng ý
              </button>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

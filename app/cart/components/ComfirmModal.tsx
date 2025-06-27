"use client";
import React from "react";
import ModalPortal from "@/app/components/UI/ModalPortal";

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
  if (!open) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        {/* Overlay mờ, bấm ngoài để đóng */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Nội dung chính của modal */}
        <div className="relative z-10 bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 animate-fade-in">
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
        </div>
      </div>
    </ModalPortal>
  );
}

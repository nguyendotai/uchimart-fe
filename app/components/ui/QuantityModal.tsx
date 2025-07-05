"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalPortal from "./ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  productName: string;
  productImage?: string;
  productPrice?: number;
  productPromotionPrice?: number;
  productStock?: number;
};

export default function QuantityModal({
  open,
  onClose,
  onConfirm,
  productName,
  productImage,
  productPrice,
  productPromotionPrice,
  productStock,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const discountPercent =
    productPromotionPrice && productPrice
      ? Math.round(
          ((productPrice - productPromotionPrice) / productPrice) * 100
        )
      : 0;

  return (
    <AnimatePresence>
      {open && (
        <ModalPortal>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            className="fixed top-1/2 left-1/2 z-600 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6"
          >
            {/* Header */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Chọn số lượng
            </h2>

            {/* Product info */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 relative flex-shrink-0">
                {productImage && (
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-contain rounded"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-gray-800">{productName}</p>
                <div className="flex gap-2 items-center text-sm">
                  {productPromotionPrice &&
                  productPromotionPrice < productPrice! ? (
                    <>
                      <span className="text-[#FB5D08] font-medium">
                        {productPromotionPrice.toLocaleString()}đ
                      </span>
                      <del className="text-gray-400">
                        {productPrice?.toLocaleString()}đ
                      </del>
                      <span className="text-red-500 font-bold text-xs bg-red-100 px-1 rounded">
                        -{discountPercent}%
                      </span>
                    </>
                  ) : (
                    <span className="text-[#FB5D08] font-medium">
                      {productPrice?.toLocaleString()}đ
                    </span>
                  )}
                </div>
                {productStock !== undefined && (
                  <p className="text-xs text-gray-500">
                    Còn lại: {productStock}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span>Số lượng:</span>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 border rounded text-lg"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value)) setQuantity(value);
                  }}
                  className="w-14 h-8 text-center border rounded appearance-none px-1 py-0 leading-none"
                />
                <button
                  className="w-8 h-8 border rounded text-lg"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onConfirm(quantity);
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded bg-[#921573] text-white hover:bg-[#7d0f62]"
              >
                Xác nhận
              </button>
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

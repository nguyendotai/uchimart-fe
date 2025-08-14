"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setQuantityLocal,
  removeFromCartLocal,
  updateCartItemApi,
  removeItemFromCartApi,
} from "@/store/slices/cartSlice";
import type { CartItem as CartItemType } from "@/app/types/Product";
import ConfirmModal from "./ComfirmModal";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  formatCurrencyToNumber,
  formatNumberToCurrency,
} from "@/app/utils/helpers";
import type { AppDispatch } from "@/store/index";

type Props = {
  item: CartItemType;
  checked: boolean;
  onItemClick: () => void;
};

export default function CartItem({ item, checked, onItemClick }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localQuantity, setLocalQuantity] = useState<number>(
    item.quantity || 1
  );

  // Sync localQuantity khi item thay đổi (Redux store update)
  useEffect(() => {
    setLocalQuantity(item.quantity || 1);
  }, [item.quantity]);

  // Kiểm tra login
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const title = item.inventory?.title ?? item.title ?? "Sản phẩm"; // fallback
  const image = item.image || item.inventory?.image || "/default.png";

  const salePrice = Number(
    formatCurrencyToNumber(item.sale_price ?? item.inventory?.sale_price ?? "0")
  );
  const offerPrice = Number(
    formatCurrencyToNumber(
      item.offer_price ?? item.inventory?.offer_price ?? "0"
    )
  );

  const hasDiscount = offerPrice > 0 && offerPrice < salePrice;
  const finalPrice = hasDiscount ? offerPrice : salePrice;
  const safeQuantity = Number(localQuantity ?? 1);
  const discount = hasDiscount
    ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
    : 0;
  const totalPrice = isNaN(finalPrice * safeQuantity)
    ? 0
    : finalPrice * safeQuantity;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (isLoggedIn) {
      dispatch(removeItemFromCartApi(item.id));
    } else {
      dispatch(removeFromCartLocal(item.id));
    }
    setShowConfirm(false);
  };

  const changeQuantity = (newQuantity: number) => {
    const stockQuantity =
      item.inventory?.stock_quantity ?? Number.MAX_SAFE_INTEGER; // cho phép cộng/trừ thoải mái nếu không có stock

    if (newQuantity < 1 || newQuantity > stockQuantity) return;

    // 1️⃣ Cập nhật UI ngay
    setLocalQuantity(newQuantity);

    // 2️⃣ Cập nhật Redux local
    if (!isLoggedIn) {
      dispatch(setQuantityLocal({ id: item.id, quantity: newQuantity }));
    } else {
      // 3️⃣ Gọi API
      dispatch(updateCartItemApi({ id: item.id, quantity: newQuantity }))
        .unwrap()
        .catch(() => {
          // Rollback nếu API lỗi
          setLocalQuantity(item.quantity);
        });
    }
  };

  return (
    <>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa "${item.inventory?.title}" khỏi giỏ hàng?`}
      />

      <div
        className="flex items-start gap-3 p-3 rounded shadow hover:shadow-md bg-white"
        onClick={onItemClick}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="mt-2"
        />

        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={image ?? ""}
            alt={title ?? ""}
            fill
            className="object-contain"
          />
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded-br">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <div className="font-medium text-sm">{title}</div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#FB5D08] font-semibold text-sm">
              {formatNumberToCurrency(totalPrice)}₫
            </span>
            {hasDiscount && (
              <del className="text-xs text-gray-400">
                {formatNumberToCurrency(salePrice)}₫
              </del>
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity - 1);
                }}
                className="border px-2 rounded"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={item.inventory?.stock_quantity ?? 0}
                value={localQuantity}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) changeQuantity(value);
                }}
                className="w-12 text-center border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity + 1);
                }}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-right text-gray-700">
                {formatNumberToCurrency(totalPrice)}₫
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-lg"
                onClick={handleDeleteClick}
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

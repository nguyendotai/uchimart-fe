"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  removeFromCartLocal,
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
  onQuantityChange?: (quantity: number) => void;
};

export default function CartItem({
  item,
  checked,
  onItemClick,
  onQuantityChange,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localQuantity, setLocalQuantity] = useState<number>(
    item.quantity || 1
  );

  useEffect(() => {
    setLocalQuantity(item.quantity || 1);
  }, [item.quantity]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const title = item.inventory?.title ?? item.title ?? "Sản phẩm";
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

  const stockQuantity = item.inventory?.stock_quantity ?? 0;
  const isOutOfStock = stockQuantity <= 0; // ✅ kiểm tra hết hàng

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
    if (isOutOfStock) return; // ✅ không cho thay đổi nếu hết hàng
    if (newQuantity < 1 || newQuantity > stockQuantity) return;
    setLocalQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  return (
    <>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa "${item.inventory?.title}" khỏi giỏ hàng?`}
      />

      {/* Wrapper giỏ hàng */}
      <div
        className={`flex items-center gap-4 p-4 hover:shadow-lg bg-white transition-shadow duration-300 ${
          isOutOfStock ? "opacity-50" : ""
        }`}
        onClick={!isOutOfStock ? onItemClick : undefined}
        style={{ cursor: isOutOfStock ? "not-allowed" : "pointer" }} // 🚫 hiện hình cấm khi hết hàng
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          disabled={isOutOfStock} // ✅ disable checkbox nếu hết hàng
          onChange={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400"
        />

        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
          <Image
            src={image ?? ""}
            alt={title ?? ""}
            fill
            className="object-contain p-2"
          />
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-br-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-orange-600 font-bold text-lg">
              {formatNumberToCurrency(totalPrice)}₫
            </span>
            {hasDiscount && (
              <del className="text-sm text-gray-400">
                {formatNumberToCurrency(salePrice)}₫
              </del>
            )}
          </div>

          {/* Quantity and Delete Controls */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl shadow-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity - 1);
                }}
                disabled={isOutOfStock || localQuantity <= 1} // ✅ disable khi hết hàng
                className="w-9 h-9 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={stockQuantity}
                value={localQuantity}
                disabled={isOutOfStock} // ✅ disable input nếu hết hàng
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) changeQuantity(value);
                }}
                className="w-14 h-9 text-center bg-white border border-gray-200 rounded-lg disabled:bg-gray-100"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity + 1);
                }}
                disabled={isOutOfStock || localQuantity >= stockQuantity} // ✅ disable khi hết hàng
                className="w-9 h-9 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            {/* Delete Button (luôn hoạt động) */}
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold text-gray-700">
                {formatNumberToCurrency(totalPrice)}₫
              </span>
              <button
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                onClick={handleDeleteClick}
              >
                <FaRegTrashCan className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

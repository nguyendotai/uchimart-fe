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
  const [localQuantity, setLocalQuantity] = useState<number>(item.quantity || 1);

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
    formatCurrencyToNumber(item.offer_price ?? item.inventory?.offer_price ?? "0")
  );
  const hasDiscount = offerPrice > 0 && offerPrice < salePrice;
  const finalPrice = hasDiscount ? offerPrice : salePrice;
  const safeQuantity = Number(localQuantity ?? 1);
  const discount = hasDiscount
    ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
    : 0;
  const totalPrice = isNaN(finalPrice * safeQuantity) ? 0 : finalPrice * safeQuantity;

  const stockQuantity = item.inventory?.stock_quantity ?? 0;
  const isOutOfStock = stockQuantity <= 0;

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
    if (isOutOfStock) return;
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

      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
          isOutOfStock ? "opacity-50" : ""
        }`}
        onClick={!isOutOfStock ? onItemClick : undefined}
        style={{ cursor: isOutOfStock ? "not-allowed" : "pointer" }}
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          disabled={isOutOfStock}
          onChange={(e) => e.stopPropagation()}
          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-400 mt-1 sm:mt-0"
        />

        {/* Product Image */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
          <Image src={image} alt={title} fill className="object-contain p-1 sm:p-2" />
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-br-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 gap-1 sm:gap-2 w-full">
          <h3 className="font-semibold text-sm sm:text-lg text-gray-800 line-clamp-2">
            {title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-orange-600 font-bold text-base sm:text-lg">
              {formatNumberToCurrency(totalPrice)}₫
            </span>
            {hasDiscount && (
              <del className="text-xs sm:text-sm text-gray-400">
                {formatNumberToCurrency(salePrice)}₫
              </del>
            )}
          </div>

          {/* Quantity & Delete */}
          <div className="flex flex-row justify-between items-center mt-2 sm:mt-3 w-full gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 p-1 rounded-lg shadow-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity - 1);
                }}
                disabled={isOutOfStock || localQuantity <= 1}
                className="w-7 h-7 sm:w-9 sm:h-9 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={stockQuantity}
                value={localQuantity}
                disabled={isOutOfStock}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) changeQuantity(value);
                }}
                className="w-10 sm:w-14 h-7 sm:h-9 text-center bg-white border border-gray-200 rounded-lg disabled:bg-gray-100 text-sm sm:text-base"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  changeQuantity(localQuantity + 1);
                }}
                disabled={isOutOfStock || localQuantity >= stockQuantity}
                className="w-7 h-7 sm:w-9 sm:h-9 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                {formatNumberToCurrency(totalPrice)}₫
              </span>
              <button
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                onClick={handleDeleteClick}
              >
                <FaRegTrashCan className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
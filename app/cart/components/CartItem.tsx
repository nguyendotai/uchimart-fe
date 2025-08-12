"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
} from "@/store/slices/cartSlice";
import type { CartItem as CartItemType } from "@/app/types/Product";
import ConfirmModal from "./ComfirmModal";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  formatCurrencyToNumber,
  formatNumberToCurrency,
} from "@/app/utils/helpers";

type Props = {
  item: CartItemType;
  checked: boolean;
  onItemClick: () => void;
};

export default function CartItem({ item, checked, onItemClick }: Props) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const salePrice = formatCurrencyToNumber(item.sale_price);
  const offerPrice = formatCurrencyToNumber(item.offer_price ?? "0");

  const hasDiscount = offerPrice > 0 && offerPrice < salePrice;
  const finalPrice = hasDiscount ? offerPrice : salePrice;
  const discount = hasDiscount
    ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
    : 0;

  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = () => {
    dispatch(removeFromCart(item.id));
    setShowConfirm(false);
  };

  return (
    <>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa "${item.title}" khỏi giỏ hàng?`}
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
            src={item.image}
            alt={item.title}
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
          <div className="font-medium text-sm">{item.title}</div>
          <div className="text-xs text-gray-500">Đã bán {item.sold_count}</div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#FB5D08] font-semibold text-sm">
              {formatNumberToCurrency(finalPrice)}₫
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
                  if (item.cartQuantity > 1) {
                    dispatch(decreaseQuantity(item.id));
                  }
                }}
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={item.stock_quantity}
                value={item.cartQuantity}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (
                    !isNaN(value) &&
                    value >= 1 &&
                    value <= item.stock_quantity
                  ) {
                    dispatch(setQuantity({ id: item.id, quantity: value }));
                  }
                }}
                className="w-12 text-center border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.cartQuantity < item.stock_quantity) {
                    dispatch(increaseQuantity(item.id));
                  }
                }}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-right text-gray-700">
                {formatNumberToCurrency(finalPrice * item.cartQuantity)}₫
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
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

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/slices/cartSlice";
import { Product } from "@/app/types/Product";
import ConfirmModal from "./ComfirmModal";
import { FaRegTrashCan } from "react-icons/fa6";

type Props = {
  item: Product & { cartQuantity: number };
  checked: boolean;
  onItemClick: () => void;
};

export default function CartItem({ item, checked, onItemClick }: Props) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const price = item.promotion_price ?? item.price;
  const originalPrice = item.promotion_price ? item.price : null;
  const discount = item.promotion_price
    ? Math.round(((item.price - item.promotion_price) / item.price) * 100)
    : 0;

  const handleDelete = () => {
    setShowConfirm(true);
  };

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
        message={`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`}
      />

      <tr
        className="border-b border-b-gray-300 hover:bg-gray-50 cursor-pointer"
        onClick={onItemClick}
      >
        <td className="p-3 text-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
        <td className="p-3 flex gap-3 items-center">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-full px-1">
                -{discount}%
              </span>
            )}
          </div>
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500">Đã bán {item.quantity}</div>
          </div>
        </td>
        <td className="p-3 text-right">
          <div className="text-[#FB5D08] font-medium">
            {price.toLocaleString()}đ
          </div>
          {originalPrice && (
            <del className="text-gray-400 text-xs">
              {originalPrice.toLocaleString()}đ
            </del>
          )}
        </td>
        <td className="p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              className="w-6 h-6 border rounded"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(decreaseQuantity(item.id));
              }}
            >
              -
            </button>
            <input
              type="text"
              value={item.cartQuantity}
              readOnly
              className="w-10 text-center border rounded"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="w-6 h-6 border rounded"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(increaseQuantity(item.id));
              }}
            >
              +
            </button>
          </div>
        </td>
        <td className="p-3 text-right font-medium">
          {(price * item.cartQuantity).toLocaleString()}đ
        </td>
        <td className="p-3 text-center">
          <button
            className="text-red-400 hover:underline text-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <FaRegTrashCan />
          </button>
        </td>
      </tr>
    </>
  );
}

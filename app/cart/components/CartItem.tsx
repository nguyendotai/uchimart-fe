"use client";
import React from "react";
import { useState } from "react";
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
  onItemClick: () => void; // thêm dòng này
};

export default function CartItem({
  item,
  checked,
  onItemClick,
}: Props) {
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
      {/* Modal xác nhận xoá */}
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`}
      />

      {/* Thẻ sản phẩm */}
      <div
        className="bg-white shadow rounded p-4 mt-4 flex gap-4"
        onClick={onItemClick}
      >
        {/* Checkbox + Ảnh */}
        <div className="flex gap-4">
          <input
            type="checkbox"
            className="mt-12"
            checked={checked}
            onChange={(e) => e.stopPropagation()} // chặn lan sự kiện
            onClick={(e) => e.stopPropagation()} // chặn click checkbox khỏi trigger chọn
          />
          <div className="relative w-28 h-28">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex-1">
          <div className="font-semibold text-sm mb-1">{item.name}</div>
          <div className="flex items-center gap-4 text-sm font-medium mb-1">
            <span className="text-[#FB5D08]">{price.toLocaleString()}đ</span>
            {originalPrice && (
              <del className="text-gray-400 text-sm">
                {originalPrice.toLocaleString()}đ
              </del>
            )}
          </div>

          <div className="text-yellow-400 text-sm">★★★★★</div>
          <div className="text-xs text-gray-500">Đã bán {item.quantity}</div>

          <div className="flex items-center gap-3 mt-2">
            <button
              className="w-7 h-7 border rounded text-lg"
              onClick={(e) => {
                e.stopPropagation(); // chặn lan sự kiện
                dispatch(decreaseQuantity(item.id));
              }}
            >
              -
            </button>
            <input
              type="text"
              value={item.cartQuantity}
              readOnly
              className="w-10 h-7 text-center border rounded"
              onClick={(e) => e.stopPropagation()} // ngăn click chọn item
            />
            <button
              className="w-7 h-7 border rounded text-lg"
              onClick={(e) => {
                e.stopPropagation(); // chặn lan sự kiện
                dispatch(increaseQuantity(item.id));
              }}
            >
              +
            </button>
            <button
              className="ml-auto text-lg text-red-400 hover:underline"
              onClick={(e) => {
                e.stopPropagation(); // chặn lan sự kiện
                handleDelete();
              }}
            >
              <FaRegTrashCan></FaRegTrashCan>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

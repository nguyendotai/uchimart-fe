"use client";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart } from "@/store/slices/cartSlice";
import CartItem from "./CartItem";
import ConfirmModal from "./ComfirmModal";

interface Props {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CartList({ selectedIds, setSelectedIds }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(cartItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = () => {
    setShowConfirm(true); // mở modal xác nhận
  };

  const confirmDelete = () => {
    selectedIds.forEach((id) => dispatch(removeFromCart(id)));
    setSelectedIds([]);
    setShowConfirm(false);
  };

  if (cartItems.length === 0)
    return <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>;

  return (
    <>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} sản phẩm đã chọn khỏi giỏ hàng?`}
      />
      <div className="flex items-center justify-between pb-2 mb-4 text-sm text-gray-500 p-2 bg-white shadow rounded">
        <div className="flex items-center gap-2">
          <input
            id="selectAll"
            type="checkbox"
            checked={selectedIds.length === cartItems.length}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAll" className="cursor-pointer">
            Chọn tất cả
          </label>
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={handleRemoveSelected}
            className="text-red-400 hover:underline"
          >
            Xóa ({selectedIds.length})
          </button>
        )}
      </div>

      <hr className="mb-4 text-gray-300" />

      {/* Danh sách sản phẩm */}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          checked={selectedIds.includes(item.id)}
          onItemClick={() => toggleSelect(item.id)} // dùng click toàn vùng
        />
      ))}
    </>
  );
}

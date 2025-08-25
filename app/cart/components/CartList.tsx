"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  setQuantityLocal,
  updateCartItemApi,
  removeFromCartLocal,
  removeItemFromCartApi,
  fetchCartFromApi,
} from "@/store/slices/cartSlice";
import CartItem from "./CartItem";
import ConfirmModal from "./ComfirmModal";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";

interface Props {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CartList({ selectedIds, setSelectedIds }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingQuantities, setPendingQuantities] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) dispatch(fetchCartFromApi());
  }, [dispatch]);

  useEffect(() => {
    const quantities: Record<number, number> = {};
    cartItems.forEach((item) => {
      quantities[item.id] = item.quantity || 1;
    });
    setPendingQuantities(quantities);
  }, [cartItems]);

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

  const handleQuantityChange = (id: number, quantity: number) => {
    setPendingQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleUpdateAll = async () => {
    const updates = Object.entries(pendingQuantities).filter(([id, qty]) => {
      const item = cartItems.find((i) => i.id === Number(id));
      return item && item.quantity !== qty;
    });

    if (updates.length === 0) {
      toast.info("Không có sản phẩm nào cần cập nhật");
      return;
    }

    try {
      for (const [id, qty] of updates) {
        const itemId = Number(id);
        if (isLoggedIn) {
          await dispatch(updateCartItemApi({ id: itemId, quantity: qty })).unwrap();
        } else {
          dispatch(setQuantityLocal({ id: itemId, quantity: qty }));
        }
      }
      toast.success("Cập nhật tất cả sản phẩm thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại, vui lòng thử lại");
    }
  };

  const handleRemoveSelected = () => setShowConfirm(true);

  const confirmDelete = () => {
    if (isLoggedIn) {
      selectedIds.forEach((id) => dispatch(removeItemFromCartApi(id)));
    } else {
      selectedIds.forEach((id) => dispatch(removeFromCartLocal(id)));
    }
    setSelectedIds([]);
    setShowConfirm(false);
  };

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <img
          src="/img/shopping-cart-77.png"
          alt="Giỏ hàng trống"
          className="w-64 h-64 object-contain"
        />
        <p className="mt-6 text-gray-600 text-lg font-medium">
          Giỏ hàng của bạn đang trống
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-6 py-2 rounded-lg bg-[#921573] text-white hover:bg-[#7a125f] transition-colors"
        >
          Mua sắm ngay
        </button>
      </div>
    );

  return (
    <>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} sản phẩm đã chọn khỏi giỏ hàng?`}
      />

      <div className="bg-white shadow-sm rounded-lg mb-6 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <input
            id="selectAll"
            type="checkbox"
            checked={selectedIds.length === cartItems.length}
            onChange={handleSelectAll}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400"
          />
          <label htmlFor="selectAll" className="cursor-pointer font-medium">
            Chọn tất cả
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          {selectedIds.length > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <FaRegTrashCan className="w-4 h-4" />
              Xóa ({selectedIds.length})
            </button>
          )}
          <button
            onClick={handleUpdateAll}
            className="text-white px-4 py-2 rounded-lg bg-[#921573] hover:bg-[#7a125f] focus:outline-none focus:ring-2 focus:ring-[#921573] focus:ring-opacity-50 transition-all duration-200"
          >
            Cập nhật số lượng
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              ...item,
              quantity: pendingQuantities[item.id] ?? item.quantity,
            }}
            checked={selectedIds.includes(item.id)}
            onItemClick={() => toggleSelect(item.id)}
            onQuantityChange={(qty: number) => handleQuantityChange(item.id, qty)}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Inventory, Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";
import { IoShareSocialSharp } from "react-icons/io5";
import ProductVariants from "./ProductVariants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addToCart } from "@/store/slices/cartSlice";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

type Props = {
  inventory: Inventory;
  product: Product;
  brand?: Brand;
  allInventories: Inventory[]; // 
  onSelect: (variant: Inventory) => void; 
  onNotify?: () => void;
};

const BuyBox = ({
  inventory,
  brand,
  allInventories,
  onSelect,
  onNotify,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const salePrice = formatCurrencyToNumber(inventory.sale_price);
  const offerPrice = formatCurrencyToNumber(inventory.offer_price ?? "0");
  const hasSale = offerPrice > 0 && offerPrice < salePrice;

  const onDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const onIncrease = () => {
    setQuantity((prev) => {
      if (
        inventory.stock_quantity !== undefined &&
        prev >= inventory.stock_quantity
      ) {
        return prev;
      }
      return prev + 1;
    });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...inventory, cartQuantity: quantity }));
    onNotify?.();
  };

  const handleShare = async () => { 
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép đường dẫn!");
    } catch (err) {
      toast.error("Không thể sao chép. Trình duyệt không hỗ trợ.");
    }
  };

  return (
    <div className=" bg-white p-4 rounded-xl shadow sticky top-2 self-start">
      {brand && (
        <div className="mb-1.5 flex items-center gap-2 w-full">
          <span className="text-gray-600">Thương hiệu:</span>
          <span className="text-[#327FF6]">{brand.name}</span>
        </div>
      )}

      <div className="flex justify-between">
        <h3 className="w-[90%] text-xl font-semibold">{inventory.title}</h3>
        <button
          onClick={handleShare}
          className="flex justify-center items-center w-[10%] border border-gray-400 rounded text-gray-500 text-2xl hover:bg-gray-100 transition"
          title="Sao chép đường dẫn"
        >
          <IoShareSocialSharp />
        </button>
      </div>

      <div className="flex gap-2 items-center pb-2 mb-2 border-b border-b-gray-400">
        <div className="text-xl font-bold text-red-500">
          {((hasSale ? offerPrice : salePrice) * quantity).toLocaleString()}đ
          {hasSale && (
            <span className="text-gray-400 line-through ml-2 text-sm font-normal">
              {(salePrice * quantity).toLocaleString()}đ
            </span>
          )}
        </div>
        {hasSale && (
          <div className="text-green-600 font-medium">
            Tiết kiệm {Math.round(((salePrice - offerPrice) * quantity) / 1000)}
            K
          </div>
        )}
      </div>

      {/* ✅ Biến thể */}
      <ProductVariants
        currentInventory={inventory}
        allInventories={allInventories}
        onSelect={onSelect}
      />

      {/* ✅ Số lượng */}
      <div className="mb-4 w-full">
        <p className="font-medium mb-2">Số Lượng</p>
        <div className="flex border border-blue-400 rounded-full h-10 overflow-hidden w-full">
          <button
            onClick={onDecrease}
            className="text-blue-500 text-xl border-r border-blue-400 w-[15%]"
          >
            –
          </button>
          <div className="flex-1 flex items-center justify-center text-blue-500 text-lg font-medium w-[70%]">
            {quantity}
          </div>
          <button
            onClick={onIncrease}
            className="text-blue-500 text-xl border-l border-blue-400 w-[15%]"
          >
            +
          </button>
        </div>
        {quantity >= inventory.stock_quantity && (
          <p className="text-sm text-red-500 mt-1">
            Đã đạt số lượng tối đa trong kho
          </p>
        )}
      </div>

      {/* ✅ Tạm tính */}
      <div className="mb-4">
        <p className="font-medium">Tạm tính</p>
        <span className="text-lg font-bold text-[#921573]">
          {((hasSale ? offerPrice : salePrice) * quantity).toLocaleString()}đ
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className="text-[#0e9d1a] border px-6 py-2 rounded hover:bg-[#0e9d1a] hover:text-white transition w-full"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default BuyBox;

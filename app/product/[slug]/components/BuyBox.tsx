"use client";

import React, { useState } from "react";
import Link from "next/link"; // ✅ thêm Link
import { Inventory, Product, CartItem } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";
import { IoShareSocialSharp } from "react-icons/io5";
import ProductVariants from "./ProductVariants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartLocal, addToCartApi } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { AppDispatch } from "@/store";

type Props = {
  inventory: Inventory;
  product: Product;
  brand?: Brand;
  allInventories: Inventory[];
  onSelect: (variant: Inventory) => void;
};

const BuyBox = ({ inventory, brand, allInventories, onSelect }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = useState(1);

  const salePrice = formatCurrencyToNumber(inventory.sale_price);
  const offerPrice = formatCurrencyToNumber(inventory.offer_price ?? "0");
  const hasSale = offerPrice > 0 && offerPrice < salePrice;

  const cartItem = cartItems.find((item) => item.id === inventory.id);
  const currentCartQuantity = cartItem?.quantity || 0;

  const onDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const onIncrease = () => {
    setQuantity((prev) =>
      inventory.stock_quantity !== undefined &&
      prev + currentCartQuantity >= inventory.stock_quantity
        ? prev
        : prev + 1
    );
  };

  const handleAddToCart = async () => {
    const isLoggedIn = !!localStorage.getItem("token");

    try {
      if (isLoggedIn) {
        await dispatch(
          addToCartApi({
            inventory_id: inventory.id,
            quantity,
          })
        ).unwrap();
        toast.success("Đã thêm vào giỏ hàng!");
      } else {
        const selectedItem: CartItem = {
          id: inventory.id,
          inventory_id: inventory.id,
          quantity,
          sale_price: inventory.sale_price ?? "0₫",
          offer_price: inventory.offer_price ?? null,
          image: inventory.image ?? "",
          title: inventory.title ?? "",
          total_price:
            quantity *
            formatCurrencyToNumber(
              inventory.offer_price ?? inventory.sale_price
            ),
          inventory: {
            ...inventory,
            sale_price: inventory.sale_price ?? "0₫",
            offer_price: inventory.offer_price ?? null,
            stock_quantity: inventory.stock_quantity ?? 0,
            title: inventory.title ?? "",
            image: inventory.image ?? "",
          },
        };
        dispatch(addToCartLocal(selectedItem));
        toast.success("Đã thêm vào giỏ hàng!");
      }
    } catch {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ!");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép đường dẫn!");
    } catch {
      toast.error("Không thể sao chép. Trình duyệt không hỗ trợ.");
    }
  };

  const isOutOfStock = inventory.stock_quantity === 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow sticky top-2 self-start">
      <div className="flex justify-between mb-2">
        <div className="w-[90%] ">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-gray-400">Thương hiệu:</p>
            {brand && (
              <Link
                href={`/brand/${brand.slug}`} // ✅ link sang brandpage
                className="text-sm text-[#327FF6] font-medium block hover:underline"
              >
                {brand.name}
              </Link>
            )}
          </div>

          <h3 className="text-xl font-semibold">{inventory.title}</h3>
        </div>

        <button
          onClick={handleShare}
          className="flex justify-center items-center w-[10%] rounded text-gray-500 text-2xl hover:text-blue-500"
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

      <ProductVariants
        currentInventory={inventory}
        allInventories={allInventories}
        onSelect={onSelect}
      />

      <div className="mb-4 w-full">
        <p className="font-medium mb-4">Số Lượng</p>
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
        {currentCartQuantity + quantity >= inventory.stock_quantity && (
          <p className="text-sm text-red-500 mt-1">
            Đã đạt số lượng tối đa trong kho
          </p>
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium">Tạm tính</p>
        <span className="text-lg font-bold text-[#921573]">
          {((hasSale ? offerPrice : salePrice) * quantity).toLocaleString()}đ
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        title={isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
        className={`border px-6 py-2 rounded transition w-full
    ${
      isOutOfStock
        ? " text-[#bbf1bf] cursor-not-allowed"
        : "text-[#0e9d1a] border-[#0e9d1a] hover:bg-[#0e9d1a] hover:text-white"
    }`}
      >
        {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
      </button>
    </div>
  );
};

export default BuyBox;

"use client";
import React, { useState } from "react";
import { Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";
import { IoShareSocialSharp } from "react-icons/io5";
import ProductVariants from "./ProductVariants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/store/slices/cartSlice";

type Props = {
  product: Product;
  brand?: Brand;
  allProducts: Product[];
  onSelect: (product: Product) => void;
  onNotify?: () => void;
};

const BuyBox = ({ product, brand, allProducts, onSelect, onNotify }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const onDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const onIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, cartQuantity: quantity }));
    onNotify?.();
  };

  const handleBuyNow = () => {
    const selectedItem = {
      ...product,
      cartQuantity: quantity,
    };

    // ✅ Lưu trực tiếp sản phẩm vào localStorage
    localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));

    // ✅ Chuyển sang trang thanh toán
    router.push("/check-out");
  };

  const hasSale =
    product.price !== undefined && product.price > product.promotion_price;

  return (
    <div className="w-[40%] bg-white p-4 rounded-xl shadow sticky top-2 self-start">
      {/* Brand */}
      {brand && (
        <div className="mb-1.5 flex items-center gap-2 w-full">
          <span className="text-gray-600">Thương hiệu:</span>
          <span className="text-[#327FF6]">{brand.name}</span>
        </div>
      )}

      {/* Name + Share */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <div className="p-2 border border-gray-400 rounded text-gray-500 text-2xl">
          <IoShareSocialSharp />
        </div>
      </div>

      {/* Price */}
      <div className="flex gap-2 items-center pb-2 mb-2 border-b border-b-gray-400">
        <div className="text-xl font-bold text-red-500">
          {(product.promotion_price * quantity).toLocaleString()}đ{" "}
          {hasSale && (
            <span className="text-gray-400 line-through ml-2 text-sm font-normal">
              {(product.price * quantity).toLocaleString()}đ
            </span>
          )}
        </div>

        {hasSale && (
          <div className="text-green-600 font-medium ">
            Tiết kiệm{" "}
            {Math.round((product.price - product.promotion_price) / 1000)}K
          </div>
        )}
      </div>

      <ProductVariants
        currentProduct={product}
        allProducts={allProducts}
        onSelect={onSelect}
      />

      {/* Quantity */}
      <div className="mb-4 w-full">
        <p className="font-medium mb-2">Số Lượng</p>
        <div className="flex border border-blue-400 rounded-full h-10 overflow-hidden w-full">
          <button
            onClick={onDecrease}
            className="flex-2 text-blue-500 text-xl border-r border-blue-400 w-[15%]"
          >
            –
          </button>
          <div className="flex-6 flex items-center justify-center text-blue-500 text-lg font-medium w-[70%]">
            {quantity}
          </div>
          <button
            onClick={onIncrease}
            className="flex-2 text-blue-500 text-xl border-l border-blue-400 w-[15%]"
          >
            +
          </button>
        </div>
      </div>

      {/* Provisional */}
      <div className="mb-4">
        <p className="font-medium">Tạm tính</p>
        <span className="text-lg font-bold text-[#921573]">
          {(product.promotion_price * quantity).toLocaleString()}đ
        </span>
      </div>

      <button
        onClick={handleBuyNow}
        className="bg-[#4DCB44] text-white px-6 py-2 rounded hover:bg-green-600 transition w-full mb-2"
      >
        Mua ngay
      </button>
      <button
        onClick={handleAddToCart}
        className="text-[#1C78D9] border px-6 py-2 rounded hover:bg-[#1C78D9] hover:text-white transition w-full"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default BuyBox;

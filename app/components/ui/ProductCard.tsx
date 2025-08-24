"use client";
import React, { useState } from "react";
import { MdOutlineAddShoppingCart, MdEventAvailable } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import QuantityModal from "./QuantityModal";
import type { Inventory, CartItem } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { addToCartLocal, addToCartApi } from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store";

const ProductCard = ({ product }: { product: Inventory }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const salePrice = formatCurrencyToNumber(product.sale_price);
  const offerPrice = formatCurrencyToNumber(product.offer_price ?? "0");
  const hasSale = offerPrice > 0 && offerPrice < salePrice;
  const discount = hasSale
    ? Math.round(((salePrice - offerPrice) / salePrice) * 100)
    : 0;

  const handleConfirm = async (quantity: number) => {
    try {
      if (isLoggedIn) {
        await dispatch(
          addToCartApi({
            inventory_id: product.id,
            quantity,
          })
        ).unwrap();
      } else {
        const selectedItem: CartItem = {
          id: product.id,
          inventory_id: product.id,
          quantity,
          sale_price: product.sale_price ?? "0₫",
          offer_price: product.offer_price ?? null,
          image: product.image ?? "",
          title: product.title ?? "",
          total_price:
            quantity *
            formatCurrencyToNumber(product.offer_price ?? product.sale_price),
          inventory: product,
        };
        dispatch(addToCartLocal(selectedItem));
      }
      toast.success("Đã thêm vào giỏ hàng ");
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ!");
    }

    setShowModal(false);
  };

  return (
    <div className="relative group w-full max-w-[200px] mx-auto">
      <QuantityModal
        key="modal"
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        productName={product.title}
        productImage={product.image}
        productPrice={salePrice}
        productPromotionPrice={hasSale ? offerPrice : undefined}
        productStock={product.stock_quantity}
      />

      {hasSale && (
        <div className="absolute top-[-8px] left-[-8px] z-10">
          <div className="w-[70px] h-5 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-tl-md rounded-br-md shadow">
            GIẢM {discount}%
          </div>
        </div>
      )}

      <Link
        href={`/product/${product.slug}`}
        className="w-full h-[120px] sm:h-[150px] bg-white flex items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image || "/fallback.jpg"}
          alt={product.title}
          width={200}
          height={200}
          className="w-[85%] h-[85%] object-contain rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
          unoptimized
        />
      </Link>

      <div className="flex justify-center py-1 px-1">
        <button
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center text-sm rounded-full px-2 
               py-1 sm:py-2 w-full 
               bg-white border border-[#921573] text-[#921573] 
               hover:bg-[#921573] hover:text-white transition"
        >
          {/* Desktop: Thêm vào giỏ hàng */}
          <span className="hidden sm:inline">Thêm vào giỏ</span>
          {/* Mobile: Mua rồi */}
          <span className="sm:hidden">Mua ngay</span>
          <MdOutlineAddShoppingCart size={16} className="ml-3" />
        </button>
      </div>

      <div className="mt-2 px-1">
        <Link
          href={`/product/${product.slug}`}
          className="block text-sm sm:text-[14px] font-normal line-clamp-2 h-[38px] overflow-hidden"
        >
          {product.title}
        </Link>

        <div className="text-sm sm:text-base mt-1">
          {hasSale ? (
            <>
              <span className="text-[#FB5D08] font-medium">
                {offerPrice.toLocaleString()}đ
              </span>
              <del className="text-[#999999] text-xs sm:text-sm ml-2">
                {salePrice.toLocaleString()}đ
              </del>
            </>
          ) : (
            <span className="text-[#FB5D08] font-medium">
              {salePrice.toLocaleString()}đ
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mt-1 gap-x-2">
          <div className="flex items-center gap-1">
            <MdEventAvailable
              size={14}
              className={
                discount > 50
                  ? "text-[#921573]" // nếu giảm giá > 50% thì màu tím
                  : product.stock_quantity === 0
                  ? "text-red-500"
                  : product.stock_quantity <= 20
                  ? "text-orange-500"
                  : "text-[#26AA99]"
              }
            />

            <span
              className={
                discount > 50
                  ? "text-[#921573]"
                  : product.stock_quantity === 0
                  ? "text-red-500"
                  : product.stock_quantity <= 20
                  ? "text-orange-500"
                  : "text-[#26AA99]"
              }
            >
              {product.stock_quantity === 0
                ? "Hết hàng"
                : product.stock_quantity <= 20
                ? "Sắp hết"
                : "Còn hàng"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <GoDotFill className="text-[8px]" />
            <span>Đã bán {product.sold_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

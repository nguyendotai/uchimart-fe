"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Product, CartItem } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import QuantityModal from "./QuantityModal";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"addToCart" | "buyNow" | null>(
    null
  );

  const hasSale =
    product.promotion_price !== undefined &&
    product.promotion_price < product.price;

  const discount = hasSale
    ? Math.round(
        ((product.price - product.promotion_price!) / product.price) * 100
      )
    : 0;

  const handleConfirm = (quantity: number) => {
    dispatch(addToCart({ ...product, cartQuantity: quantity }));
    if (actionType === "buyNow") {
      router.push("/checkout"); // hoặc đường dẫn phù hợp với bạn
    }
  };

  return (
    <div className="relative group">
      {/* Modal */}
      <QuantityModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        productName={product.name}
      />
      {/* sale */}
      {hasSale && (
        <div className="absolute top-0 left-[-8px] z-10 overflow-hidden">
          <div className="w-[80px] h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-tr-md rounded-br-md shadow-md">
            GIẢM -{discount}%
          </div>
        </div>
      )}

      {/* Ảnh */}
      <Link
        href={`/product/${product.slug}`}
        className="w-full h-[230px] bg-white flex items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={230}
          height={230}
          className="w-full h-full object-contain rounded max-w-[230px] max-h-[230px] transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Button */}
      <div className="flex justify-between gap-2 py-1">
        <button
          onClick={() => {
            setActionType("buyNow");
            setShowModal(true);
          }}
          className="flex justify-center items-center bg-[#921573] border border-[#921573] text-white rounded-[5px] p-2 w-[79%] transition-all duration-200 ease-in-out hover:bg-white hover:text-[#921573]"
        >
          Mua ngay
        </button>
        <button
          onClick={() => {
            setActionType("addToCart");
            setShowModal(true);
          }}
          className="flex justify-center items-center bg-[#921573] border border-[#921573] text-white rounded-[5px] p-2 w-[20%] transition-all duration-200 ease-in-out hover:bg-white hover:text-[#921573]"
        >
          <FaShoppingCart />
        </button>
      </div>

      {/* Content */}
      <div className="mt-2">
        {/* Name */}
        <span className="p-1 font-normal truncate">{product.name}</span>

        {/* Price */}
        <div className="pb-2 mt-2">
          {hasSale ? (
            <>
              <span className="p-1 text-[#FB5D08] font-medium">
                {product.promotion_price.toLocaleString()}đ
              </span>
              <del className="text-[#999999] text-[14px]">
                {product.price.toLocaleString()}đ
              </del>
            </>
          ) : (
            <span className="p-1 text-[#FB5D08] font-medium">
              {product.price.toLocaleString()}đ
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-between w-[35%] p-1 text-amber-300">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <div className="p-1 w-[49%] text-[14px] font-normal flex justify-end">
            Đã bán {product.quantity}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl ${
                product.status === "inStock" ? "text-[#26AA99]" : "text-red-500"
              }`}
            >
              <MdEventAvailable />
            </span>
            <span
              className={`text-[14px] ${
                product.status === "inStock" ? "text-[#26AA99]" : "text-red-500"
              }`}
            >
              {product.status === "inStock" ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>
          <div className="flex justify-center items-center text-[#999999]">
            <GoDotFill />
            <span className="text-[12px]">{product.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Product } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const hasSale =
    product.promotion_price !== undefined &&
    product.promotion_price < product.price;

  const discount = hasSale
    ? Math.round(
        ((product.price - product.promotion_price!) / product.price) * 100
      )
    : 0;

  return (
    <div className="relative group">
      {/* sale */}
      {hasSale && (
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-700 text-white text-xs absolute top-2 left-2 z-50">
          -{discount}%
        </span>
      )}

      {/* Ảnh */}
      <Link
        href={`/product/${product.id}`}
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
        <Link
          href={`/product/${product.id}`}
          className="flex justify-center items-center bg-[#921573] border border-[#921573] text-white rounded-[5px] p-2 w-[79%] transition-all duration-200 ease-in-out hover:bg-white hover:text-[#921573]"
        >
          Mua ngay
        </Link>
        <button className="flex justify-center items-center bg-[#921573] border border-[#921573] text-white rounded-[5px] p-2 w-[20%] transition-all duration-200 ease-in-out hover:bg-white hover:text-[#921573]">
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

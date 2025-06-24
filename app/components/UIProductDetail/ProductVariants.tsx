"use client";
import React from "react";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { Product } from "@/app/types/Product";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
  onSelect: (product: Product) => void;
};

const ProductVariants = ({ currentProduct, allProducts }: Props) => {
  const variants = allProducts
    .filter((p) => p.group_code === currentProduct.group_code)
    .slice(0, 3);

  return (
    <div className="flex flex-wrap gap-3 my-4 justify-between">
      {variants.map((variant) => {
        const isSelected = variant.id === currentProduct.id;
        const unitPrice =
          variant.pack_size > 0
            ? Math.round(variant.promotion_price / variant.pack_size)
            : null;
        return (
          <Link
            key={variant.id}
            href={`/product/${variant.id}`}
            className={`border w-[31%] rounded-md p-2 text-sm block ${
              isSelected ? "border-blue-500 bg-[#EEF6FF]" : "border-gray-300"
            }`}
          >
            <span className={`text-sm mb-2 ${isSelected ? "text-[#327FF6]"  : ""}`}>
              {variant.pack_size} {variant.display_unit}
            </span>
            <div className="flex items-center gap-2 mb-2">
              <div className="">
                {variant.promotion_price.toLocaleString()}đ   
              </div>
              {unitPrice !== null && (
                <div className="text-xs text-gray-400">
                  ({unitPrice.toLocaleString()}đ/{variant.unit})
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 bg-[#C6FBC2] px-1.5 py-1 rounded text-[9px]">
                {variant.status_text}
              </span>
              <span className="text-gray-400 text-[8px] flex items-center">
                <GoDotFill></GoDotFill>
                <span>{variant.deliveryTime}</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductVariants;

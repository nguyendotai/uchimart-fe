"use client";
import React from "react";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { Inventory } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";

type Props = {
  currentInventory: Inventory;
  allInventories: Inventory[];
  onSelect: (inventory: Inventory) => void;
};

const ProductVariants = ({
  currentInventory,
  allInventories,
  onSelect,
}: Props) => {
  // Lọc các inventory có cùng product_id
  const variants = allInventories;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
      {variants.map((variant) => {
        const isSelected = variant.slug === currentInventory.slug;
        const salePrice = formatCurrencyToNumber(variant.sale_price);
        const offerPrice = formatCurrencyToNumber(variant.offer_price ?? "0");
        const hasSale = offerPrice > 0 && offerPrice < salePrice;
        const displayPrice = hasSale ? offerPrice : salePrice;

        return (
          <Link
            key={variant.slug}
            href={`/product/${variant.slug}`}
            className={`border rounded-md p-2 text-sm flex flex-col justify-between ${
              isSelected ? "border-blue-500 bg-[#EEF6FF]" : "border-gray-300"
            }`}
          >
            {/* Giá */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 font-semibold">
                {displayPrice.toLocaleString()}đ
              </span>
              {hasSale && (
                <del className="text-xs text-gray-400">
                  {salePrice.toLocaleString()}đ
                </del>
              )}
            </div>

            {/* Giá theo đơn vị */}
            <div className="text-xs text-gray-500 mb-1">
              ({(displayPrice / variant.stock_quantity).toLocaleString()} đ/
              {variant.unit ?? "sp"})
            </div>

            {/* Tình trạng + đã bán */}
            <div className="flex items-center gap-2 mt-auto">
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  variant.status_name === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {variant.status_name === "Active" ? "Còn hàng" : "Hết hàng"}
              </span>
              <span className="text-gray-400 text-[10px] flex items-center">
                <GoDotFill className="text-[8px]" />
                <span>Đã bán {variant.sold_count}</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductVariants;

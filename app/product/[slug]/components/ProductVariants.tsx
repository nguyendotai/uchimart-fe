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
  const variants = allInventories;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
      {variants.map((variant) => {
        const isSelected = variant.slug === currentInventory.slug;
        const salePrice = formatCurrencyToNumber(variant.sale_price);
        const offerPrice = formatCurrencyToNumber(variant.offer_price ?? "0");
        const hasSale = offerPrice > 0 && offerPrice < salePrice;
        const displayPrice = hasSale ? offerPrice : salePrice;

        // ✅ Xử lý trạng thái dựa vào số lượng tồn kho
        let stockLabel = "Còn hàng";
        let stockClass = "bg-green-100 text-green-700";
        if (variant.stock_quantity === 0) {
          stockLabel = "Hết hàng";
          stockClass = "bg-red-100 text-red-600";
        } else if (variant.stock_quantity > 0 && variant.stock_quantity <= 20) {
          stockLabel = "Còn hàng";
          stockClass = "bg-green-100 text-green-700";
        }

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
              ({(displayPrice / variant.quantity_in_unit).toLocaleString()} đ/
              {variant.unit_type ?? "sp"})
            </div>

            {/* Trạng thái + đã bán */}
            <div className="flex items-center gap-2 mt-auto">
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${stockClass}`}
              >
                {stockLabel}
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

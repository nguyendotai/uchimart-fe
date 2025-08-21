"use client";
import React from "react";
import Image from "next/image";
import { Inventory, Product } from "@/app/types/Product";

interface ProductImagesProps {
  inventory: Inventory;
  product: Product;
}

const ProductImages = ({ inventory }: ProductImagesProps) => {
  const fallbackImage = "/fallback.jpg";

  // 👉 Helper: lấy trạng thái tồn kho
  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: "Hết hàng", color: "text-red-500" };
    if (quantity < 5) return { text: "Sắp hết", color: "text-yellow-500" };
    return { text: "Còn hàng", color: "text-green-600" };
  };

  const stockStatus = getStockStatus(inventory.stock_quantity || 0);

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* Thumbnail bên trái (ẩn trên mobile) */}
      <div className="w-[14%] hidden sm:block">
        <Image
          src={inventory.image || fallbackImage}
          alt={inventory.title}
          width={100}
          height={100}
          className="rounded-xl border border-gray-200 object-contain w-full h-auto"
        />
      </div>

      {/* Ảnh chính + trạng thái */}
      <div className="w-full sm:w-[86%]">
        <div className="relative w-full min-h-[300px] sm:min-h-[440px] rounded-xl border border-gray-200 overflow-hidden">
          <Image
            src={inventory.image || fallbackImage}
            alt={inventory.title}
            fill
            className="object-contain rounded-xl"
            unoptimized
          />
        </div>

        {/* Trạng thái số lượng */}
        <div className="mt-2">
          <span className={`font-semibold ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
          {inventory.stock_quantity > 0 && (
            <span className="ml-2 text-gray-500 text-sm">
              ({inventory.stock_quantity} sản phẩm)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

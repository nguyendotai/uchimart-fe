"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inventory, Product } from "@/app/types/Product";

interface ProductImagesProps {
  inventory: Inventory;
  product: Product;
}

const ProductImages = ({ inventory, product }: ProductImagesProps) => {
  const fallbackImage = "/fallback.jpg";

  // 👉 Ảnh chính ban đầu: lấy primary_image > inventory.image > fallback
  const [mainImage, setMainImage] = useState<string>(
    inventory.image || product.primary_image || fallbackImage
  );

  // 👉 Helper: trạng thái tồn kho
  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: "Hết hàng", color: "text-red-500" };
    if (quantity < 5) return { text: "Sắp hết", color: "text-yellow-500" };
    return { text: "Còn hàng", color: "text-green-600" };
  };

  const stockStatus = getStockStatus(inventory.stock_quantity || 0);

  // 👉 Gom ảnh nhỏ: inventory.image + product.media
  const thumbnails = [inventory.image, ...(product.media || [])].filter(
    Boolean
  );
  console.log("product.media:", product.media);

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* Thumbnail bên trái (ẩn trên mobile) */}
      <div className="w-[14%] hidden sm:flex flex-col gap-3">
        {thumbnails.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img!)}
            className={`border rounded-xl overflow-hidden ${
              mainImage === img ? "ring-2 ring-[#921573]" : ""
            }`}
          >
            <Image
              src={img || fallbackImage}
              alt={`thumb-${idx}`}
              width={100}
              height={100}
              className="object-contain w-full h-auto"
            />
          </button>
        ))}
      </div>

      {/* Ảnh chính */}
      <div className="w-full sm:w-[86%]">
        <div className="relative w-full min-h-[300px] sm:min-h-[440px] rounded-xl border border-gray-200 overflow-hidden">
          <Image
            src={mainImage || fallbackImage}
            alt={inventory.title || product.name}
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

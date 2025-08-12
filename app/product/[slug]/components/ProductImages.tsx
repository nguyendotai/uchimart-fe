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

      {/* Ảnh chính */}
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
      </div>
    </div>
  );
};

export default ProductImages;

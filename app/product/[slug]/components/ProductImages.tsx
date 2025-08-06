"use client";
import React from "react";
import Image from "next/image";
import { Inventory, Product } from "@/app/types/Product";

interface ProductImagesProps {
  inventory: Inventory;
  product: Product;
}

const ProductImages = ({ inventory }: ProductImagesProps) => {
  const fallbackImage = "/fallback.jpg"; // fallback ảnh nếu không có

  return (
    <div className="flex gap-4">
      {/* Thumbnail bên trái */}
      <div className="w-[14%]">
        <Image
          src={inventory.image || fallbackImage}
          alt={inventory.title}
          width={100}
          height={100}
          className="rounded-xl border border-gray-200 object-contain w-full h-auto"
        />
      </div>

      {/* Ảnh chính bên phải */}
      <div className="w-[86%]">
        <div className="relative w-full min-h-[440px] rounded-xl border border-gray-200 overflow-hidden">
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

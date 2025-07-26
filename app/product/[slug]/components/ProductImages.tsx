"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/app/types/Product";

interface ProductImagesProps {
  product: Product;
}

const ProductImages = ({ product }: ProductImagesProps) => {
  const fallbackImage = "/fallback.jpg"; // Đặt ảnh fallback ở public/

  return (
    <div className="flex gap-4">
      {/* Thumbnail bên trái */}
      <div className="w-[14%]">
        <Image
          src={product.image || fallbackImage}
          alt={product.title}
          width={100}
          height={100}
          className="rounded-xl shadow object-contain w-full h-auto"
        />
      </div>

      {/* Ảnh chính bên phải */}
      <div className="w-[86%]">
        <div className="relative w-full min-h-[600px] rounded-xl shadow overflow-hidden">
          <Image
            src={product.image || fallbackImage}
            alt={product.title}
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

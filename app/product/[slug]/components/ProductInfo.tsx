"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";

type Props = {
  product: Product;
  brand?: Brand;
};

const ProductInfo = ({ product, brand }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setShowMore(!showMore);
    if (!showMore && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 mt-4 relative" ref={contentRef}>
      <h2 className="font-semibold text-xl mb-2">Mô tả</h2>
      <div className={`${!showMore ? "max-h-[250px] overflow-hidden relative" : ""}`}>
        <p className="mt-2">{product.description}</p>

        {product.origin && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Nguồn gốc</span>
            <span className="font-medium">{product.origin}</span>
          </div>
        )}
        {brand?.name && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Thương hiệu</span>
            <span className="font-medium">{brand.name}</span>
          </div>
        )}
        {product.display_unit && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Đơn vị</span>
            <span className="font-medium">{product.display_unit}</span>
          </div>
        )}
        {product.weight > 0 && product.weight_unit && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Khối lượng</span>
            <span className="font-medium">
              {product.weight}
              {product.weight_unit}
            </span>
          </div>
        )}
        {product.expired_at && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Ngày hết hạn</span>
            <span className="font-medium">{product.expired_at}</span>
          </div>
        )}
        {product.ingredient && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Thành phần</span>
            <span className="font-medium">{product.ingredient}</span>
          </div>
        )}
        {product.usage && (
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Cách sử dụng</span>
            <span className="font-medium">{product.usage}</span>
          </div>
        )}

        {/* Gradient mờ */}
        {!showMore && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none">
            {/* Vùng mờ này dùng pointer-events-none để không che nút */}
          </div>
        )}
      </div>

      {/* Nút xem tất cả */}
      {!showMore && (
        <div className="flex justify-center mt-4">
          <button
            className="text-[#921573] text-sm font-medium bg-white px-4 py-2 rounded-full hover:underline z-10 relative"
            onClick={handleToggle}
          >
            Xem tất cả
          </button>
        </div>
      )}

      {/* Nút thu gọn (nếu đang mở rộng) */}
      {showMore && (
        <div className="flex justify-center mt-4">
          <button
            className="text-gray-500 text-sm hover:underline"
            onClick={handleToggle}
          >
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;

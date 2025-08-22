"use client";
import React, { useState, useRef } from "react";
import { Product, Inventory } from "@/app/types/Product";

type Props = {
  product: Product;
  inventory: Inventory; // Optional, in case you want to use inventory data
};

const ProductInfo = ({ inventory }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setShowMore(!showMore);
    if (!showMore && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const cleanHTML = (html: string) => {
  return html
    .replace(/style="[^"]*"/g, "")     // Xoá style=""
    .replace(/class="[^"]*"/g, "")     // Xoá class=""
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, ""); // Xoá thẻ script
};


  return (
    <div
      className="w-full bg-white rounded-xl shadow p-4 mt-4 relative"
      ref={contentRef}
    >
      <h2 className="font-semibold text-xl mb-2">Mô tả</h2>
      <div className={`${!showMore ? "max-h-[300px] overflow-hidden relative" : ""}`}>
        <div
          className="mt-2 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: cleanHTML(inventory.description || "<p>Chưa có mô tả</p>"),
          }}
        />

        {!showMore && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none" />
        )}
      </div>

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

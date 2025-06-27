"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Category } from "@/app/types/Category";

interface Props {
  categoryId: number;
}

const CategoryInfo = ({ categoryId }: Props) => {
  const [infoCategory, setInfoCategory] = useState<Category | null>(null);
  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const found = data.find((c) => c.id === categoryId);
        setInfoCategory(found || null);
      })
      .catch((err) => console.error("Lỗi tải categories:", err));
  }, [categoryId]);
  if (!infoCategory) return null;
  return (
    <div className="flex items-center bg-[#f9f9f9] rounded p-6">
      {/* Hình ảnh danh mục */}
      <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-white flex items-center justify-center">
        <img
          src={infoCategory.image}
          alt={infoCategory.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Nội dung */}
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-semibold text-black">
          Thông tin hữu ích về {infoCategory.name}
        </h3>
        <p className="text-gray-700 mt-1">{infoCategory.description}</p>
        <a href="#" className="text-green-500 font-semibold mt-2 inline-block">
          Xem thêm
        </a>
      </div>
    </div>
  );
};

export default CategoryInfo;

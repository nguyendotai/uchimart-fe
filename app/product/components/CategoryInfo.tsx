"use client";
import React, { useState, useEffect } from "react";
import { CategoryGroup } from "@/app/types/Category";

interface Props {
  categoryId: number;
}

const CategoryInfo = ({ categoryId }: Props) => {
  const [infoCategory, setInfoCategory] = useState<CategoryGroup | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category-groups")
      .then((res) => res.json())
      .then((data) => {
        const categories: CategoryGroup[] = data.data || data;
        const found = categories.find((c) => c.id === categoryId);
        setInfoCategory(found || null);
      })
      .catch((err) => console.error("Lỗi tải categories:", err));
  }, [categoryId]);

  if (!infoCategory) return null;

  return (
    <div className="flex items-start bg-[#f9f9f9] rounded p-6 flex-col md:flex-row">
      {/* Hình ảnh danh mục */}
      <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-white flex items-center justify-center">
        <img
          src={infoCategory.image}
          alt={infoCategory.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Nội dung */}
      <div className="ml-0 md:ml-6 flex-1 mt-4 md:mt-0">
        <h3 className="text-lg font-semibold text-black">
          Thông tin hữu ích về {infoCategory.name}
        </h3>

        <div
          className={`text-gray-700 mt-2 transition-all duration-300 overflow-hidden ${
            isExpanded ? "line-clamp-none" : "line-clamp-4"
          }`}
          // render HTML từ API
          dangerouslySetInnerHTML={{ __html: infoCategory.description }}
        />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-500 font-semibold mt-3 inline-block"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default CategoryInfo;

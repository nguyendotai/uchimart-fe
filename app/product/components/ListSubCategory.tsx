"use client";
import React, { useState, useEffect } from "react";
import { Category } from "@/app/types/Category";
import { FaChevronDown } from "react-icons/fa";

type Option = {
  label: string;
  value: string;
};

type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  categoryGroupId: number; // 🆕 Nhận id danh mục cha
};

const options: Option[] = [
  { label: "Mới nhất", value: "newest" },
  { label: "Giá tăng dần", value: "price-asc" },
  { label: "Giá giảm dần", value: "price-desc" },
  { label: "Bán chạy", value: "best-seller" },
];

const ListSubCategory = ({ sortBy, setSortBy, categoryGroupId }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!categoryGroupId) return;

    fetch(`http://127.0.0.1:8000/api/category-groups/${categoryGroupId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const children: Category[] = data.data?.categories ?? [];
        setCategories(children.slice(0, 8)); // giới hạn hiển thị 8 danh mục con
      })
      .catch((err) => {
        console.error("Failed to fetch subcategories:", err);
      });
  }, [categoryGroupId]);

  return (
    <div className="sticky top-0 z-30 shadow">
      {/* Danh mục con */}
      <div className="flex gap-2 p-4 bg-white shadow rounded-tl-2xl rounded-tr-2xl overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <div key={category.id} className="w-[12%] text-center min-w-[80px]">
            <img
              src={category.image}
              alt={category.name}
              className="mx-auto mb-1 h-12 object-contain"
            />
            <span className="text-xs">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Bộ lọc sắp xếp */}
      <div className="flex gap-2 p-4 bg-gray-200 shadow rounded-bl-2xl rounded-br-2xl">
        <div className="relative inline-block w-40">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none w-full bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Sắp xếp theo
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <FaChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSubCategory;

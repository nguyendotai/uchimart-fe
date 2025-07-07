"use client";
import React from "react";
import { useState, useEffect } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/Category";

const ListCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]); // Sử dụng useState để lưu trữ danh mục
  useEffect(() => {
    fetch("/data/categories.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Category[]) => {
        setCategories(data); // Cập nhật state với dữ liệu categories
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
          <TbCategory2 size={20} />
        </div>
        <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
          Danh mục
        </span>
      </div>
      <div className="max-h-[570px] overflow-y-auto pr-1 scrollbar-custom">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.id)}
            className="flex items-center gap-3 py-2 px-2 hover:bg-purple-100 cursor-pointer rounded"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-sm text-gray-800">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCategories;
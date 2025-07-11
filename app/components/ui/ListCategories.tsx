"use client";
import React, { useEffect, useState, useRef } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Category, CategoryChild } from "@/app/types/Category";
import { createPortal } from "react-dom";

const ListCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryChildren, setCategoryChildren] = useState<CategoryChild[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Thêm ref để lưu timeout

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data));

    fetch("/data/categoryChild.json")
      .then((res) => res.json())
      .then((data: CategoryChild[]) => setCategoryChildren(data));
  }, []);

  const handleMouseEnterCategory = (categoryId: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategoryId(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategoryId(null);
    }, 200); // Delay ẩn 200ms
  };

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  const handleChildCategoryClick = (child: CategoryChild) => {
    router.push(`/product?category=${child.category_id}&child=${child.id}`);
  };

  const filteredChildren = hoveredCategoryId
    ? categoryChildren.filter((child) => child.category_id === hoveredCategoryId)
    : [];

  return (
    <div className="relative flex">
      {/* Cột trái: Danh mục chính */}
      <div
        className="w-[240px] h-[600px] overflow-y-auto pr-1 scrollbar-custom bg-white z-10 sticky"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
      >
        <div className="flex items-center gap-2 mb-2 p-2">
          <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
            <TbCategory2 size={20} />
          </div>
          <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
            Danh mục
          </span>
        </div>

        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex items-center py-2 px-2 hover:bg-purple-100 cursor-pointer rounded"
            onMouseEnter={() => handleMouseEnterCategory(category.id)}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-sm text-gray-800 ml-2">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Cột phải: Danh mục con */}
      {hoveredCategoryId !== null &&
        typeof window !== "undefined" &&
        document.getElementById("dropdown-root") &&
        createPortal(
          <div
            className="fixed top-[189px] left-[340px] w-[240px] min-h-[613px] bg-white shadow-lg rounded-lg p-4 z-[9999]"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => (
                <div
                  key={child.id}
                  onClick={() => handleChildCategoryClick(child)}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm text-gray-700"
                >
                  {child.name}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic">
                Không có danh mục con
              </div>
            )}
          </div>,
          document.getElementById("dropdown-root")!
        )}
    </div>
  );
};

export default ListCategories;

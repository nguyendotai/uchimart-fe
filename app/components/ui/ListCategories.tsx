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
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null
  );
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

    const ref = categoryRefs.current[categoryId];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top,
        left: rect.right + 6,
      });
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategoryId(null);
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  const handleChildCategoryClick = (child: CategoryChild) => {
    router.push(`/product?category=${child.category_id}&child=${child.id}`);
  };

  const filteredChildren = hoveredCategoryId
    ? categoryChildren.filter(
        (child) => child.category_id === hoveredCategoryId
      )
    : [];

  return (
    <>
      <div className="flex justify-center pt-4 pb-4 mt-2 mb-7">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[240px] h-auto object-contain transition-opacity duration-300"
        />
      </div>

      <div className="relative flex">
        {/* Sidebar chứa danh mục */}
        <div className="w-[240px] h-[700px] bg-white z-10 sticky top-2 rounded-xl">
          {/* Tiêu đề "Danh mục" - không cuộn */}
          <div className="flex items-center gap-2 p-2 bg-white sticky top-0 z-20">
            <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
              <TbCategory2 size={20} />
            </div>
            <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
              Danh mục
            </span>
          </div>

          {/* Danh sách danh mục - cuộn được */}
          <div
            className="h-[580px] overflow-y-auto pr-1 scrollbar-hide"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                ref={(el: HTMLDivElement | null) => {
                  categoryRefs.current[category.id] = el;
                }}
                className="group flex items-center py-2 px-2 hover:bg-purple-100 cursor-pointer rounded"
                onMouseEnter={() => handleMouseEnterCategory(category.id)}
                onClick={() => handleCategoryClick(category.id)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="text-sm text-gray-800 ml-2">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Danh mục con hiển thị bằng Portal */}
        {hoveredCategoryId !== null &&
          typeof window !== "undefined" &&
          document.getElementById("dropdown-root") &&
          createPortal(
            <div
              className="absolute bg-white shadow rounded-lg p-2 z-[9999] min-w-[300px] max-w-[800px] transition-all ease-in-out"
              style={{
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
              }}
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              {filteredChildren.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filteredChildren.map((child) => (
                    <div
                      key={child.id}
                      onClick={() => handleChildCategoryClick(child)}
                      className="px-4 py-2 rounded hover:bg-purple-100 cursor-pointer text-sm text-gray-700 transition"
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Không có danh mục con
                </div>
              )}
            </div>,
            document.getElementById("dropdown-root")!
          )}
      </div>
    </>
  );
};

export default ListCategories;

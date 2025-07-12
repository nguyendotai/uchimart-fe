"use client";
import React, { useEffect, useState, useRef } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Category, CategoryChild } from "@/app/types/Category";
import { createPortal } from "react-dom";

const SIDEBAR_WIDTH = 240; // px
const CHILD_WIDTH = 0.4; // 40% viewport

const ListCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryChildren, setCategoryChildren] = useState<CategoryChild[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


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
    }, 200);
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
      {/* Logo */}
      <div className="flex justify-center pt-4 pb-4 mt-2 mb-7">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[240px] h-auto object-contain transition-opacity duration-300"
        />
      </div>

      <div className="relative flex group">
        {/* Sidebar */}
        <div className="w-[240px] h-[700px] bg-white sticky top-2 rounded-xl z-10 group-hover:z-60 transition-all duration-300">
          <div className="flex items-center gap-2 p-2 bg-white sticky top-0 z-20">
            <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
              <TbCategory2 size={20} />
            </div>
            <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
              Danh mục
            </span>
          </div>

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

        {/* Danh mục con + overlay */}
        {hoveredCategoryId !== null &&
          typeof window !== "undefined" &&
          document.getElementById("dropdown-root") &&
          createPortal(
            <>
              {/* Danh mục con */}
              <div
                className="fixed top-0 left-[251px] h-screen bg-white shadow-lg p-6 z-[9998] overflow-y-auto"
                style={{ width: `${CHILD_WIDTH * 100}vw` }}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {filteredChildren.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
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
              </div>

              {/* Overlay phần còn lại (bên phải danh mục con) */}
              <div
                className="fixed top-0 right-0 h-screen bg-black/30 z-[9996]"
                style={{
                  left: `calc(${SIDEBAR_WIDTH}px + ${CHILD_WIDTH * 100}vw)`,
                }}
                onClick={() => setHoveredCategoryId(null)}
              />
            </>,
            document.getElementById("dropdown-root")!
          )}
      </div>
    </>
  );
};

export default ListCategories;

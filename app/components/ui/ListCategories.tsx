"use client";
import React, { useEffect, useState, useRef } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { CategoryGroup, Category } from "@/app/types/Category";
import { createPortal } from "react-dom";

const SIDEBAR_WIDTH = 240;
const CHILD_WIDTH = 0.4;

interface GroupWithChildren extends CategoryGroup {
  categories: Category[];
}

const ListCategories = () => {
  const router = useRouter();
  const [groupedCategories, setGroupedCategories] = useState<
    GroupWithChildren[]
  >([]);
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/category-groups");
      const json = await res.json();

      const groups: GroupWithChildren[] = json.data ?? [];
      setGroupedCategories(groups);
    } catch (err) {
      console.error("Lỗi fetch dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnterCategory = (groupId: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredGroupId(groupId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredGroupId(null);
    }, 200);
  };

  const handleCategoryClick = (groupId: number) => {
    router.push(`/product?category=${groupId}`);
  };

  const handleChildCategoryClick = (child: Category, groupId: number) => {
    router.push(`/product?category=${groupId}&child=${child.id}`);
  };

  const hoveredGroup = groupedCategories.find((g) => g.id === hoveredGroupId);
  const filteredChildren = hoveredGroup?.categories || [];

  return (
    <>
      {/* Logo */}

      <div className="relative flex group">
        {/* Sidebar */}
        <div className="w-[240px]  bg-white sticky top-2 rounded-xl z-10 group-hover:z-60 transition-all duration-300 overflow-hidden">
          {/* Logo */}
          <div className="flex justify-center pt-4 pb-4 mt-2 mb-4 bg-white sticky top-0 z-30">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[240px] h-auto object-contain transition-opacity duration-300"
            />
          </div>

          {/* "Danh mục" tiêu đề */}
          <div className="flex items-center gap-2 p-2 bg-white sticky top-[100px] z-20">
            <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
              <TbCategory2 size={20} />
            </div>
            <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
              Danh mục
            </span>
          </div>

          {/* List danh mục */}
          <div
            className="h-[calc(800px-160px)] overflow-y-auto pr-1 scrollbar-hide"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          >
            {groupedCategories.map((group) => (
              <div
                key={group.id}
                className="group flex items-center py-4 px-2 hover:bg-purple-100 cursor-pointer rounded"
                onMouseEnter={() => handleMouseEnterCategory(group.id)}
                onClick={() => handleCategoryClick(group.id)}
              >
                <img
                  src={group.image || "/default.png"}
                  alt={group.name || "Không tên"}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="text-sm text-gray-800 ml-2">
                  {group.name || "Không tên"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Danh mục con + overlay */}
        {hoveredGroupId !== null &&
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
                        onClick={() =>
                          handleChildCategoryClick(child, hoveredGroupId)
                        }
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

              {/* Overlay phần còn lại */}
              <div
                className="fixed top-0 right-0 h-screen bg-black/30 z-[9996]"
                style={{
                  left: `calc(${SIDEBAR_WIDTH}px + ${CHILD_WIDTH * 100}vw)`,
                }}
                onClick={() => setHoveredGroupId(null)}
              />
            </>,
            document.getElementById("dropdown-root")!
          )}
      </div>
    </>
  );
};

export default ListCategories;

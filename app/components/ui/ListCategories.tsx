"use client";
import React, { useEffect, useState, useRef } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { CategoryGroup, Category } from "@/app/types/Category";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

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
  const [expandedChildIds, setExpandedChildIds] = useState<number[]>([]);

  const {t, i18n} = useTranslation();
  const isExpanded = (childId: number) => expandedChildIds.includes(childId);

  const toggleExpand = (childId: number) => {
    setExpandedChildIds((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId]
    );
  };

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
              {t("categories")}
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
                className="fixed top-0 left-[251px] h-screen bg-white shadow-lg p-6 z-[9998] overflow-y-auto scrollbar-hide"
                style={{ width: `${CHILD_WIDTH * 100}vw` }}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                  <div className="grid grid-cols-4 gap-6">
                    {filteredChildren.map((category) => (
                      <div
                        key={category.id}
                        className="flex flex-col gap-2 cursor-pointer p-2 rounded transition"
                        onClick={() =>
                          router.push(
                            `/product?category=${hoveredGroupId}&child=${category.id}`
                          )
                        }
                      >
                        {/* Hình ảnh và tên danh mục cấp 2 */}
                        <div className="">
                          <img
                            src={category.image || "/default.png"}
                            alt={category.name}
                            className="w-20 h-20 object-cover rounded-full"
                          />
                          <span className="font-semibold text-gray-800">
                            {category.name}
                          </span>
                        </div>

                        {/* Danh mục cấp 3 */}
                        <div className="grid grid-cols-1 gap-3 ml-2 mt-2">
                          {(isExpanded(category.id)
                            ? category.subcategories
                            : category.subcategories.slice(0, 5)
                          ).map((sub: { id: React.Key | null | undefined; name: string }) => (
                            <div
                              key={sub.id}
                              onClick={() =>
                                router.push(
                                  `/product?category=${hoveredGroupId}&child=${category.id}&sub=${sub.id}`
                                )
                              }
                              className="text-sm text-gray-600 hover:text-purple-700 cursor-pointer transition flex items-start gap-1"
                            >
                              <span className="underline">{sub.name}</span>
                            </div>
                          ))}

                          {/* Nếu có nhiều hơn 8 thì hiển thị nút Xem thêm / Thu gọn */}
                          {category.subcategories.length > 8 && (
                            <div
                              onClick={() => toggleExpand(category.id)}
                              className="text-sm text-blue-600 hover:underline cursor-pointer mt-1"
                            >
                              {isExpanded(category.id) ? "Thu gọn" : "Xem thêm"}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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

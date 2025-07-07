"use client";
import React, { useState, useEffect, useRef } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Category, CategoryChild } from "@/app/types/Category";

const ListCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryChildren, setCategoryChildren] = useState<CategoryChild[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Refs cho mỗi mục danh mục chính và cho toàn bộ khối sidebar
  const categoryRefs = useRef<Record<number, HTMLDivElement>>({});
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref cho toàn bộ sidebar (bao gồm cả header "Danh mục")
  const submenuRef = useRef<HTMLDivElement>(null); // Ref cho submenu để kiểm tra việc rời chuột

  // Biến để quản lý timeout khi rời chuột (tránh đóng ngay lập tức)
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Lấy danh mục cha
    fetch("/data/categories.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setCategories)
      .catch((error) => console.error("Failed to fetch categories:", error));

    // Lấy danh mục con
    fetch("/data/categoryChild.json") // Đảm bảo đúng tên file là categoryChildren.json
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setCategoryChildren)
      .catch((error) =>
        console.error("Failed to fetch category children:", error)
      );
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  const handleChildCategoryClick = (childId: number) => {
    router.push(`/product?categoryChild=${childId}`);
  };

  const getChildrenForCategory = (categoryId: number) => {
    return categoryChildren.filter((child) => child.category_id === categoryId);
  };

  const handleMouseEnterCategory = (categoryId: number) => {
    // Xóa bất kỳ timeout đóng nào đang chờ
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }

    setHoveredCategoryId(categoryId);

    // Tính toán vị trí của submenu dựa trên vị trí của sidebar và mục cha
    if (categoryRefs.current?.[categoryId] && sidebarRef.current) {
      const categoryRect = categoryRefs.current[categoryId].getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();

      setSubmenuPosition({
        // Top của submenu sẽ căn chỉnh với top của sidebar
        // Điều chỉnh nếu bạn muốn nó căn chỉnh với mục cha đang hover
        // top: categoryRect.top + window.scrollY, // Căn theo mục cha
        top: sidebarRect.top + window.scrollY - 150, // Căn theo top của sidebar
        left: sidebarRect.left + sidebarRect.width - 78, // Ngay bên phải sidebar
      });
    } else {
      setSubmenuPosition(null);
    }
  };

  const handleMouseLeaveContainer = () => {
    // Đặt timeout để đóng submenu sau một khoảng thời gian ngắn
    // Điều này giúp tránh việc submenu bị đóng ngay lập tức khi di chuyển chuột giữa mục cha và submenu
    leaveTimeout.current = setTimeout(() => {
      setHoveredCategoryId(null);
      setSubmenuPosition(null);
    }, 150); // 150ms delay
  };

  const handleMouseEnterSubmenu = () => {
    // Khi chuột di vào submenu, xóa timeout để giữ nó mở
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  };

  return (
    // Bọc toàn bộ component trong một div để quản lý sự kiện onMouseLeave
    <div
      className="relative"
      ref={sidebarRef} // Gán ref cho toàn bộ sidebar
      onMouseLeave={handleMouseLeaveContainer} // Quản lý sự kiện rời chuột cho toàn bộ khối sidebar và submenu
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex justify-center bg-[#921573] text-white p-2.5 rounded w-[20%]">
          <TbCategory2 size={20} />
        </div>
        <span className="flex justify-center text-white bg-[#921573] py-2 rounded font-semibold text-sm w-[78%] text-[16px]">
          Danh mục
        </span>
      </div>
      {/* Vùng cuộn của danh mục cha */}
      <div className="max-h-[570px] overflow-y-auto pr-1 scrollbar-custom">
        {categories.map((category) => (
          <div
            key={category.id}
            // onMouseEnter trên div này để kích hoạt submenu
            onMouseEnter={() => handleMouseEnterCategory(category.id)}
            // Không cần onMouseLeave riêng ở đây nữa, vì đã có ở div cha ngoài cùng
            // Đặt ref cho mỗi mục danh mục để có thể lấy vị trí của nó
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                categoryRefs.current = {
                  ...categoryRefs.current,
                  [category.id]: el,
                };
              }
            }}
            className="flex items-center gap-3 py-2 px-2 hover:bg-purple-100 cursor-pointer rounded"
            onClick={() => handleCategoryClick(category.id)}
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

      {/* Render menu con ở đây, hoàn toàn bên ngoài div có thể cuộn */}
      {hoveredCategoryId !== null && submenuPosition && (
        <div
          ref={submenuRef} // Gán ref cho submenu
          style={{
            position: "absolute", // Định vị tuyệt đối so với div.relative bên ngoài cùng
            top: submenuPosition.top, // Vị trí top được tính toán
            left: submenuPosition.left, // Vị trí left được tính toán
            minWidth: "200px", // Chiều rộng tối thiểu cho menu con
            minHeight: "580px",
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "0.25rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 100, // Đảm bảo nó hiển thị trên tất cả các phần tử khác
            padding: "0.5rem 0",
          }}
          onMouseEnter={handleMouseEnterSubmenu} // Giữ submenu mở khi di chuột vào chính nó
          // onMouseLeave đã được quản lý bởi handleMouseLeaveContainer trên div cha
        >
          {getChildrenForCategory(hoveredCategoryId).length > 0 ? (
            getChildrenForCategory(hoveredCategoryId).map((child) => (
              <div
                key={child.id}
                onClick={() => handleChildCategoryClick(child.id)}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 whitespace-nowrap"
              >
                {child.name}
              </div>
            ))
          ) : (
            <div className="py-2 px-4 text-sm text-gray-500">
              Không có danh mục con
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListCategories;
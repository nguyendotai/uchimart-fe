"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { CategoryGroup, Category } from "@/app/types/Category";

type Option = {
  label: string;
  value: string;
};

type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const options: Option[] = [
  { label: "Mới nhất", value: "newest" },
  { label: "Giá tăng dần", value: "price-asc" },
  { label: "Giá giảm dần", value: "price-desc" },
  { label: "Bán chạy", value: "best-seller" },
];

const ListSubCategory = ({ sortBy, setSortBy }: Props) => {
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        const allCategoryGroups: CategoryGroup[] = json.data ?? []; // Lấy tất cả nhóm danh mục

        const categoryGroupId = searchParams.get("category"); // Lấy ID danh mục cấp 1 từ URL

        if (categoryGroupId) {
          // Tìm nhóm danh mục khớp với ID từ URL
          const foundGroup = allCategoryGroups.find(
            (group) => group.id === parseInt(categoryGroupId)
          );

          if (foundGroup) {
            // Nếu tìm thấy nhóm, hiển thị danh mục cấp 2 của nhóm đó
            setDisplayedCategories(foundGroup.categories ? foundGroup.categories.slice(0, 8) : []); // Giới hạn 8 danh mục con
          } else {
            // Nếu không tìm thấy nhóm (ID không hợp lệ), không hiển thị danh mục con nào
            setDisplayedCategories([]);
          }
        } else {
          // Trường hợp không có tham số 'category' trên URL
          // Bạn có thể quyết định hiển thị 8 danh mục cấp 1 đầu tiên
          // hoặc không hiển thị gì cả. Hiện tại, mình sẽ hiển thị 8 danh mục cấp 1 đầu tiên.
          const firstEightGroupsAsCategories = allCategoryGroups.slice(0, 8).map(group => ({
            id: group.id,
            name: group.name,
            slug: group.slug,
            image: group.image,
            status: group.status,
            subcategories: [],
            description: group.description ?? "",
            seo_title: group.seo_title ?? "",
            seo_description: group.seo_description ?? "",
            category_group_id: group.id, // hoặc group.category_group_id nếu có
          }));
          setDisplayedCategories(firstEightGroupsAsCategories as Category[]);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
        setDisplayedCategories([]); // Đảm bảo UI không bị lỗi nếu fetch thất bại
      }
    };

    fetchAndFilterCategories();
  }, [searchParams]); // Dependency `searchParams` đảm bảo fetch lại khi URL thay đổi

  return (
    <div className="sticky top-0 z-30">
      {/* Danh mục con (Cấp 2 của danh mục cấp 1 đang được chọn) */}
      <div className="flex gap-2 p-4 bg-white shadow rounded-tl-2xl rounded-tr-2xl">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((category, index) => (
            <div key={index} className="w-[12%] text-center">
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto mb-1 h-20 object-contain"
              />
              <span className="text-sm">{category.name}</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 italic w-full text-center">
            Không có danh mục con nào để hiển thị.
          </div>
        )}
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
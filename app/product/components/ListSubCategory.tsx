"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
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
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        const json = await res.json();
        const allCategoryGroups: CategoryGroup[] = json.data ?? [];
        const categoryGroupId = searchParams.get("category");

        if (categoryGroupId) {
          const foundGroup = allCategoryGroups.find(
            (group) => group.id === parseInt(categoryGroupId)
          );
          setDisplayedCategories(foundGroup?.categories ?? []);
        } else {
          const fallbackCategories = allCategoryGroups.map((group) => ({
            id: group.id,
            name: group.name,
            slug: group.slug,
            image: group.image,
            status: group.status,
            subcategories: [],
            description: group.description ?? "",
            seo_title: group.seo_title ?? "",
            seo_description: group.seo_description ?? "",
            category_group_id: group.id,
          }));
          setDisplayedCategories(fallbackCategories as Category[]);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
        setDisplayedCategories([]);
      }
    };

    fetchAndFilterCategories();
  }, [searchParams]);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollButtons);
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [displayedCategories]);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-30">
      {/* Danh mục con */}
      <div className="relative bg-white shadow rounded-t-2xl p-4">
        {/* Scroll Container */}
        <div className="relative">
          {/* Scrollable list */}
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            ref={scrollRef}
          >
            {displayedCategories.length > 0 ? (
              displayedCategories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[140px] text-center flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById(
                      `category-child-${category.id}`
                    );
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto mb-1 h-20 object-contain"
                  />
                  <span className="text-sm break-words whitespace-normal leading-snug mt-1 block max-w-[100px] mx-auto">
                    {category.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic w-full text-center">
                Không có danh mục con nào để hiển thị.
              </div>
            )}
          </div>

          {/* Mũi tên trái */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount(-1200)}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Mũi tên phải */}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount(1200)}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* Bộ lọc sắp xếp */}
      <div className="flex gap-2 p-4 bg-gray-200 shadow rounded-b-2xl">
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

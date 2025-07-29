"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import { CategoryGroup } from "@/app/types/Category";
import { Product, Inventory } from "@/app/types/Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 4;

const ListProductByCate = () => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [scrollState, setScrollState] = useState<Record<number, { left: boolean; right: boolean }>>({});

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/category-groups").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/products").then((res) => res.json()),
    ])
      .then(([groupData, productData]) => {
        setGroups(groupData.data ?? []);
        const products: Product[] = productData.data ?? [];

        const allInventories: Inventory[] = products.flatMap((p) =>
          p.inventories.map((inv) => ({
            ...inv,
            subcategories: p.subcategories,
            unit: undefined,
          }))
        );

        setInventories(allInventories);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  const updateScrollButtons = (groupId: number) => {
    const el = scrollRefs.current[groupId];
    if (!el) return;

    setScrollState((prev) => ({
      ...prev,
      [groupId]: {
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      },
    }));
  };

  const scrollByAmount = (groupId: number, direction: "left" | "right") => {
    const el = scrollRefs.current[groupId];
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220;
    el.scrollBy({ left: direction === "right" ? cardWidth * ITEMS_PER_PAGE : -cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  return (
    <>
      {groups.map((group) => {
        const groupProducts = inventories.filter((inv) => {
          const groupId = inv.subcategories?.[0]?.category?.category_group?.id;
          return groupId === group.id;
        });

        if (groupProducts.length === 0) return null;

        return (
          <div key={group.id} className="w-full space-y-4 mb-6 relative">
            {/* Banner nhóm danh mục */}
            <div className="w-full h-[120px] rounded-lg overflow-hidden relative flex bg-gray-200 shadow">
              <div className="w-[40%]">
                <img
                  src={group.cover || "/default-category.png"}
                  alt={group.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="w-[60%] flex items-center px-4">
                <h2 className="text-2xl font-semibold text-[#921573]">{group.name}</h2>
              </div>
            </div>

            {/* Nút trái */}
            {scrollState[group.id]?.left && (
              <button
                onClick={() => scrollByAmount(group.id, "left")}
                className="absolute left-0 top-[60%] z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Danh sách sản phẩm cuộn ngang */}
            <div
              ref={(el) => {
                scrollRefs.current[group.id] = el;
              }}
              onScroll={() => updateScrollButtons(group.id)}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {groupProducts.slice(0, 12).map((inv) => (
                <div
                  key={inv.id}
                  className="min-w-[200px] max-w-[200px] flex-shrink-0 border border-gray-200 rounded-xl p-2"
                >
                  <ProductCard product={inv} />
                </div>
              ))}
            </div>

            {/* Nút phải */}
            {scrollState[group.id]?.right && (
              <button
                onClick={() => scrollByAmount(group.id, "right")}
                className="absolute right-0 top-[60%] z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
            )}

            {/* Xem thêm */}
            <div className="flex justify-center mt-2">
              <a
                href={`/product?category_group=${group.id}`}
                className="text-[#921573] hover:underline font-medium"
              >
                Xem thêm
              </a>
            </div>

            <hr className="border-gray-300 mt-4" />
          </div>
        );
      })}
    </>
  );
};

export default ListProductByCate;

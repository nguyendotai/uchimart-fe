"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import { CategoryGroup } from "@/app/types/Category";
import { Product, Inventory } from "@/app/types/Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const ListProductByCate = () => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [scrollState, setScrollState] = useState<
    Record<number, { left: boolean; right: boolean }>
  >({});
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const isSalePage = filter === "khuyen-mai-hot";

  // Fetch data
  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/category-groups").then((res) =>
        res.json()
      ),
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

  // Cập nhật trạng thái scroll
  useEffect(() => {
    const observers: ResizeObserver[] = [];

    groups.forEach((group) => {
      const el = scrollRefs.current[group.id];
      if (!el) return;

      const observer = new ResizeObserver(() => {
        updateScrollButtons(group.id);
      });

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [groups, inventories]);

  const updateScrollButtons = (groupId: number) => {
    const el = scrollRefs.current[groupId];
    if (!el) return;

    const canScrollLeft = el.scrollLeft > 0;
    const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    setScrollState((prev) => ({
      ...prev,
      [groupId]: {
        left: canScrollLeft,
        right: canScrollRight,
      },
    }));
  };

  const scrollByAmount = (groupId: number, direction: "left" | "right") => {
    const el = scrollRefs.current[groupId];
    if (!el) return;

    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220;

    el.scrollBy({
      left:
        direction === "right"
          ? cardWidth * ITEMS_PER_PAGE
          : -cardWidth * ITEMS_PER_PAGE,
      behavior: "smooth",
    });

    setTimeout(() => updateScrollButtons(groupId), 300);
  };

  return (
    <>
      {groups.map((group) => {
        const groupProducts = inventories.filter((inv) => {
          const groupId = inv.subcategories?.[0]?.category?.category_group?.id;
          const isInGroup = groupId === group.id;
          const hasDiscount = inv.offer_price && Number(inv.offer_price) > 0;
          return isSalePage ? isInGroup && hasDiscount : isInGroup;
        });

        if (groupProducts.length === 0) return null;

        return (
          <div key={group.id} className="w-full space-y-6 mb-8 relative">
            {/* Banner nhóm danh mục */}
            <div className="w-full rounded-lg overflow-hidden relative flex bg-gray-100 h-auto min-h-[6rem]">
              <div className=" max-w-[40%]">
                <img
                  src={group.cover || "/default-category.png"}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Nút trái */}
            {scrollState[group.id]?.left && (
              <button
                onClick={() => scrollByAmount(group.id, "left")}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 sm:p-3 rounded-full"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Danh sách sản phẩm */}
            <div
              ref={(el) => {
                scrollRefs.current[group.id] = el;
              }}
              onScroll={() => updateScrollButtons(group.id)}
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab select-none px-1"
            >
              {groupProducts.slice(0, 12).map((inv) => (
                <div
                  key={inv.id}
                  className="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[clamp(140px,25vw,195px)] border border-gray-200 rounded-xl p-2 sm:p-3"

                >
                  <ProductCard product={inv} />
                </div>
              ))}
            </div>

            {/* Nút phải */}
            {scrollState[group.id]?.right && (
              <button
                onClick={() => scrollByAmount(group.id, "right")}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 sm:p-3 rounded-full"
              >
                <FaChevronRight />
              </button>
            )}

            {/* Xem thêm */}
            <div className="flex justify-center mt-3">
              <a
                href={
                  isSalePage
                    ? `/product?filter=khuyen-mai-hot&category=${group.id}`
                    : `/product?category=${group.id}`
                }
                className="text-[#921573] hover:underline font-medium"
              >
                Xem thêm
              </a>
            </div>

            <hr className="border-gray-300 mt-6" />
          </div>
        );
      })}
    </>
  );
};

export default ListProductByCate;

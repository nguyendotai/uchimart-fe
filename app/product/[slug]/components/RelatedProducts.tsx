"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inventory } from "@/app/types/Product";
import ProductCard from "@/app/components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  currentInventory: Inventory;
  allProducts: Inventory[];
};

const ITEMS_PER_PAGE_DESKTOP = 4;
const ITEMS_PER_PAGE_MOBILE = 2;

const RelatedProducts = ({ currentInventory, allProducts }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentCategoryGroupId =
    currentInventory?.subcategories?.[0]?.category?.category_group?.id ?? null;

  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentInventory.id &&
        p.subcategories?.[0]?.category?.category_group?.id ===
          currentCategoryGroupId
    )
    .slice(0, 12);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    updateScrollButtons();
    if (el) el.addEventListener("scroll", updateScrollButtons);
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [related]);

  const scrollByAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 200;
    const perPage =
      window.innerWidth < 640
        ? ITEMS_PER_PAGE_MOBILE
        : ITEMS_PER_PAGE_DESKTOP;
    el.scrollBy({ left: cardWidth * perPage, behavior: "smooth" });
  };

  const scrollBackAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 200;
    const perPage =
      window.innerWidth < 640
        ? ITEMS_PER_PAGE_MOBILE
        : ITEMS_PER_PAGE_DESKTOP;
    el.scrollBy({ left: -cardWidth * perPage, behavior: "smooth" });
  };

  if (related.length === 0) return null;

  return (
    <div className="mt-6 relative w-full overflow-hidden">
      <h2 className="text-2xl font-semibold mb-2 p-2 w-fit text-center rounded-xl">
        Sản phẩm liên quan
      </h2>

      {/* Nút trái */}
      {canScrollLeft && (
        <button
          onClick={scrollBackAmount}
          className="flex absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Danh sách cuộn */}
      <div
        ref={scrollRef}
        className="
          flex gap-x-3 sm:gap-x-4 
          overflow-x-auto scroll-smooth scrollbar-hide 
          px-2 sm:px-4
          touch-pan-x snap-x snap-mandatory
        "
      >
        {related.map((product) => (
          <div
            key={product.id}
            className="
              flex-shrink-0 
              w-[calc(50%-0.375rem)]   /* Mobile: 2 sản phẩm */
              sm:w-[clamp(140px,25vw,195px)] /* Desktop: size cố định */
              border border-gray-200 rounded-xl 
              p-2 sm:p-3 bg-white
              snap-start
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Nút phải */}
      {canScrollRight && (
        <button
          onClick={scrollByAmount}
          className="flex absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default RelatedProducts;

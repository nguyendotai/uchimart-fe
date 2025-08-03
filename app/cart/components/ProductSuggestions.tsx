"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inventory, Product } from "@/app/types/Product";
import ProductCard from "@/app/components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

export default function ProductSuggestions() {
  const [products, setProducts] = useState<Inventory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        const products = res.data || [];
        const allInventories: Inventory[] = products.flatMap(
          (p: { inventories: Inventory[] }) => p.inventories || []
        );
        setProducts(allInventories);
      });
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = Math.ceil(el.scrollLeft);
    const scrollRight = el.scrollWidth - el.clientWidth - scrollLeft;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollRight > 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    updateScrollButtons();
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [products]);

  const getCardWidth = () => {
    const el = scrollRef.current;
    if (!el) return 216;
    const card = el.querySelector("div > div"); // thẻ đầu tiên trong scrollRef
    if (!card) return 216;
    const style = window.getComputedStyle(card as HTMLElement);
    const marginRight = parseInt(style.marginRight || "16", 10);
    return (card as HTMLElement).offsetWidth + marginRight;
  };

  const scrollByAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    el.scrollBy({ left: cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  const scrollBackAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    el.scrollBy({ left: -cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-2xl font-semibold mb-2 text-[#921573] p-2 rounded w-[21%] text-center">
        Có thể bạn cũng thích
      </h2>

      <div className="relative max-w-[1296px] mx-auto">
        {" "}
        {/* NEW */}
        {/* Nút trái */}
        {canScrollLeft && (
          <button
            onClick={scrollBackAmount}
            className="absolute left-0 top-[50%] z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
        )}
        {/* Container cuộn ngang */}
        <div
          ref={scrollRef}
          className="flex gap-4 scroll-smooth overflow-x-auto scrollbar-hide"
          style={{
            width: `${ITEMS_PER_PAGE * 216}px`, // 200px card + 16px gap
            margin: "0 auto",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] max-w-[200px] flex-shrink-0 border border-gray-200 rounded-xl p-2"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* Nút phải */}
        {canScrollRight && (
          <button
            onClick={scrollByAmount}
            className="absolute right-0 top-[50%] z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inventory } from "@/app/types/Product";
import ProductCard from "../components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState<Inventory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products = res.data || [];
        const allInventories: Inventory[] = products
          .flatMap((p: { inventories: Inventory[] }) => p.inventories || [])
          .sort((a: { id: number; }, b: { id: number; }) => b.id - a.id); // 👉 mới nhất trước

        setAllProducts(allInventories);
      })
      .catch((err) => console.error("Lỗi tải products:", err));
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
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
  }, [allProducts]);

  const scrollByAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220; // 16 là gap giả định
    el.scrollBy({ left: cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  const scrollBackAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220;
    el.scrollBy({ left: -cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Nút trái - ẩn trên mobile */}
      {canScrollLeft && (
        <button
          onClick={scrollBackAmount}
          className="flex absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Container cuộn ngang */}
      <div
        ref={scrollRef}
        className="
      flex gap-x-3 sm:gap-x-4 
      overflow-x-auto scroll-smooth scrollbar-hide 
      px-2 sm:px-4
      touch-pan-x snap-x snap-mandatory
    "
      >
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="
          flex-shrink-0 
          w-[calc(50%-0.375rem)]   /* 2 sản phẩm/1 hàng mobile */
          sm:w-[clamp(140px,25vw,195px)]
          border border-gray-200 rounded-xl 
          p-2 bg-white
          snap-start
        "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Nút phải - ẩn trên mobile */}
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

export default ListProduct;

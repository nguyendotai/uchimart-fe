"use client";
import React, { useEffect, useRef, useState } from "react";
import { Brand } from "@/app/types/Brand";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BrandHome = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/brands")
      .then((res) => res.json())
      .then((data) => {
        const brandList: Brand[] = data.data ?? data;
        setBrands(brandList);
      })
      .catch((err) => console.error("Lỗi load brands:", err));
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
  }, [brands]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 150; // 16 = gap
    el.scrollBy({
      left: direction === "right" ? cardWidth * 5 : -cardWidth * 5,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-hidden bg-white shadow rounded-xl p-2">

      {/* Nút trái */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount("left")}
          className="flex absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Thanh cuộn ngang */}
      <div
        ref={scrollRef}
        className="flex gap-x-3 overflow-x-auto scroll-smooth scrollbar-hide px-1 touch-pan-x snap-x snap-mandatory"
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex-shrink-0 w-[100px] sm:w-[140px] snap-start "
          >
            <Link
              href={`/brand/${brand.id}`}
              className="block text-center bg-gray-100 hover:bg-[#921573] hover:text-white transition-colors duration-200 rounded-lg px-3 py-2 font-medium text-sm"
            >
              {brand.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Nút phải */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount("right")}
          className="flex absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default BrandHome;

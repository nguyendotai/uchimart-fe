"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inventory, Product } from "@/app/types/Product";
import ProductCard from "@/app/components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductSuggestions() {
  const [products, setProducts] = useState<Inventory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Hàm cập nhật trạng thái các nút
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 4; // Ngưỡng để xác định đã cuộn hết hay chưa

    // Kiểm tra xem có thể cuộn sang trái không
    setCanScrollLeft(el.scrollLeft > threshold);
    // Kiểm tra xem có thể cuộn sang phải không
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - threshold
    );
  };

  // Effect để fetch dữ liệu
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        const allInventories: Inventory[] =
          res.data?.flatMap((p) => p.inventories || []) || [];
        setProducts(allInventories);
      });
  }, []);

  // Effect để cập nhật trạng thái nút sau khi render
  useEffect(() => {
    const el = scrollRef.current;

    // Đảm bảo gọi sau khi DOM đã render xong
    const raf = requestAnimationFrame(() => {
      updateScrollButtons();
    });

    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (el) {
        el.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, [products]);
  // Chạy lại effect khi danh sách sản phẩm thay đổi

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Lấy kích thước thẻ sản phẩm
    const card = el.querySelector("div > div");
    if (!card) return;

    const cardEl = card as HTMLElement;
    const cardStyle = window.getComputedStyle(cardEl);
    const cardWidth =
      cardEl.offsetWidth + parseInt(cardStyle.marginRight || "16", 10);

    // Tính toán số lượng thẻ có thể cuộn
    const containerWidth = el.clientWidth;
    const itemsPerView = Math.floor(containerWidth / cardWidth);
    const scrollAmount = cardWidth * itemsPerView;

    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-2xl font-semibold mb-2 text-[#921573] p-2 rounded w-fit ">
        Có thể bạn cũng thích
      </h2>

      <div className="relative max-w-[1296px] mx-auto overflow-hidden">
        {/* Nút trái */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Container cuộn */}
        <div
          ref={scrollRef}
          className="flex gap-4 scroll-smooth overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start min-w-[200px] max-w-[200px] flex-shrink-0 border border-gray-200 rounded-xl p-2"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Nút phải */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

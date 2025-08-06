"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ListSaleProduct() {
  const [saleProducts, setSaleProducts] = useState<Inventory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        const products = res.data || [];
        const inventoriesWithSub: Inventory[] = products.flatMap((p) =>
          p.inventories.map((inv) => ({
            ...inv,
            subcategories: p.subcategories,
            unit: undefined,
          }))
        );

        const filtered = inventoriesWithSub.filter((inv) => {
          const sale = formatCurrencyToNumber(inv.sale_price);
          const promo = formatCurrencyToNumber(inv.offer_price ?? "0");
          return !isNaN(sale) && !isNaN(promo) && promo > 0 && promo < sale;
        });

        setSaleProducts(filtered);
      });
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 5;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - threshold
    );
  };

  useEffect(() => {
    const el = scrollRef.current;
    const raf = requestAnimationFrame(() => {
      updateScrollButtons();
    });

    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [saleProducts]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector("div > div");
    if (!card) return;

    const cardEl = card as HTMLElement;
    const cardStyle = window.getComputedStyle(cardEl);
    const cardWidth =
      cardEl.offsetWidth + parseInt(cardStyle.marginRight || "16", 10);

    const containerWidth = el.clientWidth;
    const itemsPerView = Math.floor(containerWidth / cardWidth);
    const scrollAmount = cardWidth * itemsPerView;

    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (saleProducts.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden mt-6">
      <h2 className="text-2xl font-semibold mb-2 text-[#921573] p-2 rounded w-fit mx-auto text-center">
        Sản phẩm khuyến mãi
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

        {/* Vùng cuộn ngang */}
        <div
          ref={scrollRef}
          className="flex gap-4 scroll-smooth overflow-x-auto scrollbar-hide px-2 snap-x snap-mandatory"
        >
          {saleProducts.map((product) => (
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

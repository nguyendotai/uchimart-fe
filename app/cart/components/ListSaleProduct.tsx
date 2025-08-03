"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

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
  }, [saleProducts]);

  const getCardWidth = () => {
    const el = scrollRef.current;
    if (!el) return 216;
    const card = el.querySelector("div > div");
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

  if (saleProducts.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden mt-6">
      <h2 className="text-2xl font-semibold mb-2 text-[#921573] p-2 rounded w-fit text-center">
        Sản phẩm khuyến mãi
      </h2>

      <div className="relative max-w-[1296px] mx-auto">
        {/* Nút trái */}
        {canScrollLeft && (
          <button
            onClick={scrollBackAmount}
            className="absolute left-0 top-[50%] z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Vùng cuộn ngang */}
        <div
          ref={scrollRef}
          className="flex gap-4 scroll-smooth overflow-x-auto scrollbar-hide"
          style={{
            width: `${ITEMS_PER_PAGE * 216}px`,
            margin: "0 auto",
          }}
        >
          {saleProducts.map((product) => (
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

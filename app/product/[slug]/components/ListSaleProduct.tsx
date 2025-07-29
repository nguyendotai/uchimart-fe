"use client";
import React, { useEffect, useRef, useState } from "react";
import { Inventory, Product } from "@/app/types/Product";
import { formatCurrencyToNumber } from "@/app/utils/helpers";
import ProductCard from "@/app/components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  currentProduct: Product;
  allProducts: Inventory[];
};

const ITEMS_PER_PAGE = 4;

const ListSaleProduct = ({ currentProduct, allProducts }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Lọc sản phẩm giảm giá (ngoại trừ currentProduct)
  const related = allProducts
    .filter((p) => {
      if (p.product_id === currentProduct.id) return false;

      const salePrice = formatCurrencyToNumber(p.sale_price);
      const offerPrice = formatCurrencyToNumber(p.offer_price ?? "0");

      return !isNaN(salePrice) && !isNaN(offerPrice) && offerPrice > 0 && offerPrice < salePrice;
    })
    .slice(0, 10);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
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
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220;
    el.scrollBy({ left: cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  const scrollBackAmount = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 220;
    el.scrollBy({ left: -cardWidth * ITEMS_PER_PAGE, behavior: "smooth" });
  };

  if (related.length === 0) return null;

  return (
    <div className="mt-6 relative">
      <h2 className="text-xl font-semibold mb-4 text-[#921573] pl-2">
        Sản phẩm đang khuyến mãi
      </h2>

      {/* Nút trái */}
      {canScrollLeft && (
        <button
          onClick={scrollBackAmount}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Danh sách cuộn */}
      <div
        ref={scrollRef}
        className="flex gap-4 scroll-smooth overflow-x-auto scrollbar-hide px-2"
      >
        {related.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-white shadow rounded-xl p-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Nút phải */}
      {canScrollRight && (
        <button
          onClick={scrollByAmount}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default ListSaleProduct;

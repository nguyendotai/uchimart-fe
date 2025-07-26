"use client";
import React, { useEffect, useState, useRef } from "react";
import { Product } from "@/app/types/Product";
import ProductCard from "../components/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
        const allInventories = products.flatMap(
          (p: { inventories: any[] }) => p.inventories || []
        );
        setAllProducts(allInventories);
      })
      .catch((err) => console.error("Lỗi tải products:", err));
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollButtons);
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
    };
  }, [allProducts]);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative rounded-xl">

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {allProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="max-w-[200px] flex-shrink-0 bg-white shadow rounded-xl p-2"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-1000)}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(1000)}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListProduct;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Brand } from "@/app/types/Brand";
import Link from "next/link";

const BrandHome = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // state để track kéo
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/brands")
      .then((res) => res.json())
      .then((data) => {
        const brandList: Brand[] = data.data ?? data;
        setBrands(brandList);
      })
      .catch((err) => console.error("Lỗi load brands:", err));
  }, []);

  // Hàm bắt đầu kéo
  const startDrag = (clientX: number) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = clientX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  // Hàm kéo
  const doDrag = (clientX: number, e?: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e?.preventDefault(); // chặn scroll trang
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Hàm dừng kéo
  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative w-full overflow-hidden bg-white shadow rounded-xl p-2">
      {/* Thanh cuộn ngang với drag */}
      <div
        ref={scrollRef}
        className="flex gap-x-3 overflow-x-auto scroll-smooth items-center scrollbar-hide px-1 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        // Chuột
        onMouseDown={(e) => startDrag(e.pageX)}
        onMouseMove={(e) => doDrag(e.pageX, e)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        // Cảm ứng
        onTouchStart={(e) => startDrag(e.touches[0].pageX)}
        onTouchMove={(e) => doDrag(e.touches[0].pageX, e)}
        onTouchEnd={stopDrag}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex-shrink-0 w-[100px] sm:w-[140px] snap-start"
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
    </div>
  );
};

export default BrandHome;

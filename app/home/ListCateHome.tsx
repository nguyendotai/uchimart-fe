"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryGroup } from "@/app/types/Category";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ListCateHome = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category-groups")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setGroups(json.data ?? []);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch category groups:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  }, [groups]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector("div > div");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 16 : 120;
    const scrollAmount = direction === "right" ? cardWidth * 4 : -cardWidth * 4;

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleGroupClick = (groupId: number) => {
    router.push(`/product?category=${groupId}`);
  };

  if (isLoading) return null;

  return (
    <div className="bg-white shadow rounded-xl p-4 relative">
      {/* Nút trái */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount("left")}
          className="hidden sm:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 sm:p-3 rounded-full"
        >
          <FaChevronLeft size={16} />
        </button>
      )}

      {/* Danh sách nhóm danh mục */}
      <div
        ref={scrollRef}
        className="
    flex gap-3 sm:gap-4 
    overflow-x-auto scroll-smooth scrollbar-hide px-1 sm:px-2
    touch-pan-x snap-x snap-mandatory
  "
      >
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className="
        flex-shrink-0 
        w-[72px] sm:w-[90px] cursor-pointer 
        snap-start
      "
          >
            <div className="bg-white text-center p-2 rounded transition hover:shadow-md">
              <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] mx-auto mb-1 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={group.image || "/default.png"}
                  alt={group.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[11px] sm:text-sm truncate">
                {group.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút phải */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount("right")}
          className="hidden sm:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow p-2 sm:p-3 rounded-full"
        >
          <FaChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default ListCateHome;

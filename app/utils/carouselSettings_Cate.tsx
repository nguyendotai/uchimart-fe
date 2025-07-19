// components/UI/carouselSettings.tsx hoặc utils/carouselSettings.tsx
"use client";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import React from "react";

export function PrevArrow({ style, onClick }: any) {
  return (
    <div
      className="z-40 !left-[-10px] absolute top-1/2 transform -translate-y-1/2 group"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <button
        className="opacity-30 group-hover:opacity-100 transition-opacity duration-300
                   text-4xl w-10 h-10 bg-white text-[#921573] 
                   hover:bg-[#921573] hover:text-white hover:border-[#921573] hover:border rounded-full shadow flex items-center justify-center"
      >
        <MdOutlineNavigateBefore />
      </button>
    </div>
  );
}

export function NextArrow({ style, onClick }: any) {
  return (
    <div
      className="z-50 !right-[-10px] absolute top-1/2 transform -translate-y-1/2 group"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <button
        className="opacity-30 group-hover:opacity-100 transition-opacity duration-300
                   text-4xl w-10 h-10 bg-white text-[#921573] 
                   hover:bg-[#921573] hover:text-white hover:border-[#921573] hover:border rounded-full shadow flex items-center justify-center"
      >
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
}

// Cấu hình carousel chung
export const productCarouselSettings_Cate = {
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplay: true,
  autoplaySpeed: 6000,
};

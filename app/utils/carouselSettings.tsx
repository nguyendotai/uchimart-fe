// components/UI/carouselSettings.tsx hoặc utils/carouselSettings.tsx
"use client";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import React from "react";

export function PrevArrow({ style, onClick }: any) {
  return (
    <div
      className="z-50 !left-[-25px] absolute top-1/2 transform -translate-y-1/2"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <button className="text-4xl w-10 h-10 bg-white text-[#921573] border border-[#921573] hover:bg-[#921573] hover:text-white transition-colors duration-300 rounded-full shadow flex items-center justify-center">
        <MdOutlineNavigateBefore />
      </button>
    </div>
  );
}

export function NextArrow({ style, onClick }: any) {
  return (
    <div
      className="z-50 !right-[-25px] absolute top-1/2 transform -translate-y-1/2"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <button className="text-4xl w-10 h-10 bg-white text-[#921573] border border-[#921573] hover:bg-[#921573] hover:text-white transition-colors duration-300 rounded-full shadow flex items-center justify-center">
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
}

// Cấu hình carousel chung
export const productCarouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplay: true,
  autoplaySpeed: 3000,
};

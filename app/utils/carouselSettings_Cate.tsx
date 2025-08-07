// components/UI/carouselSettings.tsx hoặc utils/carouselSettings.tsx
"use client";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import React from "react";

export function PrevArrow({ style, onClick }: any) {
  return (
    <div
      className="z-40 !left-[-10px] absolute top-1/2 transform -translate-y-1/2 group hidden sm:block"
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
      className="z-50 !right-[-10px] absolute top-1/2 transform -translate-y-1/2 group hidden sm:block"
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
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  swipeToSlide: true,
  touchMove: true,
  autoplay: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 6,
        arrows: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        arrows: false, // ẩn mũi tên trên mobile
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2.5,
        arrows: false, // mobile nhỏ
      },
    },
  ],
};

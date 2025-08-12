"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Banner = {
  id: number;
  desktop_image: string;
  redirect_url: string;
};

const sliceVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => setBanners(json.data))
      .catch((err) => console.error("Lỗi tải banners:", err))
      .finally(() => setIsLoading(false));
  }, [isClient]);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  if (isLoading) {
    return (
      <div className="w-full aspect-[4/1] bg-gray-200 animate-pulse rounded-xl shadow"></div>
    );
  }

  if (!isClient || banners.length === 0) return null;

  const currentBanner = banners[index];
  if (!currentBanner) return null;

  return (
    <div className="relative w-full aspect-[4/1] md:aspect-[16/4] rounded-xl bg-white shadow flex justify-center items-center">
      {/* Nút mũi tên trái */}
      <button
        onClick={goPrev}
        className="absolute hidden md:left-1 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <IoIosArrowBack size={24} />
      </button>

      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={sliceVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <a
              href={currentBanner.redirect_url}
              className="block w-full h-full relative rounded-lg overflow-hidden"
              target="_blank"
            >
              <Image
                src={currentBanner.desktop_image}
                alt={`banner ${index + 1}`}
                fill
                className="object-cover"
              />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nút mũi tên phải */}
      <button
        onClick={goNext}
        className="absolute hidden md:right-1 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <IoIosArrowForward size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            className={`min-w-[16px] h-[4px] rounded-full transition-all duration-300 ${
              i === index ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

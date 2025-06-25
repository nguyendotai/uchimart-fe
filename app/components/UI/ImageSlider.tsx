"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Banner = {
  id: number;
  desktop_image: string; // URL ảnh hiển thị
  redirect_url: string; // URL để chuyển hướng khi click
};

const sliceVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setBanners(json.data);
      })
      .catch((err) => {
        console.error("Lỗi tải banners:", err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  const img1 = banners[index % banners.length];
  const img2 = banners[(index + 1) % banners.length];

  return (
    <div className="relative w-full h-[450px] rounded-xl bg-[#fff] flex justify-center items-center">
      {/* Vùng chứa slider */}
      <div className="relative w-[93%] h-[80%] rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={sliceVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex gap-x-4 w-full h-full p-2"
          >
            {img1 && (
              <a
                href={img1.redirect_url}
                className="w-1/2 h-full relative rounded-lg overflow-hidden"
                target="_blank"
              >
                <Image
                  src={img1.desktop_image}
                  alt="banner 1"
                  fill
                  className="object-cover"
                />
              </a>
            )}
            {img2 && (
              <a
                href={img2.redirect_url}
                className="w-1/2 h-full relative rounded-lg overflow-hidden"
                target="_blank"
              >
                <Image
                  src={img2.desktop_image}
                  alt="banner 2"
                  fill
                  className="object-cover"
                />
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {Array.from({ length: Math.ceil(banners.length / 2) }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-1 rounded-full transition-all duration-300 ${
              i === Math.floor(index / 2)
                ? "bg-blue-600 scale-110"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

  useEffect(() => {
    setIsClient(true); // Xác nhận đã ở phía client
  }, []);

  useEffect(() => {
    if (!isClient) return;
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setBanners(json.data);
      })
      .catch((err) => {
        console.error("Lỗi tải banners:", err);
      });
  }, [isClient]);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  // ❌ Tránh render sớm trước khi client load và banners có dữ liệu
  if (!isClient || banners.length === 0) return null;

  const currentBanner = banners[index % banners.length];
  if (!currentBanner) return null;

  return (
    <div className="relative w-full h-[450px] rounded-xl bg-[#fff] flex justify-center items-center">
      <div className="relative w-[93%] h-[82%] rounded-xl overflow-hidden">
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
              />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

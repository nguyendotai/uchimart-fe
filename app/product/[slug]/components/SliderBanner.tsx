"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Banner = {
  id: number;
  desktop_image: string;
  redirect_url: string;
};

const imageVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function SliderBanner() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => res.json())
      .then((json) => {
        setBanners(json.data);
      })
      .catch((err) => {
        console.error("Lỗi tải banners:", err);
      });
  }, []);

  // Auto chuyển slide
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] rounded-xl bg-white flex justify-center items-center overflow-hidden mt-4">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <a href={banners[index].redirect_url}>
              <Image
                src={banners[index].desktop_image}
                alt={`Slide ${index}`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

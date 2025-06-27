"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/download (1).jfif",
  "/download (2).jfif",
  "/download (3).jfif",
  "/download.jfif",
];

const imageVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function SliderBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Đổi ảnh sau mỗi 5s
    return () => clearInterval(interval);
  }, []);

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
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`Slide ${index}`}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

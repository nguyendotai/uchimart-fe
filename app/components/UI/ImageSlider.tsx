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

const sliceVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const img1 = images[index % images.length];
  const img2 = images[(index + 1) % images.length];

  return (
    <div className="relative w-full h-[450px] rounded-xl bg-[#ffff] flex justify-center items-center">
      {/* Vùng chứa slider */}
      <div className="relative w-[93%] h-[80%] rounded-xl overflow-hidden ">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={sliceVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex gap-x-4 w-full h-full p-2"
          >
            <div className="w-1/2 h-full relative rounded-lg overflow-hidden">
              <Image src={img1} alt="img1" fill className="object-cover" />
            </div>
            <div className="w-1/2 h-full relative rounded-lg overflow-hidden">
              <Image src={img2} alt="img2" fill className="object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vùng chứa dấu gạch dưới */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[5%] z-10 flex gap-1">
        {Array.from({ length: Math.ceil(images.length / 2) }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i === Math.floor(index / 2) ? "bg-blue-500" : "bg-gray-400"}`}
            style={{
              width: `${100 / Math.ceil(images.length / 2)}%`, // Tính toán chiều dài phần
            }}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Banner = {
  id: number;
  desktop_image: string;
  redirect_url: string;
};

const PromotionalBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/banners")
      .then((res) => res.json())
      .then((json) => {
        const data: Banner[] = json.data ?? [];
        setBanners(data);
      })
      .catch((err) => {
        console.error("Lỗi tải banners:", err);
      });
  }, []);

  // useEffect(() => {
  //   if (banners.length === 0) return;
  //   const timer = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % banners.length);
  //   }, 4000);
  //   return () => clearInterval(timer);
  // }, [banners]);

  const visibleBanners = isMobile
    ? [banners[index]].filter(Boolean) // lọc undefined
    : [
        banners[index],
        banners[(index + 1) % banners.length],
        banners[(index + 2) % banners.length],
      ].filter(Boolean);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Các khuyến mãi khác</h2>
      <div className="overflow-hidden w-full">
        <AnimatePresence mode="popLayout">
          <motion.ul className="flex gap-2">
            {visibleBanners.map((b, i) => (
              <motion.li
                key={b.id ?? i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition ${
                  isMobile ? "min-w-full h-40" : "w-1/3 h-40"
                }`}
              >
                <Link href={b.redirect_url || "#"}>
                  <Image
                    src={b.desktop_image || "/placeholder.jpg"}
                    alt={`Banner ${b.id}`}
                    fill
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PromotionalBanners;

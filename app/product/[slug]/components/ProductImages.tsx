"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inventory, Product } from "@/app/types/Product";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ProductImagesProps {
  inventory: Inventory;
  product: Product;
}

const ProductImages = ({ inventory, product }: ProductImagesProps) => {
  const fallbackImage = "/fallback.jpg";

  // 👉 Gom ảnh nhỏ: inventory.image + product.media
  const thumbnails = [inventory.image, ...(product.media || [])].filter(
    Boolean
  );

  const [mainImage, setMainImage] = useState<string>(
    inventory.image || product.primary_image || fallbackImage
  );

  // 👉 Helper: trạng thái tồn kho
  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return {
        text: "Hết hàng",
        color: "bg-red-100 text-red-600",
        icon: <FaTimesCircle className="inline-block mr-1" />,
        aria: "Out of stock",
      };
    if (quantity < 5)
      return {
        text: "Sắp hết",
        color: "bg-yellow-100 text-yellow-600",
        icon: <FaExclamationTriangle className="inline-block mr-1" />,
        aria: "Low stock",
      };
    return {
      text: "Còn hàng",
      color: "bg-green-100 text-green-600",
      icon: <FaCheckCircle className="inline-block mr-1" />,
      aria: "In stock",
    };
  };

  const stockStatus = getStockStatus(inventory.stock_quantity || 0);

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* Thumbnail bên trái (desktop) */}
      <div className="w-[14%] hidden sm:flex flex-col gap-3">
        {thumbnails.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img!)}
            className={`border border-gray-200 rounded-xl overflow-hidden ${
              mainImage === img ? "ring-2 ring-[#921573]" : ""
            }`}
          >
            <Image
              src={img || fallbackImage}
              alt={`thumb-${idx}`}
              width={100}
              height={100}
              className="object-contain w-full h-auto"
            />
          </button>
        ))}
      </div>

      {/* Ảnh chính */}
      <div className="w-full sm:w-[86%]">
        {/* 👉 Mobile: Slider có dot */}
        <div className="sm:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-xl border border-gray-200"
          >
            {thumbnails.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[320px]">
                  <Image
                    src={img || fallbackImage}
                    alt={`slide-${idx}`}
                    fill
                    className="object-contain rounded-xl"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 👉 Desktop: ảnh chính cố định */}
        <div className="relative w-full min-h-[300px] sm:min-h-[440px] rounded-xl border border-gray-200 overflow-hidden hidden sm:block">
          <Image
            src={mainImage || fallbackImage}
            alt={inventory.title || product.name}
            fill
            className="object-contain rounded-xl"
            unoptimized
          />
        </div>

        {/* Trạng thái số lượng */}
        <div className="mt-2">
          <motion.span
            className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm ${stockStatus.color} transition-all duration-300 hover:shadow-md hover:scale-105`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-label={stockStatus.aria}
          >
            {stockStatus.icon}
            {stockStatus.text}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

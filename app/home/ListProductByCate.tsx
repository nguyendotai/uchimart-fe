"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ui/ProductCard";
import { Category } from "@/app/types/Category";
import { Product } from "@/app/types/Product";
import { productCarouselSettings } from "@/app/utils/carouselSettings"; // đường dẫn phù hợp

const ListProductByCate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageMap, setPageMap] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi categories: ${res.status}`);
        return res.json() as Promise<Category[]>;
      })
      .then((dataCate) => {
        setCategories(dataCate);
        return fetch("/data/products.json");
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi products: ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((dataProd) => {
        setProducts(dataProd);
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu:", err);
      });
  }, []);

  return (
    <>
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (p) => p.category_id === category.id
        );
        if (filteredProducts.length === 0) return null;

        const currentPage = pageMap[category.id] || 0;
        const startIndex = currentPage * 6;
        const visibleProducts = filteredProducts.slice(
          startIndex,
          startIndex + 6
        );

        return (
          <div key={category.id} className="w-full space-y-4">
            {/* Banner nằm trên */}
            <div className="w-full h-[120px] rounded-lg overflow-hidden relative bg-[#f3e5f5]">
              {/* Trái: ảnh danh mục */}
              <div className="w-[40%]">
                <img
                  src={category.imgLarge}
                  alt={category.name}
                  className="w-full h-[120px] object-cover rounded"
                />
              </div>
              <div className="w-[60%]"></div>
            </div>

            {/* Danh sách sản phẩm */}
            <Slider {...productCarouselSettings}>
              {visibleProducts.map((product) => (
                <div key={product.id} className="px-2">
                  <div
                    className="bg-white shadow rounded-xl p-2 h-full"
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </Slider>

            {/* Nút Xem tất cả */}
            <div className="flex justify-center mt-2">
              <a href="#" className="text-[#921573] hover:underline font-medium">
                Xem tất cả
              </a>
            </div>

            <hr className="border-gray-300 mt-4" />
          </div>
        );
      })}
    </>
  );
};

export default ListProductByCate;

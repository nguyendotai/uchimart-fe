"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inventory, Product } from "@/app/types/Product";
import ProductCard from "@/app/components/ui/ProductCard"; // chỉnh lại nếu đường dẫn khác
import { productCarouselSettings_7 } from "@/app/utils/carouselSettings_7";

export default function ProductSuggestions() {
  const [products, setProducts] = useState<Inventory[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products") // gọi API lấy tất cả sản phẩm (hoặc tùy chỉnh nếu có lọc backend)
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        const products = res.data || [];
        const allInventories: Inventory[] = products.flatMap(
          (p: { inventories: Inventory[] }) => p.inventories || []
        );
        setProducts(allInventories); // lấy 4 sản phẩm bán chạy nhất
      });
  }, []);

  if (products.length === 0) return null;

  return (
    <>
      <h2 className="text-3xl font-semibold mb-2 text-[#921573] p-2 rounded w-[21%] text-center">
        Có thể bạn cũng thích
      </h2>
      <Slider {...productCarouselSettings_7}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-white shadow rounded-xl p-2 h-full">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

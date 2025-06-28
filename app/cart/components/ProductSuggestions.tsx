"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import ProductCard from "@/app/components/UI/ProductCard"; // chỉnh lại nếu đường dẫn khác

export default function ProductSuggestions() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json") // gọi API lấy tất cả sản phẩm (hoặc tùy chỉnh nếu có lọc backend)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data.slice(0, 5)); // lấy 4 sản phẩm bán chạy nhất
      });
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-2 text-[#921573] p-2 bg-white rounded w-[21%] text-center">
        Có thể bạn cũng thích
      </h2>
      <ul className="flex justify-between items-center mt-6 w-full">
        {products.map((product) => (
          <li
            className="w-[19%] bg-white shadow rounded-xl p-2"
            key={product.id}
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

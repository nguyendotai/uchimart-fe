"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/app/components/UI/ProductCard";
import { Product } from "@/app/types/Product";

const ListSaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((products) => {
        const filtered = products
          .filter(
            (p) =>
              p.promotion_price !== undefined && p.promotion_price < p.price
          )
          .slice(0, 5);
        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    
        <>
      <h2 className="text-3xl font-bold mb-2 text-[#921573] p-2 bg-white rounded w-[21%] text-center">
        Sản phẩm khuyến mãi
      </h2>
      <ul className="flex justify-between items-center mt-6 w-full">
        {saleProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow rounded-xl p-2 relative w-[19%]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      </>
    
  );
};

export default ListSaleProduct;

"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../UI/ProductCard";
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
              p.promotion_price !== undefined &&
              p.promotion_price < p.price
          )
          .slice(0, 8);
        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    <ul className="flex flex-wrap gap-4 justify-between">
      {saleProducts.map((product) => (
        <li
          key={product.id}
          className="bg-white shadow rounded-xl p-2 relative w-[24%]"
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ListSaleProduct;

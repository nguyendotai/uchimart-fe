"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../UI/ProductCard";
import { Product } from "@/app/types/Product";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((products) => {
        setAllProducts(products);
      })
      .catch((err) => {
        console.error("Lỗi tải products:", err);
      });
  }, []);

  return (
    <ul className="flex flex-wrap gap-4 justify-between">
      {allProducts.slice(0, 10).map((product) => (
        <li
          key={product.id}
          className="bg-white shadow rounded-xl p-2 relative w-[19%]"
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ListProduct;

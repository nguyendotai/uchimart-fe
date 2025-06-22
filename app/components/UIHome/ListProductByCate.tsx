"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { Category } from "@/app/types/Category";
import { Product } from "@/app/types/Product";

const ListProductByCate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

        const productsToShow = filteredProducts.slice(0, 8);
        const firstRowProducts = productsToShow.slice(0, 3);
        const secondRowProducts = productsToShow.slice(3, 8);

        return (
          <div key={category.id} className="w-full rounded-md space-y-4">
            <div className="grid grid-rows-2 grid-cols-5 gap-4">
              <div className="row-start-1 col-span-2 bg-amber-200 rounded overflow-hidden relative flex items-center justify-center">
                <img
                  src={category.imgLarge}
                  alt={category.name}
                  className="w-full max-h-[400px] object-contain rounded"
                />
              </div>

              {firstRowProducts.map((product) => (
                <div
                  key={product.id}
                  className="row-start-1 bg-white shadow rounded-xl p-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}

              {secondRowProducts.map((product) => (
                <div
                  key={product.id}
                  className="row-start-2 bg-white shadow rounded-xl p-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <span className="flex justify-center w-[12%] bg-[#921573] text-white shadow rounded-sm p-2">
                Xem Thêm
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListProductByCate;

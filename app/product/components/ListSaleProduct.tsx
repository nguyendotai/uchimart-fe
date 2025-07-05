"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ui_temp/ProductCard";
import { Product } from "@/app/types/Product";

interface Props {
  categoryId: number;
}

const ListSaleProduct = ({ categoryId }: Props) => {
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
              p.price !== undefined &&
              p.price > p.promotion_price &&
              p.category_id === categoryId
          )
          .slice(0, 5);
        setSaleProducts(filtered);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, [saleProducts, categoryId]);

  return (
    <div className="bg-[#FED7D7] shadow rounded-xl p-6 relative flex justify-center">
      <span className="absolute top-0 left-0 py-2 px-4 font-medium text-xl bg-red-500 text-white rounded-tl-xl rounded-br-xl">
        Khuyến mãi HOT
      </span>
      <div className="flex justify-between items-center mt-10 w-full">
        {saleProducts.map((product) => (
          <div
            key={product.id}
            className="w-[18.7%] bg-white shadow rounded-xl p-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSaleProduct;

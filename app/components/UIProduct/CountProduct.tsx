"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";

type Props = {
  categoryId?: number | null;
  categoryName?: string;
};

const CountProduct = ({
  categoryId = null,
  categoryName = "tất cả danh mục",
}: Props) => {
  const [count, setCount] = useState<number>(0); 
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        const filtered = categoryId
          ? data.filter((product) => Number(product.category_id) === Number(categoryId)) // ép kiểu cho chắc
          : data;
        setCount(filtered.length);
      })
      .catch((err) => {
        console.error("Lỗi khi đếm sản phẩm:", err);
      });
  }, [categoryId]);

  return (
    <p className="p-2 text-gray-600 text-sm italic mt-1">
      Có <span className="font-semibold">{count}</span> sản phẩm trong {categoryName}
    </p>
  );
};

export default CountProduct;

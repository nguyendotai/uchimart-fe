"use client";
import React, { useEffect, useState } from "react";
import { Product, Inventory } from "@/app/types/Product";

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
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const data: Product[] = res.data ?? [];

        // Lấy ra toàn bộ inventory, và gắn subcategories từ product
        const inventories: Inventory[] = data.flatMap((product) =>
          product.inventories.map((inv) => ({
            ...inv,
            subcategories: product.subcategories,
            product,
          }))
        );

        const filtered = inventories.filter((item) => {
          if (!categoryId) return true;

          // Sửa: Kiểm tra theo category_group.id
          return (
            item.subcategories?.some(
              (sub) => sub.category?.category_group?.id === categoryId
            ) ?? false
          );
        });

        setCount(filtered.length);
      })
      .catch((err) => {
        console.error("Lỗi khi đếm sản phẩm:", err);
      });
  }, [categoryId]);

  return (
    <p className="p-2 text-gray-600 text-sm italic mt-1">
      Có <span className="font-semibold">{count}</span> sản phẩm trong{" "}
      {categoryName}
    </p>
  );
};

export default CountProduct;

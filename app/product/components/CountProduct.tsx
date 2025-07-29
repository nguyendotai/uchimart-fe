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
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const data = res.data;
        if (!Array.isArray(data)) return;

        // Lấy danh sách tất cả inventories
        const inventories: Product[] = data.flatMap(
          (p: { inventories: Product[] }) => p.inventories || []
        );

        const filtered = categoryId
          ? inventories.filter(
              (item) =>
                item?.subcategories?.[0]?.category?.id === Number(categoryId)
            )
          : inventories;

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

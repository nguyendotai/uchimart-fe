"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { Product } from "@/app/types/Product";

type Props = {
  categoryId: number;
  categoryName: string;
  sortBy: string;
};

const CategoryProductPreview = ({
  categoryId,
  categoryName,
  sortBy,
}: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        if (!Array.isArray(data)) return;
        const filtered = data.filter(
          (product) => Number(product.category_id) === Number(categoryId)
        );
        const sorted = [...filtered];
        switch (sortBy) {
          case "price-asc":
            sorted.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            sorted.sort((a, b) => b.price - a.price);
            break;
          case "best-seller":
            sorted.sort((a, b) => b.quantity - a.quantity); // dựa trên quantity
            break;
          case "newest":
            sorted.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
            break;
          default:
            break;
        }
        setAllProducts(sorted);
        setVisibleCount(4);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [categoryId, sortBy]);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const isExpanded =
    visibleCount >= allProducts.length && allProducts.length > 4;
  const handleToggle = () => {
    if (isExpanded) {
      setVisibleCount(4); // Thu gọn
    } else {
      setVisibleCount((prev) => prev + 4); // Xem thêm
    }
  };

  return (
    <div className="mb-6">
      <ul className="flex flex-wrap gap-6 ">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow rounded-xl p-2 relative w-[23.5%]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      {/* Nút xem thêm */}
      {allProducts.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={handleToggle}
            className="text-[#757575] bg-[#F9F6F1] text-sm p-3 rounded-3xl border hover "
          >
            {isExpanded ? "Thu gọn" : "Xem thêm sản phẩm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryProductPreview;

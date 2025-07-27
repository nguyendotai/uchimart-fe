"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { Product } from "@/app/types/Product";

type Props = {
  categoryId: number;
  categoryName: string;
  sortBy: string;
};

const CategoryProductPreview = ({ categoryId, sortBy }: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products = res.data || [];
        const inventories: Product[] = products.flatMap(
          (p: { inventories: Product[] }) => p.inventories || []
        );

        const filtered = inventories.filter(
          (product) => Number(product.category_id) === Number(categoryId)
        );

        const sorted = [...filtered];
        switch (sortBy) {
          case "price-asc":
            sorted.sort(
              (a, b) =>
                Number(a.purchase_price.replace(/[^\d]/g, "")) -
                Number(b.purchase_price.replace(/[^\d]/g, ""))
            );
            break;
          case "price-desc":
            sorted.sort(
              (a, b) =>
                Number(b.purchase_price.replace(/[^\d]/g, "")) -
                Number(a.purchase_price.replace(/[^\d]/g, ""))
            );
            break;
          case "best-seller":
            sorted.sort((a, b) => b.sold_count - a.sold_count);
            break;
          case "newest":
            sorted.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
            break;
        }

        setAllProducts(sorted);
        setVisibleCount(12); // reset khi thay đổi
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [categoryId, sortBy]);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="mb-6 p-2">
      {visibleProducts.length > 0 ? (
        <>
          <ul className="grid grid-cols-6 gap-4">
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className="bg-white shadow rounded-xl p-2 flex flex-col"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 font-medium text-[#7d125f] rounded underline transition"
              >
                Xem thêm
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 italic py-8">
          Không có sản phẩm nào trong danh mục này.
        </div>
      )}
    </div>
  );
};

export default CategoryProductPreview;

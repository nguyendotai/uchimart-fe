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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // nếu bạn muốn 2 hàng mỗi page

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
            sorted.sort((a, b) => b.quantity - a.quantity);
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
        setCurrentPage(1);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [categoryId, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = allProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-6">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-[#921573] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProductPreview;

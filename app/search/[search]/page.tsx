"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/Product";
import { Category } from "@/app/types/Category";
import ProductCard from "@/app/components/ui/ProductCard";

const SearchPage = () => {
  const { search } = useParams();
  const keyword = decodeURIComponent(String(search || "")).toLowerCase();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/products.json").then((res) => res.json()),
      fetch("/data/categories.json").then((res) => res.json()),
    ])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .catch((err) => console.error("Lỗi fetch dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  const matchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );

  const matchedCategoryIds = Array.from(
    new Set(matchedProducts.map((p) => p.category_id))
  );

  const matchedCategories = categories.filter((c) =>
    matchedCategoryIds.includes(c.id)
  );

  return (
    <div className="p-4 space-y-4">
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">
            Có {matchedProducts.length} sản phẩm theo từ khóa:{" "}
            <span className="text-[#921573] font-bold">"{keyword}"</span>
          </h2>

          <div className="flex gap-4 flex-wrap">
            {matchedCategories.map((cate) => (
              <span
                key={cate.id}
                className="px-3 py-1 rounded-full border text-sm text-[#921573] border-[#921573] bg-white hover:bg-[#921573] hover:text-white transition"
              >
                {cate.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {matchedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-2 rounded shadow 
        flex-[1_1_calc(16%-1rem)] 
        max-w-[calc(17%-1rem)] 
        min-h-[320px] 
        flex flex-col"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {matchedProducts.length === 0 && (
            <p className="text-gray-500 italic">Không tìm thấy sản phẩm nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;

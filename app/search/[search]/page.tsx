"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/Product";
import { CategoryGroup } from "@/app/types/Category";
import ProductCard from "@/app/components/ui/ProductCard";

const SearchPage = () => {
  const { search } = useParams();
  const keyword = decodeURIComponent(String(search || "")).toLowerCase();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/products.json").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/category-groups").then((res) =>
        res.json()
      ),
    ])
      .then(([productData, categoryGroupData]) => {
        setProducts(productData);
        setCategoryGroups(categoryGroupData.data ?? []);
      })
      .catch((err) => console.error("Lỗi fetch dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  const matchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );

  const matchedCategoryGroupIds = Array.from(
    new Set(matchedProducts.map((p) => p.category_group_id))
  );

  const matchedGroups = categoryGroups.filter((g) =>
    matchedCategoryGroupIds.includes(g.id)
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

          {/* Hiển thị các category group tương ứng */}
          <div className="flex gap-4 flex-wrap">
            {matchedGroups.map((group) => (
              <span
                key={group.id}
                className="px-3 py-1 rounded-full border text-sm text-[#921573] border-[#921573] bg-white hover:bg-[#921573] hover:text-white transition"
              >
                {group.name}
              </span>
            ))}
          </div>

          {/* Hiển thị sản phẩm */}
          <div className="grid grid-cols-6 gap-4">
            {matchedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow rounded-xl p-2 flex flex-col"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Nếu không tìm thấy */}
          {matchedProducts.length === 0 && (
            <p className="text-gray-500 italic">Không tìm thấy sản phẩm nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;

"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Inventory, CategoryGroup } from "@/app/types/Product";
import ProductCard from "@/app/components/ui/ProductCard";

const SearchPage = () => {
  const { search } = useParams();
  const keyword = decodeURIComponent(String(search || "")).toLowerCase();

  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/products").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/category-groups").then((res) =>
        res.json()
      ),
    ])
      .then(([productData, categoryGroupData]) => {
        const allInventories: Inventory[] = [];

        productData.data.forEach((product: any) => {
          product.inventories.forEach((inv: any) => {
            allInventories.push({
              ...inv,
              product,
            });
          });
        });

        setInventories(allInventories);
        setCategoryGroups(categoryGroupData.data ?? []);
      })
      .catch((err) => console.error("Lỗi fetch dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  const matchedInventories = inventories.filter((inv) =>
    inv.title.toLowerCase().includes(keyword)
  );

  const matchedCategoryGroupIds = Array.from(
    new Set(
      matchedInventories
        .map(
          (inv) => inv.product?.subcategories?.[0]?.category?.category_group?.id
        )
        .filter(Boolean)
    )
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
          <h2 className="text-xl font-medium">
            Có {matchedInventories.length} sản phẩm theo từ khóa:{" "}
            <span className="text-[#921573] font-bold">"{keyword}"</span>
          </h2>

          {/* Category Group */}
          <div className="flex gap-4 flex-wrap">
            {matchedGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm text-[#921573] border-[#921573] bg-white hover:bg-[#921573] hover:text-white transition"
              >
                {group.image && (
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                )}
                <span>{group.name}</span>
              </div>
            ))}
          </div>

          {/* Inventories */}
          <div className="grid grid-cols-6 gap-4">
            {matchedInventories.map((inv) => (
              <div
                key={inv.id}
                className="border border-gray-200 rounded-xl p-2 flex flex-col"
              >
                <ProductCard product={inv} />
              </div>
            ))}
          </div>

          {matchedInventories.length === 0 && (
            <p className="text-gray-500 italic">Không tìm thấy sản phẩm nào.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;

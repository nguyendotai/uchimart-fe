"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product } from "@/app/types/Product";
import { CategoryGroup, Category } from "@/app/types/Category";

const ListProductByCategoryChildren = () => {
  const searchParams = useSearchParams();
  const categoryGroupId = searchParams.get("category");

  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [productsByChild, setProductsByChild] = useState<
    Record<number, Product[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Lấy group chứa danh mục con
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        const json = await res.json();
        const allGroups: CategoryGroup[] = json.data ?? [];

        const foundGroup = allGroups.find(
          (g) => g.id === Number(categoryGroupId)
        );
        if (!foundGroup) return;

        const children: Category[] = foundGroup.categories || [];
        setChildCategories(children);

        // 2. Với mỗi danh mục con, fetch sản phẩm theo child_id
        const tempProducts: Record<number, Product[]> = {};
        for (const child of children) {
          const resProd = await fetch(`http://127.0.0.1:8000/api/products?child_id=${child.id}`);
          const prodJson = await resProd.json();
          tempProducts[child.id] = prodJson.data || [];
        }

        setProductsByChild(tempProducts);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm theo danh mục con:", err);
      }
    };

    if (categoryGroupId) {
      fetchData();
    }
  }, [categoryGroupId]);

  return (
    <div className="space-y-10 mt-8">
      {childCategories.map((child) => (
        <div key={child.id} className="w-full" id={`category-child-${child.id}`}>
          <h2 className="text-xl font-bold mb-4 text-[#921573]">
            {child.name}
          </h2>

          {productsByChild[child.id]?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsByChild[child.id].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Không có sản phẩm nào.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListProductByCategoryChildren;

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard";
import { Product, Inventory } from "@/app/types/Product";
import { CategoryGroup, Category } from "@/app/types/Category";

const ListProductByCategoryChildren = () => {
  const searchParams = useSearchParams();
  const categoryGroupId = searchParams.get("category");

  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [productsByChild, setProductsByChild] = useState<Record<number, Inventory[]>>({});
  const [loading, setLoading] = useState<boolean>(true); // ✅ state loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // bật loading

        // 1. Lấy danh sách nhóm danh mục
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        const json = await res.json();
        const allGroups: CategoryGroup[] = json.data ?? [];

        const foundGroup = allGroups.find((g) => g.id === Number(categoryGroupId));
        if (!foundGroup) {
          setLoading(false);
          return;
        }

        const children: Category[] = foundGroup.categories || [];
        setChildCategories(children);

        // 2. Lấy sản phẩm cho từng danh mục con
        const tempProducts: Record<number, Inventory[]> = {};

        for (const child of children) {
          const resProd = await fetch(`http://127.0.0.1:8000/api/products`);
          const prodJson = await resProd.json();
          const productList: Product[] = prodJson.data || [];

          const filteredProducts = productList.filter((product) =>
            product.subcategories.some((sub) => sub.category.id === child.id)
          );

          const inventories: Inventory[] = filteredProducts.flatMap((product) =>
            (product.inventories || []).map((inv) => ({
              ...inv,
              product,
              subcategories: product.subcategories,
              unit_type: inv.unit_type ?? "sp",
            }))
          );

          tempProducts[child.id] = inventories;
        }

        setProductsByChild(tempProducts);
        setLoading(false); // tắt loading khi dữ liệu về
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm theo danh mục con:", err);
        setLoading(false); // tắt loading nếu lỗi
      }
    };

    if (categoryGroupId) {
      fetchData();
    }
  }, [categoryGroupId]);

  if (loading) {
    // ✅ hiển thị spinner hoặc text loading
    return (
      <div className="flex justify-center items-center h-60">
        <span className="text-gray-500 text-lg animate-pulse">Đang tải sản phẩm...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10 mt-8">
      {childCategories.map((child) => (
        <div key={child.id} className="w-full" id={`category-child-${child.id}`}>
          <h2 className="text-xl font-bold mb-4 text-[#921573]">{child.name}</h2>

          {productsByChild[child.id]?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {productsByChild[child.id].map((product) => (
                <div className="border border-gray-200 rounded-xl p-2" key={product.id + "-" + product.sku}>
                  <ProductCard product={product} />
                </div>
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

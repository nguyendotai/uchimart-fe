"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { Inventory, Product } from "@/app/types/Product";

type Props = {
  categoryId: number | null;
  categoryName?: string;
  sortBy: string;
};

const CategoryProductPreview = ({ categoryId, sortBy }: Props) => {
  const [allProducts, setAllProducts] = useState<Inventory[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  // Xác định màn hình mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        const products: Product[] = res.data || [];

        const inventories: Inventory[] = products.flatMap((p) =>
          p.inventories.map((inv) => ({
            ...inv,
            subcategories: p.subcategories,
          }))
        );

        const filtered =
          categoryId === null
            ? inventories
            : inventories.filter((item) => {
                const groupId =
                  item?.subcategories?.[0]?.category?.category_group?.id;
                return groupId === categoryId;
              });

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
        setVisibleCount(isMobile ? 12 : 12); // Mobile bắt đầu 4 sp, desktop 12 sp
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [categoryId, sortBy, isMobile]);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 2 : 12)); // Mobile +2, Desktop +12
  };

  return (
    <div className="mb-6 p-2">
      {visibleProducts.length > 0 ? (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className="border border-gray-200 rounded-xl p-2 flex flex-col"
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

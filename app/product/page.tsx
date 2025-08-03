"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

// 📦 Animation Wrapper
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";

// 📂 Kiểu dữ liệu
import { Category } from "../types/Category";

// 🐢 Dynamic Imports with Skeleton loading
const ListSaleProduct = dynamic(() => import("./components/ListSaleProduct"), {
  loading: () => <Skeleton height={240} grid={4} />,
});
const ListSubCategory = dynamic(() => import("./components/ListSubCategory"));
const CountProduct = dynamic(() => import("./components/CountProduct"));
const CategoryProductPreview = dynamic(() => import("./components/CategoryProductPreview"), {
  loading: () => <Skeleton height={250} grid={4} />,
});
const CategoryInfo = dynamic(() => import("./components/CategoryInfo"), {
  loading: () => <Skeleton height={100} />,
});
const PromotionalBanners = dynamic(() => import("./components/PromotionalBanners"), {
  loading: () => <Skeleton height={120} />,
});
const ListProductByChildCategory = dynamic(() => import("./components/ListProductByChildCategory"), {
  loading: () => <Skeleton height={240} grid={4} />,
});

// 💀 Skeleton Component
const Skeleton = ({ height = 200, grid = 1, sections = 1 }) => (
  <div className="space-y-4">
    {Array.from({ length: sections }).map((_, idx) => (
      <div key={idx} className={`grid grid-cols-${grid} gap-4`}>
        {Array.from({ length: grid }).map((_, i) => (
          <div
            key={i}
            style={{ height }}
            className="bg-gray-200 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    ))}
  </div>
);

const Product = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const { ref: saleRef, inView: saleInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: previewRef, inView: previewInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: childRef, inView: childInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://127.0.0.1:8000/api/category-groups");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const resJson = await response.json();
      setCategories(resJson.data || []);
    }
    fetchCategories();
  }, []);

  const currentCategory = categoryId
    ? categories.find((c) => c.id === Number(categoryId))
    : null;

  const categoryName = currentCategory?.name || "Tất cả sản phẩm";

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="container mx-auto mt-2 flex justify-between">
          <div className="w-full">
            {/* Breadcrumbs */}
            <div className="w-full mb-4 font-medium">
              <span>Trang chủ</span> /
              <span className="text-[#00BF63]"> {categoryName}</span>
            </div>

            {/* Category Name */}
            <div className="w-full mb-4">
              <h1 className="text-2xl font-medium">{categoryName}</h1>
            </div>

            {/* Sale Products */}
            <div className="w-full mb-4" ref={saleRef}>
              {categoryId && !isNaN(Number(categoryId)) && saleInView && (
                <ListSaleProduct categoryGroupId={Number(categoryId)} />
              )}
            </div>

            {/* SubCategory Filter */}
            <div className="z-30 sticky top-0 mb-4">
              <ListSubCategory sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Product Count */}
            <div className="w-full mb-4">
              <CountProduct
                categoryId={categoryId ? Number(categoryId) : null}
                categoryName={categoryName}
              />
            </div>

            {/* Product Preview by Category */}
            <div className="w-full mb-4" ref={previewRef}>
              {categoryId && !isNaN(Number(categoryId)) && previewInView && (
                <CategoryProductPreview
                  categoryId={Number(categoryId)}
                  categoryName={categoryName}
                  sortBy={sortBy}
                />
              )}
            </div>

            <hr className="text-gray-400 mb-4" />

            {/* Category Info */}
            <div className="w-full mb-4" ref={infoRef}>
              {categoryId && !isNaN(Number(categoryId)) && infoInView && (
                <CategoryInfo categoryId={Number(categoryId)} />
              )}
            </div>

            <hr className="text-gray-400 mb-4" />

            {/* Promotional Banners */}
            <div className="w-full mb-4" ref={bannerRef}>
              {bannerInView && <PromotionalBanners />}
            </div>

            <hr className="text-gray-400 mb-4" />

            {/* List by Child Category */}
            <div className="w-full mb-4" ref={childRef}>
              {childInView && <ListProductByChildCategory />}
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Product;

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
const CategoryProductPreview = dynamic(
  () => import("./components/CategoryProductPreview"),
  {
    loading: () => <Skeleton height={250} grid={4} />,
  }
);
const CategoryInfo = dynamic(() => import("./components/CategoryInfo"), {
  loading: () => <Skeleton height={100} />,
});
const PromotionalBanners = dynamic(
  () => import("./components/PromotionalBanners"),
  {
    loading: () => <Skeleton height={120} />,
  }
);
const ListProductByChildCategory = dynamic(
  () => import("./components/ListProductByChildCategory"),
  {
    loading: () => <Skeleton height={240} grid={4} />,
  }
);

const ListProductByCate = dynamic(() => import("../home/ListProductByCate"), {
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
  const filter = searchParams.get("filter");

  const isSalePage = filter === "khuyen-mai-hot";
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const { ref: saleRef, inView: saleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: previewRef, inView: previewInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: infoRef, inView: infoInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: childRef, inView: childInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category-groups")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data.data || []);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch category groups:", error);
      });
  }, []);

  const currentCategory = categoryId
    ? categories.find((c) => c.id === Number(categoryId))
    : null;

  const categoryName = isSalePage
    ? "Khuyến mãi hot"
    : currentCategory?.name || "Tất cả sản phẩm";

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="w-full px-2 sm:container sm:mx-auto mt-2 flex justify-between">
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
              {saleInView && (
                <ListSaleProduct
                  categoryGroupId={
                    !isSalePage && categoryId && !isNaN(Number(categoryId))
                      ? Number(categoryId)
                      : 0 // hoặc một giá trị mặc định phù hợp, ví dụ: 0
                  }
                />
              )}
            </div>

            {/* SubCategory Filter */}
            {!isSalePage && (
              <ListSubCategory sortBy={sortBy} setSortBy={setSortBy} />
            )}

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

            {!isSalePage && <hr className="text-gray-400 mb-4" />}

            {/* Category Info */}
            {!isSalePage && (
              <div className="w-full mb-4" ref={infoRef}>
                {categoryId && !isNaN(Number(categoryId)) && infoInView && (
                  <CategoryInfo categoryId={Number(categoryId)} />
                )}
              </div>
            )}

            {!isSalePage && <hr className="text-gray-400 mb-4" />}

            {/* Promotional Banners */}
            <div className="w-full mb-4" ref={bannerRef}>
              {bannerInView && <PromotionalBanners />}
            </div>

            {!isSalePage && <hr className="text-gray-400 mb-4" />}

            {/* List sản phẩm theo danh mục hoặc theo danh mục con */}
            <div className="w-full mb-4" ref={childRef}>
              {childInView &&
                (isSalePage ? (
                  <ListProductByCate />
                ) : (
                  <ListProductByChildCategory />
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Product;

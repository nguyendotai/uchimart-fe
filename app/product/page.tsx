"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { FaSpinner } from "react-icons/fa";

// 📦 Animation Wrapper
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";

// 📂 Kiểu dữ liệu
import { Category, CategoryGroup } from "../types/Category";

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

const Product = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const childId = searchParams.get("child");
  const filter = searchParams.get("filter");

  const isSalePage = filter === "khuyen-mai-hot";
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
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
    const fetchCategories = async () => {
      try {
        setLoading(true); // 🟢 reset loading mỗi lần thay đổi query
        const res = await fetch("http://127.0.0.1:8000/api/category-groups");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Lỗi khi fetch category groups:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId, filter]); // 🟢 thêm dependency

  let currentCategoryName = "Tất cả sản phẩm";

  if (isSalePage) {
    currentCategoryName = "Khuyến mãi hot";
  } else if (categoryId) {
    const group = categories.find((c) => c.id === Number(categoryId));
    currentCategoryName = group?.name || currentCategoryName;

    if (childId) {
      // tìm danh mục con
      const childCategory = group?.categories?.find(
        (cat) => cat.id === Number(childId)
      );
      currentCategoryName = childCategory?.name || currentCategoryName;
    }
  }

  const categoryName = currentCategoryName;

  // 🌀 Overlay spinner khi chưa fetch xong categories
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#921573]" />
      </div>
    );
  }

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
                <div className="w-full mb-4">
                  <ListSaleProduct
                    categoryGroupId={
                      !isSalePage &&
                      !childId &&
                      categoryId &&
                      !isNaN(Number(categoryId))
                        ? Number(categoryId)
                        : null
                    }
                    categoryId={
                      !isSalePage && childId && !isNaN(Number(childId))
                        ? Number(childId)
                        : null
                    }
                  />
                </div>
              )}
            </div>

            {/* SubCategory Filter */}
            {!isSalePage && (
              <ListSubCategory sortBy={sortBy} setSortBy={setSortBy} />
            )}

            {/* Product Preview by Category */}
            <CategoryProductPreview
              categoryGroupId={
                !isSalePage &&
                categoryId &&
                !childId &&
                !isNaN(Number(categoryId))
                  ? Number(categoryId) // đây là groupId
                  : null
              }
              categoryId={
                !isSalePage && childId && !isNaN(Number(childId))
                  ? Number(childId) // đây là categoryId (danh mục con)
                  : null
              }
              sortBy={sortBy}
              categoryName={categoryName} // 🟢 truyền tên danh mục vào
            />

            {!isSalePage && <hr className="text-gray-400 mb-4" />}

            {/* Category Info */}
            {!isSalePage && (
              <div className="w-full mb-4">
                {categoryId && !isNaN(Number(categoryId)) && (
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
              {isSalePage ? <ListProductByCate /> : <ListProductByChildCategory />}
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Product;

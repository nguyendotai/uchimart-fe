"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ListCategories from "../components/ui/ListCategories";
import ListSaleProduct from "./components/ListSaleProduct";
import { Category } from "../types/Category";
import ListSubCategory from "./components/ListSubCategory";
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";
import CountProduct from "./components/CountProduct";
import CategoryProductPreview from "./components/CategoryProductPreview";
import CategoryInfo from "./components/CategoryInfo";
import PromotionalBanners from "./components/PromotionalBanners";
import ListProductByChildCategory from "./components/ListProductByChildCategory";

const Product = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://127.0.0.1:8000/api/category-groups");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resJson = await response.json();
      setCategories(resJson.data || []); // luôn gán mảng vào state
    }
    fetchCategories();
  }, []);

  const currentCategory = categoryId
    ? categories.find((c) => c.id === Number(categoryId))
    : null;

  const categoryName = currentCategory?.name || "Tất cả sản phẩm";
  const categoryGroupId = currentCategory?.category_group_id || 0;

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="container mx-auto mt-2 flex justify-between">
          {/*  */}
          <div className="w-full">
            {/* Sale Hot */}
            <div className="w-full mb-4 font-medium">
              <span>Trang chủ</span> /
              <span className="text-[#00BF63]"> {categoryName}</span>
            </div>
            <div className="w-full mb-4">
              <h1 className="text-2xl font-medium">{categoryName}</h1>
            </div>
            {/* List Sale */}
            <div className="w-full mb-4">
              {categoryId && !isNaN(Number(categoryId)) && (
                <ListSaleProduct categoryId={Number(categoryId)} />
              )}
            </div>
            {/* Category Child */}
            <div className="z-30 sticky top-0 mb-4">
              <ListSubCategory sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Count Product */}
            <div className="w-full mb-4">
              <CountProduct
                categoryId={categoryId ? Number(categoryId) : null}
                categoryName={categoryName}
              ></CountProduct>
            </div>
            {/* List Product By Category */}
            <div className="w-full mb-4">
              {categoryId && !isNaN(Number(categoryId)) && categoryName && (
                <CategoryProductPreview
                  categoryId={Number(categoryId)}
                  categoryName={categoryName}
                  sortBy={sortBy}
                />
              )}
            </div>
            <hr className="text-gray-400 mb-4" />
            {/* Category Infomation */}
            <div className="w-full mb-4">
              {categoryId && !isNaN(Number(categoryId)) && (
                <CategoryInfo categoryId={Number(categoryId)} />
              )}
            </div>
            <hr className="text-gray-400 mb-4" />
            {/* Promotional Banners */}
            <div className="w-full mb-4">
              <PromotionalBanners></PromotionalBanners>
            </div>
            <hr className="text-gray-400 mb-4" />
            {/* Product By CategoryChild */}
            <div className="w-full mb-4">
              <ListProductByChildCategory />
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Product;

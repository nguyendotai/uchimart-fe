"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ListCategories from "../components/UI/ListCategories";
import ListSaleProduct from "../components/UIProduct/ListSaleProduct";
import { Category } from "../types/Category";
import ListSubCategory from "../components/UIProduct/ListSubCategory";
import PageTransitionWrapper from "../components/Animation/PageTransitionWrapper";
import CountProduct from "../components/UIProduct/CountProduct";
import CategoryProductPreview from "../components/UIProduct/CategoryProductPreview";

const Product = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<string>(""); // "" là mặc định chưa chọn

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/data/categories.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Category[] = await response.json();
      setCategories(data); // Cập nhật state với dữ liệu categories
    }
    fetchCategories();
  }, []);

  const categoryName = categoryId
    ? categories.find((c) => c.id === Number(categoryId))?.name
    : "Tất cả sản phẩm";

  return (
    <PageTransitionWrapper>
      <div className="w-full">
        <div className="container mx-auto mt-2 flex justify-between">
          {/* SideBar */}
          <div className="w-[17%] bg-white shadow rounded-xl p-2 sticky top-32 self-start">
            <ListCategories></ListCategories>
          </div>
          {/*  */}
          <div className="w-[82%]">
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
            <div className="w-full mb-4 ">
              <ListSubCategory sortBy={sortBy} setSortBy={setSortBy}></ListSubCategory>
            </div>
            {/* Count Product */}
            <div className="w-full mb-4">
              <CountProduct
                categoryId={categoryId ? Number(categoryId) : null}
                categoryName={categoryName}
              ></CountProduct>
            </div>
            {/* Danh sách sản phẩm trong danh mục */}
            <div className="w-full mb-4">
              {categoryId && !isNaN(Number(categoryId)) && categoryName && (
                <CategoryProductPreview
                  categoryId={Number(categoryId)}
                  categoryName={categoryName}
                  sortBy={sortBy}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Product;

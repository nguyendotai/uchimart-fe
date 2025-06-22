"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/Category";

const ListCateHome = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    function fetchCategories() {
      fetch("/data/categories.json")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error("Lỗi khi fetch categories:", error);
        });
    }

    fetchCategories();
  }, []);
  const handleCategoryClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };
  return (
    <div className="bg-white shadow rounded-xl p-2 ">
      <ul className="flex flex-wrap gap-2 justify-between">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(category.id)}
            className="w-[11%] min-w-[80px] bg-white text-center p-2 font-medium"
          >
            <img
              src={category.image}
              className="mx-auto mb-1 h-12 object-contain"
            />
            <span className="text-xs">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCateHome;

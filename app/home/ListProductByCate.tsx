"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ui/ProductCard";
import { CategoryGroup } from "@/app/types/Category";
import { Product } from "@/app/types/Product"; // Dùng kiểu Inventory
import { productCarouselSettings } from "@/app/utils/carouselSettings";

const ListProductByCate = () => {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/category-groups").then((res) =>
        res.json()
      ),
      fetch("http://127.0.0.1:8000/api/products").then((res) => res.json()),
    ])
      .then(([groupData, productData]) => {
        setGroups(groupData.data ?? []);
        setProducts(productData.data ?? []); // Dữ liệu inventory
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu:", err);
      });
  }, []);

  return (
    <>
      {groups.map((group) => {
        const categoryIds = group.categories?.map((cat) => cat.id) || [];

        // Lọc các inventory có product.category_id nằm trong group
        const groupProducts = products.filter(
          (p) => p.product?.category_id && categoryIds.includes(p.product.category_id)
        );

        if (groupProducts.length === 0) return null;

        return (
          <div key={group.id} className="w-full space-y-4 mb-6">
            {/* Banner nhóm danh mục */}
            <div className="w-full h-[120px] rounded-lg overflow-hidden relative flex bg-gray-200 shadow">
              <div className="w-[40%]">
                <img
                  src={group.image || "/default-category.png"}
                  alt={group.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="w-[60%] flex items-center px-4">
                <h2 className="text-2xl font-semibold text-[#921573]">
                  {group.name}
                </h2>
              </div>
            </div>

            {/* Carousel sản phẩm */}
            <Slider {...productCarouselSettings}>
              {groupProducts.slice(0, 12).map((product) => (
                <div key={product.id} className="px-2">
                  <div className="bg-white shadow rounded-xl p-2 h-full">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </Slider>

            {/* Nút xem thêm */}
            <div className="flex justify-center mt-2">
              <a
                href={`/product?category=${group.id}`}
                className="text-[#921573] hover:underline font-medium"
              >
                Xem thêm
              </a>
            </div>

            <hr className="border-gray-300 mt-4" />
          </div>
        );
      })}
    </>
  );
};

export default ListProductByCate;

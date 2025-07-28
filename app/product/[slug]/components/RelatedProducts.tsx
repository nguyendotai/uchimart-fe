"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/types/Product"; // Đổi tên type nếu bạn đã rename như hướng dẫn trước
import ProductCard from "../../../components/ui/ProductCard";
import { productCarouselSettings } from "@/app/utils/carouselSettings";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

const RelatedProducts = ({ currentProduct, allProducts }: Props) => {
  const currentCategoryId = currentProduct.product?.category_id;

  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.product?.category_id === currentCategoryId
    )
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2 p-2 w-fit text-center rounded-xl">
        Sản phẩm liên quan
      </h2>
      <Slider {...productCarouselSettings}>
        {related.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-white shadow rounded-xl p-2 h-full">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;

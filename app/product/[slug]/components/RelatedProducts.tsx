"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/types/Product";
import ProductCard from "../../../components/ui/ProductCard";
import { productCarouselSettings } from "@/app/utils/carouselSettings";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

const RelatedProducts = ({ currentProduct, allProducts }: Props) => {
  const related = allProducts
    .filter(
      (p) =>
        p.category_id === currentProduct.category_id &&
        p.id !== currentProduct.id
    )
    .slice(0, 5); // Lấy tối đa 4 sản phẩm liên quan

  if (related.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2 p-2 w-[19%] text-center rounded-xl">
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

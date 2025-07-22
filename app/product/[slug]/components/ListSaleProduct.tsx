"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/types/Product";
import { productCarouselSettings } from "@/app/utils/carouselSettings";
import ProductCard from "../../../components/ui/ProductCard";

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

const ListSaleProduct = ({ currentProduct, allProducts }: Props) => {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.promotion_price &&
        p.promotion_price < p.price
    )
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-2 p-2  w-[19%] text-center rounded-xl">
        Sản phẩm giảm giá
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

export default ListSaleProduct;

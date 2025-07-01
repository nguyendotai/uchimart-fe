"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import ProductCard from "../UI/ProductCard";
import { Product } from "@/app/types/Product";
import { productCarouselSettings } from "@/app/utils/carouselSettings"; // đường dẫn phù hợp

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((products) => setAllProducts(products))
      .catch((err) => console.error("Lỗi tải products:", err));
  }, []);

  return (
    <Slider {...productCarouselSettings}>
      {allProducts.slice(0, 12).map((product) => (
        <div key={product.id} className="px-2">
          <div className="bg-white shadow rounded-xl p-2 h-full">
            <ProductCard product={product} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ListProduct;
